import pathlib
from contextlib import asynccontextmanager

import orjson
import redis
from fastapi import FastAPI

from models import ProductData, ProductEdges, ProductNode, RequestBody

BASE_PATH = pathlib.Path(__file__).parent.resolve()

JSON_FIXTURE = BASE_PATH.joinpath('fixtures', 'products.json')


def get_redis():
    instance = redis.Redis(host='localhost', port=6379, db=0)
    try:
        instance.ping()
    except redis.exceptions.ConnectionError:
        raise RuntimeError(
            "Redis server is not running. Please start the Redis server and try again.")
    return instance


@asynccontextmanager
async def lifespan(app: FastAPI):
    # if not JSON_FIXTURE.exists():
    #     products = schema.execute('''
    #         {
    #             allProducts {
    #                 id
    #                 name
    #                 active
    #                 genderCategory
    #                 hasSizes
    #             }
    #         }
    #     ''')
    #     with JSON_FIXTURE.open('w') as f:
    #         json.dump(json.loads(bytes(products.data)), f, indent=4)
    yield
    # Perform any cleanup tasks here


app = FastAPI(lifespan=lifespan)


@app.post('/graphql')
def read_graphql(body: RequestBody) -> ProductData | ProductEdges:
    """The main GraphQL endpoint for the application. It handles requests to 
    retrieve product data based on the provided request body.
    """
    products: bytes | None = None

    if body.no_cache:
        products = JSON_FIXTURE.read_bytes()
    else:
        products = get_redis().get('products')
        if products is None:
            products = JSON_FIXTURE.read_bytes()
            get_redis().set('products', products, ex=(60 * 15))  # Cache for 15 minutes

    if body.paginated:
        return ProductEdges(edges=[
            ProductNode(node=product)
            for product in orjson.loads(products)
        ])

    return ProductData(data=orjson.loads(products))

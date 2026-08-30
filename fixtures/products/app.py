import pathlib
from contextlib import asynccontextmanager

import orjson
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import (
    DownloadRequestBody,
    ProductData,
    ProductEdges,
    ProductNode,
    RequestBody,
)
from utils import get_redis

BASE_PATH = pathlib.Path(__file__).parent.resolve()

JSON_FIXTURE = BASE_PATH.joinpath('fixtures', 'products.json')


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


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


@app.get('/health')
def health_check() -> dict[str, str]:
    """A simple health check endpoint to verify that the application is running."""
    return {"status": "ok"}


@app.post('/images')
async def download_images(body: DownloadRequestBody) -> dict[str, str]:
    """Endpoint to initiate the image downloading process based on the provided request body."""
    from image_downloader import main  # Import here to avoid circular imports

    await main(body.urls, category=body.category, dirname=body.dirname)
    return {'status': 'Image download initiated.'}

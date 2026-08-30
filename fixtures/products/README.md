# Products Fixture

A module that helps generating fixtures for testing the Nuxt frontend by simulating a GraphQL backend. The module generates a JSON document that can be used to test the frontend.

## Commands

### Generating a JSON fixture document

The ecommerce project on Vercel uses a JSON document. You can generate it like so.

```Python

python -m product_generator --quantity=10
```

### Starting the Fast API Server

To test the server endpoints on a real API endpoints you can start the FastApi server and send requests to it.

```Python
uv run fastapi run --reload
```

#### Sending requests to the server

The server maps the originally intended GraphQL format from the [Ecommerce backend](https://github.com/Zadigo/mycommerce) which is based on [Graphene](https://docs.graphene-python.org/projects/django/en/latest/).

The request is a **POST** request which takes a body:

```JSON
{
    "no_cache": false,
    "as_node": false,
    "as_data": false,
    "paginated": false,
    "search": {
        "name": "string",
        "sku": "string",
        "color": "string",
        "minPrice": 0,
        "maxPrice": 0,
        "saleValue": 0,
        "slug": "string",
        "before": "string",
        "after": "string",
        "first": 0,
        "last": 0,
        "using": "string"
    }
}
```

**no cache**

Specifies whether to bypass the Redis cache and fetch fresh data from the server.

**search.using**

GraphQL will use a name field when returning the query (for example, `{ data: { products: [] } }` or `{ data: { searchedProducts: [] } }`). The using field allows you to specify which name to use when returning the query. The default is `products` but you can change it to `searchedProducts` or any other name.

This allows Nuxt to match the query name used to display items on the pagee with the response name.

**before** and **after**

These fields are used for pagination. The `before` field specifies the cursor before which to return results, and the `after` field specifies the cursor after which to return results.

**first** and **last**

These fields are used for pagination. The `first` field specifies the number of results to return starting from the beginning of the list, and the `last` field specifies the number of results to return starting from the end of the list.

**As node**

```JSON
[
    {
        "node": {
            "id": 1,
            "name": "Product 1"
    }
]
```


**As data**

```JSON
{
    "data": [
        {
            "id": 1,
            "name": "Product 1"
        }
    ]
}
```

**Paginated**

```JSON
{
    "edges": [
        {
            "node": {
                "id": 1,
                "name": "Product 1"
            }
        }
    ],
    "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false,
        "startCursor": 0,
        "endCursor": 10
    }
}
```

**Searches**

* Name

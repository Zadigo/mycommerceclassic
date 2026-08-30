from fastapi.testclient import TestClient

from product_generator import generate_products


def test_generator():
    products = generate_products()
    print(products)


def test_graphql_endpoint():
    from app import app

    client = TestClient(app)
    response = client.post('/graphql', json={
        'query': '''
            {
                allProducts {
                    id
                    name
                    active
                    genderCategory
                    hasSizes
                }
            }
        '''})
    assert response.status_code == 200

    data = response.json()
    assert 'allProducts' in data
    assert isinstance(data['allProducts'], list)

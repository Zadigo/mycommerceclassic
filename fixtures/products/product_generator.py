import argparse
import pathlib
from abc import ABC, abstractmethod
from collections.abc import Generator

import orjson
from faker import Faker
from faker.decode import unidecode
from faker.providers import DynamicProvider

from fixtures.names import CATEGORIES, SIZES
from models import ColorVariantModel, MainImageModel, ProductModel

BASE_PATH = pathlib.Path(__file__).parent.resolve()

JSON_FIXTURE = BASE_PATH.joinpath('fixtures', 'products.json')


fake = Faker()

skirts_provider = DynamicProvider(
    'product_name',
    elements=CATEGORIES['skirts']
)

size_provider = DynamicProvider(
    'size',
    elements=SIZES
)

fake.add_provider(skirts_provider)
fake.add_provider(size_provider)


class AbstractFactory(ABC):
    number_of_products: int = 0

    @abstractmethod
    def create_product(self, quantity: int = 10) -> Generator[ProductModel]:
        pass


class AbstractSkirts(AbstractFactory):
    """A factory for generating skirt products."""

    category: str = 'skirts'

    def get_quantity(self, quantity: int) -> int:
        items = CATEGORIES.get(self.category, [])

        self.number_of_products = len(items)
        if quantity < 1:
            return 1

        if quantity > self.number_of_products:
            return self.number_of_products
        return quantity

    def create_product(self, quantity: int = 10) -> Generator[ProductModel]:
        skirt = Skirt()

        for i in range(self.get_quantity(quantity)):
            yield skirt.get_product_info(i)


class AbstractProduct(ABC):
    @abstractmethod
    def get_product_info(self) -> ProductModel:
        pass

    def _create_prices(self):
        on_sale = fake.boolean(chance_of_getting_true=30)
        unit_price = fake.random_int(min=10, max=200)

        price_data = {
            'price': unit_price,
            'salePrice': 0,
            'saleValue': 0,
            'unitPrice': unit_price
        }

        if on_sale:
            sale_value = fake.random_int(min=5, max=50)
            price_data['saleValue'] = sale_value
            price_data['salePrice'] = round(
                (1 - sale_value / 100) * unit_price, 2
            )
        return price_data

    def _create_color_variants(self) -> list[ColorVariantModel]:
        variants: list[ColorVariantModel] = []
        for i in range(fake.random_int(min=1, max=5)):
            variants.append(
                ColorVariantModel(
                    id=fake.random_int(min=1, max=1000),
                    name=fake.color_name(),
                    mainImage=MainImageModel(
                        id=fake.random_int(min=1, max=1000),
                        active=fake.boolean(chance_of_getting_true=80),
                        createdOn=str(fake.date_this_decade()),
                        isMainImage=True,
                        name=f"image_{i}",
                        original=f"https://example.com/images/image_{i}.jpg",
                        thumbnail=f"https://example.com/images/image_{i}_thumb.jpg"
                    )
                )
            )
        return variants

    def _create_main_image(self) -> MainImageModel:
        return MainImageModel(
            id=fake.random_int(min=1, max=1000),
            active=fake.boolean(),
            createdOn=str(fake.date_this_decade()),
            isMainImage=True,
            name="main_image",
            original="https://example.com/images/main_image.jpg",
            thumbnail="https://example.com/images/main_image_thumb.jpg"
        )


class Skirt(AbstractProduct):
    """A concrete implementation of AbstractProduct for skirts."""

    def get_product_info(self, index: int | None = None) -> ProductModel:
        fake_index = fake.random_int(min=1, max=1000)
        index = index if index is not None else fake_index

        name = fake.product_name()
        slug = unidecode(name.lower().replace(' ', '-'))
        age_group = fake.random_element(elements=('Adult', 'Teen', 'Child'))
        gender = fake.random_element(elements=('Man', 'Woman', 'Unisex'))
        sub_category = fake.random_element(elements=('Mini', 'Midi', 'Maxi'))

        return ProductModel(
            id=index,
            name=name,
            active=fake.boolean(),
            ageGroupCategory=age_group,
            category='Skirts',
            color=fake.color_name(),
            createdOn=fake.date_this_decade(),
            displayNew=fake.boolean(),
            genderCategory=gender,
            hasSizes=True,
            modelHeight=fake.random_int(min=150, max=200),
            modelSize=fake.size(),
            modifiedOn=fake.date_this_decade(),
            sku=f"{slug}-{index}",
            slug=f"{slug}-{index}",
            subCategory=sub_category,
            colorVariants=self._create_color_variants(),
            mainImage=self._create_main_image(),
            **self._create_prices()
        )


def factory(factory: AbstractFactory, quantity: int = 10) -> list[ProductModel]:
    return list(factory.create_product(quantity))


def generate_products(quantity: int = 10) -> list[ProductModel]:
    skirts = AbstractSkirts()

    products: list[ProductModel] = [
        *factory(skirts, quantity)
    ]

    return [product.model_dump() for product in products]


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Generate product fixtures.')
    parser.add_argument(
        '--quantity',
        type=int,
        default=10,
        help='Number of products to generate'
    )
    args = parser.parse_args()

    products = generate_products(args.quantity)

    with JSON_FIXTURE.open('w') as f:
        data = orjson.dumps(products, option=orjson.OPT_INDENT_2)
        f.write(data.decode('utf-8'))

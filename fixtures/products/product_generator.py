import argparse
import pathlib
import random
from abc import ABC, abstractmethod
from collections.abc import Generator

import orjson
from faker import Faker
from faker.decode import unidecode
from faker.providers import DynamicProvider

from fixtures.names import CATEGORIES, SIZES
from models import ColorVariantModel, MainImageModel, ProductModel, SizeSetModel

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
    category: str = ''

    def __init__(self):
        self.category_data: dict[str, list[str] | str] = {}
        self.category_dirs: list[str] = []

        images_map = BASE_PATH.joinpath('fixtures', 'imagesmap.json')
        if images_map.exists():
            with images_map.open('r') as f:
                data = orjson.loads(f.read())
                self.category_data = data.get(self.category, {})
                self.category_dirs = list(self.category_data.keys())

    @abstractmethod
    def create_product(self, quantity: int = 10) -> Generator[ProductModel]:
        pass

    def _get_images(self):
        """Return the images path for the selected category."""
        pick = random.choice(self.category_dirs)
        images = self.category_data.get(pick, {}).get('images', [])
        return [f"{self.category}/{x['path']}" for x in images]


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
        skirt = Skirt(self)

        for i in range(self.get_quantity(quantity)):
            yield skirt.get_product_info(i)


class AbstractProduct(ABC):
    def __init__(self, parent_factory: AbstractFactory | None = None):
        self.parent_factory = parent_factory
        self.placeholder_image = "https://placehold.co/1090x850"

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

    def _create_color_variants(self, using_image: str | None = None) -> list[ColorVariantModel]:
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
                        name=f"Image {fake.word()}",
                        original=using_image or self.placeholder_image,
                        thumbnail=using_image or self.placeholder_image
                    )
                )
            )

        return variants

    def _create_images(self) -> Generator[MainImageModel]:
        template = {
            'id': fake.random_int(min=1, max=1000),
            'name': f"Image {fake.word()}",
            'active': fake.boolean(chance_of_getting_true=80),
            'createdOn': str(fake.date_this_decade()),
            'isMainImage': False,
        }

        if self.parent_factory is not None:
            images = self.parent_factory._get_images()
            for str_image in images:
                yield MainImageModel(
                    **template,
                    original=str_image,
                    thumbnail=str_image
                )
        else:
            yield MainImageModel(
                **template,
                original=self.placeholder_image,
                thumbnail=self.placeholder_image
            )

    def _create_sizes(self) -> list[SizeSetModel]:
        sizes_list: list[SizeSetModel] = []
        choices = [fake.size() for _ in range(fake.random_int(min=1, max=3))]
        for item in choices:
            sizes_list.append(
                SizeSetModel(
                    name=item,
                    size=item,
                    availability=fake.boolean(chance_of_getting_true=80),
                    active=fake.boolean(chance_of_getting_true=80),
                    metric='clothe',
                    variantPrice=1
                )
            )
        return sizes_list


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

        images = list(self._create_images())
        main_image = images[0] if images else None

        if main_image is not None:
            main_image.isMainImage = True

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
            mainImage=main_image,
            productImages=images,
            sizeSet=self._create_sizes(),
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

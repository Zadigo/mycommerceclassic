import argparse
import random
from abc import ABC, abstractmethod
from collections import namedtuple
from collections.abc import Generator

import orjson
from faker import Faker
from faker.decode import unidecode
from faker.providers import DynamicProvider

from fixtures.names import PRODUCT_NAMES, PRODUCT_SUB_CATEGORIES, SIZES
from models import ColorVariantModel, MainImageModel, ProductModel, SizeSetModel
from utils import BASE_DIR

JSON_FIXTURE = BASE_DIR.joinpath('fixtures', 'products.json')


fake = Faker()

skirts_provider = DynamicProvider(
    'product_name',
    elements=PRODUCT_NAMES['skirts']
)

skirts_sub_category_provider = DynamicProvider(
    'skirt_sub_category',
    elements=PRODUCT_SUB_CATEGORIES[0]['items']
)

size_provider = DynamicProvider(
    'size',
    elements=SIZES
)

fake.add_provider(skirts_provider)
fake.add_provider(skirts_sub_category_provider)
fake.add_provider(size_provider)


class AbstractFactory(ABC):
    number_of_products: int = 0
    category: str = ''

    def __init__(self):
        self.category_data: dict[str, list[str]] = {}
        self.category_dirs: list[str] = []

        images_map = BASE_DIR.joinpath('fixtures', 'imagesmap.json')
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
        return self.category_data[pick]


class AbstractSkirts(AbstractFactory):
    """A factory for generating skirt products."""

    category: str = 'skirts'

    def get_quantity(self, quantity: int) -> int:
        items = PRODUCT_NAMES.get(self.category, [])

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
    category: str = 'Not defined'

    def __init__(self, parent_factory: AbstractFactory | None = None):
        self.parent_factory = parent_factory
        self.placeholder_image = "https://placehold.co/850x1090"

    @abstractmethod
    def get_product_info(self, index: int | None = None) -> ProductModel:
        pass

    def _create_prices(self):
        on_sale = fake.boolean(chance_of_getting_true=30)
        unit_price = fake.random_int(min=10, max=200)

        price_data = {
            'onSale': on_sale,
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

    def _create_color_variants(self, using_variant: str | None = None, using_image: str | None = None) -> list[ColorVariantModel]:
        variants: list[ColorVariantModel] = []
        color_name: str = using_variant or fake.color_name()

        for i in range(fake.random_int(min=1, max=5)):
            variants.append(
                ColorVariantModel(
                    id=fake.random_int(min=1, max=1000),
                    name=color_name,
                    mainImage=MainImageModel(
                        id=fake.random_int(min=1, max=1000),
                        active=fake.boolean(chance_of_getting_true=80),
                        createdOn=str(fake.date_this_decade()),
                        isMainImage=True,
                        name=f"Image {fake.word()}",
                        original=using_image or self.placeholder_image,
                        thumbnail=using_image or self.placeholder_image,
                        variant=color_name
                    )
                )
            )

        return variants

    def _create_images(self, using_name: str | None = None) -> Generator[MainImageModel]:
        template = {
            'id': fake.random_int(min=1, max=1000),
            'active': fake.boolean(chance_of_getting_true=80),
            'createdOn': str(fake.date_this_decade()),
            'isMainImage': False,
            'variant': fake.color_name()
        }

        if self.parent_factory is not None:
            images = self.parent_factory._get_images()
            for str_image in images:
                yield MainImageModel(
                    **template,
                    name=using_name or f"Image {fake.word()}",
                    original=str_image,
                    thumbnail=str_image
                )
        else:
            yield MainImageModel(
                **template,
                name=using_name or f"Image {fake.word()}",
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

    def get_base_product_info(self, index: int | None = None):
        fake_index = fake.random_int(min=1, max=1000)
        index = index if index is not None else fake_index

        name: str = fake.product_name()
        slug = unidecode(name.lower().replace(' ', '-'))

        age_group = fake.random_element(elements=('Adult', 'Teen', 'Child'))
        gender = fake.random_element(elements=('Man', 'Woman', 'Unisex'))
        sub_category = fake.skirt_sub_category()

        images = list(self._create_images(using_name=name))
        main_image = images[0] if images else None

        if main_image is not None:
            main_image.isMainImage = True

        data = namedtuple(
            'ProductInfo',
            [
                'index',
                'name',
                'slug',
                'age_group',
                'gender',
                'sub_category',
                'images',
                'main_image'
            ]
        )

        product_info = data(
            index=index,
            name=name,
            slug=slug,
            age_group=age_group,
            gender=gender,
            sub_category=sub_category,
            images=images,
            main_image=main_image
        )

        return product_info


class Skirt(AbstractProduct):
    """A concrete implementation of AbstractProduct for skirts."""

    category: str = 'Skirts'

    def get_product_info(self, index: int | None = None) -> ProductModel:
        base_info = self.get_base_product_info(index)
        return ProductModel(
            id=index,
            name=base_info.name,
            active=fake.boolean(),
            ageGroupCategory=base_info.age_group,
            category=self.category,
            color=fake.color_name(),
            createdOn=fake.date_this_decade(),
            displayNew=fake.boolean(),
            genderCategory=base_info.gender,
            hasSizes=True,
            modelHeight=fake.random_int(min=150, max=200),
            modelSize=fake.size(),
            modifiedOn=fake.date_this_decade(),
            sku=f"{base_info.slug}-{index}",
            slug=f"{base_info.slug}-{index}",
            subCategory=base_info.sub_category,
            colorVariants=self._create_color_variants(),
            mainImage=base_info.main_image,
            productImages=base_info.images,
            sizeSet=self._create_sizes(),
            video=None,
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

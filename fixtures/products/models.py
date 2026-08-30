import datetime
from enum import Enum

import pydantic


class MetricEnum(str, Enum):
    bra = "bra"
    clothe = "clothe"
    shoe = "shoe"
    metric = "metric"
    text = "text"


class SizeSetModel(pydantic.BaseModel):
    availability: bool
    active: bool
    name: str
    metric: MetricEnum
    variantPrice: float


class MainImageModel(pydantic.BaseModel):
    id: int
    active: bool
    createdOn: str
    isMainImage: bool
    name: str
    original: str
    thumbnail: str


class ColorVariantModel(pydantic.BaseModel):
    id: int
    name: str
    mainImage: MainImageModel


class ProductModel(pydantic.BaseModel):
    id: int
    name: str
    active: bool = True
    ageGroupCategory: str
    category: str
    color: str
    createdOn: datetime.datetime
    modifiedOn: datetime.datetime
    displayNew: bool
    genderCategory: str
    hasSizes: bool = False
    modelHeight: float | None = None
    modelSize: str | None = None
    sku: str
    slug: str
    subCategory: str
    price: float
    salePrice: float
    saleValue: float
    unitPrice: float
    mainImage: MainImageModel
    colorVariants: list[ColorVariantModel]

class PageInfo(pydantic.BaseModel):
    hasNextPage: bool
    hasPreviousPage: bool
    startCursor: str | None = None
    endCursor: str | None = None


class ProductData(pydantic.BaseModel):
    data: list[ProductModel]


class ProductNode(pydantic.BaseModel):
    node: ProductModel
    pageInfo: PageInfo | None = None


class ProductEdges(pydantic.BaseModel):
    edges: list[ProductNode]


class SearchBody(pydantic.BaseModel):
    name: str | None = None
    sku: str | None = None
    color: str | None = None
    minPrice: float | None = None
    maxPrice: float | None = None
    saleValue: float | None = None
    slug: str | None = None
    before: str | None = None
    after: str | None = None
    first: int | None = None
    last: int | None = None
    using: str | None = None


class RequestBody(pydantic.BaseModel):
    no_cache: bool = False
    as_node: bool = False
    as_data: bool = False
    paginated: bool = False
    search: SearchBody | None = None


class DownloadRequestBody(pydantic.BaseModel):
    category: str
    dirname: str | None = 'default'
    urls: list[str]


class DownloadResponseModel(pydantic.BaseModel):
    path: str

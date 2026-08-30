import pathlib
from collections import defaultdict
from dataclasses import dataclass, field

import orjson

BASE_PATH = pathlib.Path(__file__).parent.absolute()

CATEGORIES = {
    'skirts': [
        "Jupe midi parachute",
        "Short mini boule",
        "Minijupe évasée",
        "Jupe midi en couches de tulle",
        "Jupe midi à taille repliée",
        "Mini-jupe à paillettes et dentelle",
        "Jupe-short ballon en popeline",
        "Jupe-short en jean",
        "Jupe midi à carreaux",
        "Jupe midi fluide à carreaux",
        "Jupe midi asymétrique en jean",
        "Minijupe à volants et fil métallisé",
        "Jupe midi avec ceinture obi",
        "Minijupe à volants",
        "Mini-jupe en jean",
        "Mini-jupe à volants fil métallisé",
        "Jupe mini à boutons",
        "Jupe-short mini taille à nœud",
        "Mini-jupe à volants et fil métallisé",
        "Minijupe jacquard à franges",
        "Jupe-short mini technique taille élastique",
        "Jupe - short mini technique taille élastique",
        "Jupe midi en mesh à pois",
        "Jupe paréo brodée de perles",
        "Jupe asymétrique à volants",
        "Short mini ballon à carreaux",
        "Jupe-short en tissu technique à carreaux",
        "Maxi sequin mini skirt",
        "jupe-short en jean",
        "Jupe midi à ceinture obi",
        "Jupe midi taille repliée",
        "Minijupe à brandebourgs",
        "Jupe midi asymétrique en dentelle",
        "Jupe midi évasée",
        "Jupe courte à boutons",
        "Minijupe en jean",
        "Sur-jupe brodée",
        "Minijupe à boutons",
        "Jupe midi à taille élastique",
        "Jupe midi taille élastique",
        "Mini-jupe brodée à volants",
        "Minijupe à broderie et volants",
        "Minijupe maxi à paillettes",
        "Minijupe à franges",
        "Mini-jupe à volants et paillettes",
        "Jupe en jean à strass",
        "Jupe à pointes brodée",
        "Jupe brodée à pointes",
        "Minijupe cargo"
    ]
}


SIZES = [
    'XS',
    'S',
    'M',
    'L',
    'XL'
]


@dataclass
class ImageInstance:
    path: str


@dataclass
class ImageInstances:
    dirname: str
    images: list[ImageInstance] = field(default_factory=list)


def get_product_images(category: str, write_file: bool = False) -> dict | None:
    path = pathlib.Path(__file__).parent.joinpath('media', category)

    image_instances_list: defaultdict[
        str,
        dict[str, list[ImageInstances]]
    ] = defaultdict(dict)

    if path.exists() and path.is_dir():
        dirs = [d for d in path.iterdir() if d.is_dir()]
        for item in dirs:
            list_of_images = image_instances_list[category]

            dir_images = ImageInstances(dirname=item.name)
            list_of_images[item.name] = dir_images

            for sub_item in item.iterdir():
                if sub_item.is_file():
                    str_path = str(sub_item.relative_to(path))
                    image_object = ImageInstance(path=str_path)

                    dir_images.images.append(image_object)

    data = orjson.dumps(image_instances_list)

    if write_file:
        output_file = BASE_PATH.joinpath('imagesmap.json')
        with output_file.open('wb') as f:
            f.write(data)

    return orjson.loads(data) if image_instances_list else None

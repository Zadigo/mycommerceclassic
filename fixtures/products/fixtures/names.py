import pathlib
from collections import defaultdict

import orjson

from utils import FIXTURES_DIR

PRODUCT_NAMES = {
    'skirts': [
        'Jupe midi parachute',
        'Short mini boule',
        'Minijupe évasée',
        'Jupe midi en couches de tulle',
        'Jupe midi à taille repliée',
        'Mini-jupe à paillettes et dentelle',
        'Jupe-short ballon en popeline',
        'Jupe-short en jean',
        'Jupe midi à carreaux',
        'Jupe midi fluide à carreaux',
        'Jupe midi asymétrique en jean',
        'Minijupe à volants et fil métallisé',
        'Jupe midi avec ceinture obi',
        'Minijupe à volants',
        'Mini-jupe en jean',
        'Mini-jupe à volants fil métallisé',
        'Jupe mini à boutons',
        'Jupe-short mini taille à nœud',
        'Mini-jupe à volants et fil métallisé',
        'Minijupe jacquard à franges',
        'Jupe-short mini technique taille élastique',
        'Jupe - short mini technique taille élastique',
        'Jupe midi en mesh à pois',
        'Jupe paréo brodée de perles',
        'Jupe asymétrique à volants',
        'Short mini ballon à carreaux',
        'Jupe-short en tissu technique à carreaux',
        'Maxi sequin mini skirt',
        'jupe-short en jean',
        'Jupe midi à ceinture obi',
        'Jupe midi taille repliée',
        'Minijupe à brandebourgs',
        'Jupe midi asymétrique en dentelle',
        'Jupe midi évasée',
        'Jupe courte à boutons',
        'Minijupe en jean',
        'Sur-jupe brodée',
        'Minijupe à boutons',
        'Jupe midi à taille élastique',
        'Jupe midi taille élastique',
        'Mini-jupe brodée à volants',
        'Minijupe à broderie et volants',
        'Minijupe maxi à paillettes',
        'Minijupe à franges',
        'Mini-jupe à volants et paillettes',
        'Jupe en jean à strass',
        'Jupe à pointes brodée',
        'Jupe brodée à pointes',
        'Minijupe cargo'
    ]
}


SIZES = [
    'XS',
    'S',
    'M',
    'L',
    'XL'
]


PRODUCT_SUB_CATEGORIES = [
    {
        'category': 'Skirts',
        'items': [
            'A-Line Skirt',
            'Bodycon Skirt',
            'Cargo Skirt',
            'Denim Skirt',
            'Faux Leather Skirt',
            'Fluid Skirt',
            'Full Skirt',
            'Knitted Skirt',
            'Maxi Skirt',
            'Midi Skirt',
            'Midaxi Skirt',
            'Mini Skirt',
            'Pencil Skirt',
            'Pleated Skirt',
            'Skater Skirt',
            'Skirt',
            'Skirt Co-ord Set',
            'Skorts',
            'Tailored Skirt',
            'Wrap Skirt'
        ]
    },
    {
        'category': 'Dresses',
        'items': [
            'Bodycon',
            'Shift',
            'Sheath',
            'Strapless',
            'Bouffont',
            'A-line',
            'Tent',
            'Blouson',
            'Halter',
            'Slit',
            'Shirt',
            'Wrap',
            'Peplum',
            'Drop waist',
            'One shoulder',
            'Ball gown',
            'Empire',
            'Apron',
            'Peasant',
            'Bubble',
            'Babydoll',
            'Jumper',
            'Sun',
            'Yoke',
            'Tunic',
            'Princess',
            'Trapezoid',
            'Pegged',
            'V-line'
        ]
    },
    {
        'category': 'Lingerie',
        'items': [
            'Brief',
            'Bikini',
            'Brazilian',
            'Hipster',
            'Bodyshort',
            'Control brief',
            'Thong',
            'G-String'
        ]
    },
    {
        'category': 'Bras',
        'items': [
            'Balconette',
            'Plunge',
            'Full cup',
            'T-Shirt',
            'Strapless',
            'Half cup',
            'Bralette',
            'Front fastening',
            'Sports',
            'Wired',
            'Nursing',
            'Sleep bra',
            'Underwire',
            'Minimizer',
            'Seamless',
            'Bullet',
            'Triangle',
            'Soft cup',
            'Corset'
        ]
    }
]


def create_images_map():
    path = pathlib.Path(__file__).parent.joinpath('media')

    categories: defaultdict[str, dict[str, list[str]]] = defaultdict(dict)

    if path.exists() and path.is_dir():
        dirs = [d for d in path.iterdir() if d.is_dir()]
        for item in dirs:
            details = categories[item.name]

            for sub_dir in item.iterdir():
                details[sub_dir.name] = []

                for image_file in sub_dir.iterdir():
                    if image_file.is_file():
                        str_path = str(image_file.relative_to(path))
                        details[sub_dir.name].append(f'/{str_path}')

    data = orjson.dumps(categories)

    output_file = FIXTURES_DIR.joinpath('imagesmap.json')
    with output_file.open('wb') as f:
        f.write(data)

    return categories

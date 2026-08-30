import pathlib

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


def get_product_images(category: str) -> dict | None:
    path = pathlib.Path(__file__).parent.joinpath(category)
    if path.exists() and path.is_dir():
        dirs = [d for d in path.iterdir() if d.is_dir()]
        if dirs:
            return {
                d.name: [
                    f.stem for f in d.iterdir() if f.is_file()
                ] for d in dirs
            }
    return None

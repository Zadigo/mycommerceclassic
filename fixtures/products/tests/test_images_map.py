from fixtures.names import create_images_map
from utils import FIXTURES_DIR


def test_create_images_map():
    create_images_map()

    output_file = FIXTURES_DIR.joinpath('imagesmap.json')
    assert output_file.exists() and output_file.is_file()

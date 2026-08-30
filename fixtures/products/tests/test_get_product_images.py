import pathlib

from fixtures.names import get_product_images


def test_get_product_images():
    category = 'skirts'
    images = get_product_images(category)

    assert images is not None
    assert isinstance(images, dict)

    assert category in images
    assert isinstance(images[category], dict)

    get_product_images(category, write_file=True)
    assert pathlib  .Path(__file__).parent.parent.joinpath(
        'fixtures', 'imagesmap.json').exists()

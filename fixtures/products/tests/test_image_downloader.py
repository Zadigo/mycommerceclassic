import asyncio

from image_downloader import get_image_directory, requester, user_agents_rotator


async def test_rotator():
    values = await user_agents_rotator(return_all=True)
    assert isinstance(values, list)
    assert len(values) > 0

    value = await user_agents_rotator(return_all=False)
    assert isinstance(value, str)


async def test_requester():
    url = 'https://static.bershka.net/assets/public/e453/ef9d/a34d44e3b9f2/f93cc32d5b45/02513254250-p/02513254250-p.jpg?ts=1778667014931&w=850'
    async with asyncio.TaskGroup() as tg:
        await requester(tg, url, category='default')


async def test_get_image_directory():
    dirname = 'test_dir'
    category = 'test_category'

    path = await get_image_directory(dirname, category)

    assert path.exists()
    assert path.is_dir()

    parent = path.parent
    path.rmdir()
    parent.rmdir()

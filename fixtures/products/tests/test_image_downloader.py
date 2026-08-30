import asyncio
import pathlib
import subprocess

from image_downloader import get_image_directory, requester, user_agents_rotator


async def test_rotator():
    values = await user_agents_rotator(return_all=True)
    assert isinstance(values, list)
    assert len(values) > 0

    value = await user_agents_rotator(return_all=False)
    assert isinstance(value, str)


URL = 'https://static.bershka.net/assets/public/e453/ef9d/a34d44e3b9f2/f93cc32d5b45/02513254250-p/02513254250-p.jpg?ts=1778667014931&w=850'


async def test_requester():
    async with asyncio.TaskGroup() as tg:
        await requester(tg, URL, category='default')


async def test_get_image_directory():
    dirname = 'test_dir'
    category = 'test_category'

    path = await get_image_directory(dirname, category)

    assert path.exists()
    assert path.is_dir()

    parent = path.parent
    path.rmdir()
    parent.rmdir()


def test_command_line():
    URL2 = 'https://static.bershka.net/assets/public/0b0b/52e2/671b481fb2a8/2bdf25b2a648/02513254250-a1t/02513254250-a1t.jpg?ts=1778667015423&w=850'
    base_dir = pathlib.Path(__file__).parent.parent.resolve()
    result = subprocess.call(
        ['python', f'{base_dir}/image_downloader.py', URL, URL2],
        stderr=subprocess.PIPE,
    )
    assert result == 0

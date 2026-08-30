import argparse
import asyncio
import io
import pathlib
import random
import secrets

import httpx2
from PIL import Image

from utils import get_redis


async def user_agents_rotator(return_all: bool = False) -> str | list[str]:
    user_agents_count: int = get_redis().llen('user_agents')

    if user_agents_count == 0:
        url = 'https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt'
        async with httpx2.AsyncClient() as client:
            response = await client.get(url)
            if response.status_code == 200:
                user_agents = response.text.splitlines()
                get_redis().rpush('user_agents', *user_agents)

    values = get_redis().lrange('user_agents', 0, -1)
    str_values = [value.decode('utf-8') for value in values]

    if return_all:
        return str_values

    return random.choice(str_values)


async def get_image_directory(dirname: str, category: str) -> pathlib.Path:
    if not dirname or dirname.strip() == '':
        dirname = 'default'

    path = pathlib.Path(f'fixtures/media/{category}/{dirname}').resolve()

    if not path.exists():
        path.mkdir(parents=True, exist_ok=True)

    return path


async def requester(tg: asyncio.TaskGroup,  url: str, category: str, dirname: str = 'default') -> None:
    headers = {'User-Agent': await user_agents_rotator(return_all=False)}
    async with httpx2.AsyncClient() as client:
        response = await client.get(url, headers=headers, timeout=20.0)

        path = await tg.create_task(get_image_directory(dirname, category))

        if response.status_code == 200:
            filename = secrets.token_urlsafe(8) + '.jpg'
            fullpath = path.joinpath(filename)

            instance = Image.open(io.BytesIO(response.content))
            instance.save(fullpath, format='JPEG', quality=85, optimize=True)


async def main(images: list[str]):
    # Limit concurrent downloads to 5
    async with asyncio.Semaphore(5), asyncio.TaskGroup() as tg:
        for url in images:
            tg.create_task(
                requester(tg, url, category=args.category,
                          dirname=args.dirname)
            )


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Download images from a list of URLs.'
    )

    parser.add_argument(
        'urls',
        metavar='URL',
        type=str,
        nargs='+',
        help='A list of image URLs to download.'
    )

    parser.add_argument(
        '--dirname',
        type=str,
        default='',
        help='The base directory where images will be saved.'
    )

    parser.add_argument(
        '--category',
        type=str,
        default='default',
        choices=['skirts', 'tops', 'default'],
        help='The category under which to save the downloaded images.'
    )

    args = parser.parse_args()

    asyncio.run(main(args.urls))

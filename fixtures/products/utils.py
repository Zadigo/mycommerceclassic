import redis


def get_redis():
    instance = redis.Redis(host='localhost', port=6379, db=0)
    try:
        instance.ping()
    except redis.exceptions.ConnectionError:
        raise RuntimeError(
            "Redis server is not running. Please start the Redis server and try again.")
    return instance

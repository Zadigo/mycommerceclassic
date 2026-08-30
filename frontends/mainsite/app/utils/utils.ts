type W<T> = T[] | undefined | null | MaybeRefOrGetter<T[] | undefined | null>

/**
 * Returns a computed ref containing the array value or an empty array if the value is undefined or null.
 * @param value The value to default to an array.
 */
export function defaultArray<T>(value: W<T>) {
  return computed(() => toValue(value) || [] as T[])
}

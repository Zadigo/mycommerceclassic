export type Arrayable<T> = T[]

export type Nullable<T> = T | null

export type Undefineable<T> = T | undefined

export type Empty<T> = Nullable<T> | Undefineable<T>

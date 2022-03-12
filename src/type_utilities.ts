export type Nominal<T, K> = T & { __nominally__: K };

// Note, this will only apply "deeply" to key-value types. Array members for instance will still be
// mutable.
export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export function capitalize(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}
export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

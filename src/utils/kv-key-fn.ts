export function kvKeyFn(base: string, id?: string): string {
  return id ? `${base}:${id}` : `${base}:list`;
}

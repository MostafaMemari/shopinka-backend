export function parseArrayParam(param: string | string[] | undefined): number[] | undefined {
  if (!param) return undefined;
  const str = Array.isArray(param) ? param[0] : param;
  return str
    .split(',')
    .map(Number)
    .filter((n) => !isNaN(n));
}

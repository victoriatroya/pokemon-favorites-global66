export function formatWeight(hectograms: number): string {
  return `${(hectograms / 10).toFixed(1).replace('.', ',')} kg`
}

export function formatHeight(decimeters: number): string {
  return `${(decimeters / 10).toFixed(1).replace('.', ',')} m`
}

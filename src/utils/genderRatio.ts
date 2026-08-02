import type { GenderRatio } from '@/types/pokemon'

export function getGenderRatio(genderRate: number): GenderRatio | null {
  if (genderRate < 0) return null
  const female = (genderRate / 8) * 100
  return { male: 100 - female, female }
}

export function formatPercent(value: number): string {
  const rounded = Number.isInteger(value) ? String(value) : value.toFixed(1).replace('.', ',')
  return `${rounded}%`
}

import type { TypeDamageRelations } from '@/types/pokemon'

export function computeWeaknesses(relations: TypeDamageRelations['damage_relations'][]): string[] {
  const multipliers = new Map<string, number>()
  for (const rel of relations) {
    for (const t of rel.double_damage_from)
      multipliers.set(t.name, (multipliers.get(t.name) ?? 1) * 2)
    for (const t of rel.half_damage_from)
      multipliers.set(t.name, (multipliers.get(t.name) ?? 1) * 0.5)
    for (const t of rel.no_damage_from) multipliers.set(t.name, 0)
  }
  return [...multipliers.entries()].filter(([, m]) => m > 1).map(([name]) => name)
}

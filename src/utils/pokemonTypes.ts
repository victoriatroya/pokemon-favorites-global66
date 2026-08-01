interface TypeStyle {
  label: string
  card: string
  chip: string
}

export const TYPE_STYLES: Record<string, TypeStyle> = {
  grass: { label: 'Planta', card: 'bg-type-grass', chip: 'bg-green-600' },
  fire: { label: 'Fuego', card: 'bg-type-fire', chip: 'bg-orange-500' },
  poison: { label: 'Veneno', chip: 'bg-purple-600', card: 'bg-purple-500' },
  water: { label: 'Agua', card: 'bg-blue-400', chip: 'bg-blue-500' },
  bug: { label: 'Bicho', card: 'bg-lime-500', chip: 'bg-lime-600' },
  normal: { label: 'Normal', card: 'bg-stone-400', chip: 'bg-stone-500' },
  electric: { label: 'Eléctrico', card: 'bg-yellow-400', chip: 'bg-yellow-500' },
  ground: { label: 'Tierra', card: 'bg-amber-600', chip: 'bg-amber-700' },
  fairy: { label: 'Hada', card: 'bg-pink-400', chip: 'bg-pink-500' },
  fighting: { label: 'Lucha', card: 'bg-red-600', chip: 'bg-red-700' },
  psychic: { label: 'Psíquico', card: 'bg-fuchsia-500', chip: 'bg-fuchsia-600' },
  rock: { label: 'Roca', card: 'bg-yellow-700', chip: 'bg-yellow-800' },
  ghost: { label: 'Fantasma', card: 'bg-indigo-600', chip: 'bg-indigo-700' },
  ice: { label: 'Hielo', card: 'bg-cyan-400', chip: 'bg-cyan-500' },
  dragon: { label: 'Dragón', card: 'bg-violet-600', chip: 'bg-violet-700' },
  dark: { label: 'Siniestro', card: 'bg-neutral-700', chip: 'bg-neutral-800' },
  steel: { label: 'Acero', card: 'bg-slate-400', chip: 'bg-slate-500' },
  flying: { label: 'Volador', card: 'bg-sky-400', chip: 'bg-sky-500' },
}

export const DEFAULT_TYPE_STYLE: TypeStyle = {
  label: 'Desconocido',
  card: 'bg-stone-400',
  chip: 'bg-stone-500',
}

export function typeIconUrl(type: string): string {
  return new URL(`../assets/icons/${type}.svg`, import.meta.url).href
}

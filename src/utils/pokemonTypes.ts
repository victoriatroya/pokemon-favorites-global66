interface TypeStyle {
  label: string
  card: string
  chip: string
  imagePanel: string
}

export const TYPE_STYLES: Record<string, TypeStyle> = {
  grass: {
    label: 'Planta',
    card: 'bg-type-grass/50',
    chip: 'bg-green-600',
    imagePanel: 'bg-type-grass',
  },
  fire: {
    label: 'Fuego',
    card: 'bg-type-fire/50',
    chip: 'bg-type-fire',
    imagePanel: 'bg-type-fire',
  },
  poison: {
    label: 'Veneno',
    chip: 'bg-purple-600',
    card: 'bg-purple-500',
    imagePanel: 'bg-type-poison-panel',
  },
  water: {
    label: 'Agua',
    card: 'bg-blue-400/50',
    chip: 'bg-blue-500',
    imagePanel: 'bg-blue-500',
  },
  bug: {
    label: 'Bicho',
    card: 'bg-lime-500/50',
    chip: 'bg-lime-600',
    imagePanel: 'bg-lime-600',
  },
  normal: {
    label: 'Normal',
    card: 'bg-stone-400/50',
    chip: 'bg-stone-500',
    imagePanel: 'bg-stone-500',
  },
  electric: {
    label: 'Eléctrico',
    card: 'bg-yellow-400/50',
    chip: 'bg-yellow-500',
    imagePanel: 'bg-yellow-500',
  },
  ground: {
    label: 'Tierra',
    card: 'bg-amber-600/50',
    chip: 'bg-amber-700',
    imagePanel: 'bg-amber-700',
  },
  fairy: {
    label: 'Hada',
    card: 'bg-pink-400/50',
    chip: 'bg-pink-500',
    imagePanel: 'bg-pink-500',
  },
  fighting: {
    label: 'Lucha',
    card: 'bg-red-600/50',
    chip: 'bg-red-700',
    imagePanel: 'bg-red-700',
  },
  psychic: {
    label: 'Psíquico',
    card: 'bg-fuchsia-500/50',
    chip: 'bg-fuchsia-600',
    imagePanel: 'bg-fuchsia-600',
  },
  rock: {
    label: 'Roca',
    card: 'bg-yellow-700/50',
    chip: 'bg-yellow-800',
    imagePanel: 'bg-yellow-800',
  },
  ghost: {
    label: 'Fantasma',
    card: 'bg-indigo-600/50',
    chip: 'bg-indigo-700',
    imagePanel: 'bg-indigo-700',
  },
  ice: {
    label: 'Hielo',
    card: 'bg-cyan-400/50',
    chip: 'bg-cyan-500',
    imagePanel: 'bg-cyan-500',
  },
  dragon: {
    label: 'Dragón',
    card: 'bg-violet-600/50',
    chip: 'bg-violet-700',
    imagePanel: 'bg-violet-700',
  },
  dark: {
    label: 'Siniestro',
    card: 'bg-neutral-700/50',
    chip: 'bg-neutral-800',
    imagePanel: 'bg-neutral-800',
  },
  steel: {
    label: 'Acero',
    card: 'bg-slate-400/50',
    chip: 'bg-slate-500',
    imagePanel: 'bg-slate-500',
  },
  flying: {
    label: 'Volador',
    card: 'bg-sky-400/50',
    chip: 'bg-sky-500',
    imagePanel: 'bg-sky-500',
  },
}

export const DEFAULT_TYPE_STYLE: TypeStyle = {
  label: 'Desconocido',
  card: 'bg-stone-400/50',
  chip: 'bg-stone-500',
  imagePanel: 'bg-type-normal-panel',
}

export function typeIconUrl(type: string): string {
  return new URL(`../assets/icons/${type}.svg`, import.meta.url).href
}

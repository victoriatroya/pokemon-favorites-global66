interface TypeStyle {
  label: string
  card: string
  chip: string
  imagePanel: string
}

export const TYPE_STYLES: Record<string, TypeStyle> = {
  grass: {
    label: 'Planta',
    card: 'bg-type-normal',
    chip: 'bg-type-grass-secondary',
    imagePanel: 'bg-type-normal',
  },
  fire: {
    label: 'Fuego',
    card: 'bg-type-fire/50',
    chip: 'bg-type-fire',
    imagePanel: 'bg-type-fire',
  },
  poison: {
    label: 'Veneno',
    chip: 'bg-type-poison-secondary',
    card: 'bg-type-fighting',
    imagePanel: 'bg-type-fighting',
  },
  water: {
    label: 'Agua',
    card: 'bg-type-water',
    chip: 'bg-type-water-secondary',
    imagePanel: 'bg-type-water',
  },
  bug: {
    label: 'Bicho',
    card: 'bg-type-grass',
    chip: 'bg-type-grass-third',
    imagePanel: 'bg-type-grass',
  },
  normal: {
    label: 'Normal',
    card: 'bg-type-normal',
    chip: 'bg-type-normal-secondary',
    imagePanel: 'bg-type-normal',
  },
  electric: {
    label: 'Eléctrico',
    card: 'bg-yellow-400/50',
    chip: 'bg-yellow-500',
    imagePanel: 'bg-yellow-500',
  },
  ground: {
    label: 'Tierra',
    card: 'bg-type-ground',
    chip: 'bg-type-ground-secondary',
    imagePanel: 'bg-type-ground',
  },
  fairy: {
    label: 'Hada',
    card: 'bg-pink-400/50',
    chip: 'bg-pink-500',
    imagePanel: 'bg-pink-500',
  },
  fighting: {
    label: 'Lucha',
    card: 'bg-type-fighting/50',
    chip: 'bg-type-fighting-secondary',
    imagePanel: 'bg-type-fighting',
  },
  psychic: {
    label: 'Psíquico',
    card: 'bg-type-psychic',
    chip: 'bg-type-psychic-secondary',
    imagePanel: 'bg-type-psychic',
  },
  rock: {
    label: 'Roca',
    card: 'bg-type-rock/50',
    chip: 'bg-type-rock',
    imagePanel: 'bg-type-rock',
  },
  ghost: {
    label: 'Fantasma',
    card: 'bg-type-ghost',
    chip: 'bg-type-ghost-secondary',
    imagePanel: 'bg-type-ghost',
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
    card: 'bg-type-normal',
    chip: 'bg-type-normal-secondary',
    imagePanel: 'bg-type-normal',
  },
  steel: {
    label: 'Acero',
    card: 'bg-type-normal',
    chip: 'bg-type-normal-secondary',
    imagePanel: 'bg-type-normal',
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

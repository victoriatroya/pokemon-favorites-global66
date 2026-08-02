<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { PokemonDetail, PokemonSpecies, TypeDamageRelations } from '@/types/pokemon'
import { getPokemonDetail, getPokemonSpecies, getTypeRelations } from '@/services/pokemonCache'
import { useFavoritesStore } from '@/stores/favorite'
import { useClipboard } from '@/composables/useClipboard'
import { formatPokemonShare } from '@/utils/formatPokemonShare'
import { formatWeight, formatHeight } from '@/utils/formatUnits'
import { TYPE_STYLES, DEFAULT_TYPE_STYLE } from '@/utils/pokemonTypes'
import TypeIcon from '@/components/ui/TypeIcon.vue'
import LoadingPokeball from '@/components/ui/LoadingPokeball.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import PokemonGender from '@/components/pokemon/PokemonGender.vue'
import PokemonWeaknesses from '@/components/pokemon/PokemonWeaknesses.vue'

import favOutlineIcon from '@/assets/icons/fav.svg'
import favSolidIcon from '@/assets/icons/fav-solid.svg'
import imgError from '@/assets/images/empty-state.svg'
import AttributeCard from '@/components/ui/AttributeCard.vue'
import weightIcon from '@/assets/icons/weight.svg'
import heightIcon from '@/assets/icons/height.svg'
import pokeball from '@/assets/icons/pokeball.svg'
import category from '@/assets/icons/category.svg'
import { computeWeaknesses } from '@/utils/computeWeaknesses'
import { getCategory, getDescription } from '@/utils/pokemonCategory'

const props = defineProps<{ name: string }>()

const pokemon = ref<PokemonDetail | null>(null)
const error = ref<string | null>(null)
const species = ref<PokemonSpecies | null>(null)
const weaknesses = ref<string[]>([])

const router = useRouter()
const favorites = useFavoritesStore()
const { copied, copy } = useClipboard()

watch(
  () => props.name,
  async (name) => {
    error.value = null
    pokemon.value = null
    species.value = null
    weaknesses.value = []

    let detail: PokemonDetail
    try {
      detail = await getPokemonDetail(name)
      pokemon.value = detail
    } catch {
      error.value = 'No pudimos cargar este pokémon.'
      return
    }

    getPokemonSpecies(name)
      .then((s) => (species.value = s))
      .catch((e) => console.error('[species]', e))

    Promise.all(detail.types.map((t) => getTypeRelations(t.type.name)))
      .then(
        (rels: TypeDamageRelations[]) =>
          (weaknesses.value = computeWeaknesses(rels.map((r) => r.damage_relations))),
      )
      .catch((e) => console.error('[weaknesses]', e))
  },
  { immediate: true },
)

const mainType = computed(() => {
  const firstType = pokemon.value?.types[0]?.type.name
  return firstType ? (TYPE_STYLES[firstType] ?? DEFAULT_TYPE_STYLE) : DEFAULT_TYPE_STYLE
})

const number = computed(() =>
  pokemon.value ? `N°${String(pokemon.value.id).padStart(3, '0')}` : '',
)

const artwork = computed(() => pokemon.value?.sprites.other['official-artwork'].front_default ?? '')

const categoryName = computed(() => (species.value ? getCategory(species.value) : null))

const description = computed(() => (species.value ? getDescription(species.value) : null))

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push({ name: 'home' })
}

function onShare() {
  if (pokemon.value) copy(formatPokemonShare(pokemon.value))
}
</script>

<template>
  <div
    v-if="!pokemon && !error"
    class="flex min-h-screen items-center justify-center bg-neutral-light"
  >
    <LoadingPokeball />
  </div>

  <main v-else-if="error" class="min-h-screen w-full max-w-2xl mx-auto bg-neutral-light">
    <EmptyState
      :image="imgError"
      title="Algo salió mal..."
      description="No pudimos cargar la información de este pokémon."
    >
      <template #action>
        <button
          type="button"
          class="cursor-pointer rounded-full bg-blue hover:bg-blue-dark px-10 py-3 font-semibold text-white shadow-sm cursor-pointer"
          @click="goBack"
        >
          Volver
        </button>
      </template>
    </EmptyState>
  </main>

  <main v-else-if="pokemon" class="min-h-screen w-full bg-neutral-light pb-10">
    <div class="relative flex h-72 items-end justify-center md:h-80" :class="mainType.imagePanel">
      <TypeIcon
        :type="pokemon.types[0]?.type.name ?? ''"
        color-class="bg-white/35"
        class="absolute inset-0 m-auto h-52 w-52"
        aria-hidden="true"
      />
      <img
        :src="artwork"
        :alt="pokemon.name"
        class="relative h-56 w-56 object-contain md:h-64 md:w-64"
      />

      <button
        type="button"
        class="cursor-pointer absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-neutral-dark shadow"
        aria-label="Volver"
        @click="goBack"
      >
        <svg
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        class="cursor-pointer absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full"
        :aria-label="
          favorites.isFavorite(pokemon.name) ? 'Quitar de favoritos' : 'Agregar a favoritos'
        "
        @click="favorites.toggleFavorite(pokemon.name)"
      >
        <img
          :src="favorites.isFavorite(pokemon.name) ? favSolidIcon : favOutlineIcon"
          alt=""
          class="h-9 w-9"
        />
      </button>
    </div>

    <section class="mx-auto w-full max-w-2xl px-6 py-6">
      <h1 class="text-3xl font-semibold capitalize text-neutral-dark">{{ pokemon.name }}</h1>
      <p class="text-sm font-semibold text-neutral-mid">{{ number }}</p>

      <ul class="mt-5 flex gap-2">
        <li
          v-for="t in pokemon.types"
          :key="t.type.name"
          class="flex items-center gap-1.5 rounded-full py-1 pl-1 pr-3 text-xs font-semibold text-white"
          :class="(TYPE_STYLES[t.type.name] ?? DEFAULT_TYPE_STYLE).chip"
        >
          <span class="grid h-5 w-5 place-items-center rounded-full bg-white">
            <TypeIcon
              class="h-3 w-3"
              :type="t.type.name"
              :color-class="(TYPE_STYLES[t.type.name] ?? DEFAULT_TYPE_STYLE).chip"
            />
          </span>
          {{ (TYPE_STYLES[t.type.name] ?? DEFAULT_TYPE_STYLE).label }}
        </li>
      </ul>

      <p v-if="description" class="mt-4 text-sm leading-relaxed text-neutral-mid">
        {{ description }}
      </p>

      <div class="mt-6 grid grid-cols-2 gap-3 border-t border-gray-dark pt-6">
        <AttributeCard :icon="weightIcon" label="Peso" :value="formatWeight(pokemon.weight)" />
        <AttributeCard :icon="heightIcon" label="Altura" :value="formatHeight(pokemon.height)" />
        <AttributeCard
          :icon="category"
          label="Categoría"
          :value="categoryName ?? '—'"
          class="uppercase"
        />
        <AttributeCard
          :icon="pokeball"
          label="Habilidad"
          :value="pokemon.abilities[0]?.ability.name ?? '—'"
          class="capitalize"
        />
      </div>

      <PokemonGender v-if="species" :gender-rate="species.gender_rate" />
      <PokemonWeaknesses :weaknesses="weaknesses" />

      <div class="flex justify-center items-center mt-4">
        <button
          type="button"
          class="cursor-pointer mt-8 w-full rounded-full bg-blue px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-blue-dark md:w-auto"
          @click="onShare"
        >
          {{ copied ? '¡Copiado!' : 'Compartir con mis amigos' }}
        </button>
      </div>
    </section>
  </main>
</template>

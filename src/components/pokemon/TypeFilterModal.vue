<script setup lang="ts">
import { ref } from 'vue'
import { TYPE_STYLES } from '@/utils/pokemonTypes'

const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'close'): void
}>()

const draft = ref<string[]>([...props.modelValue])

const allTypes = Object.entries(TYPE_STYLES)
  .map(([key, style]) => ({ key, label: style.label }))
  .sort((a, b) => a.label.localeCompare(b.label))

function toggle(type: string) {
  draft.value = draft.value.includes(type)
    ? draft.value.filter((t) => t !== type)
    : [...draft.value, type]
}

function apply() {
  emit('update:modelValue', draft.value)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-end justify-center bg-black/50 md:items-center md:p-4"
      @click.self="emit('close')"
    >
      <div
        class="flex max-h-[80vh] w-full flex-col rounded-t-3xl bg-white p-6 md:max-w-sm md:rounded-3xl"
        role="dialog"
        aria-modal="true"
        aria-label="Filtra por tus preferencias"
      >
        <div class="flex items-center justify-between">
          <button
            type="button"
            class="cursor-pointer text-xl text-neutral-mid"
            aria-label="Cerrar"
            @click="emit('close')"
          >
            ✕
          </button>
          <h2 class="flex-1 text-center text-lg font-bold text-neutral-dark">
            Filtra por tus preferencias
          </h2>
          <span class="w-5" />
        </div>

        <p class="mt-6 font-semibold text-neutral-dark">Tipo</p>

        <ul class="mt-2 flex-1 divide-y divide-neutral-100 overflow-y-auto pr-4">
          <li v-for="t in allTypes" :key="t.key" class="border-none">
            <label class="flex cursor-pointer items-center justify-between py-3">
              <span class="text-sm text-neutral-dark">{{ t.label }}</span>
              <input
                type="checkbox"
                class="h-4 w-4 accent-blue-600"
                :checked="draft.includes(t.key)"
                @change="toggle(t.key)"
              />
            </label>
          </li>
        </ul>

        <div class="mt-4 flex flex-col gap-2">
          <button
            type="button"
            class="cursor-pointer rounded-full bg-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            @click="apply"
          >
            Aplicar
          </button>
          <button
            type="button"
            class="cursor-pointer rounded-full bg-neutral-100 px-6 py-3 font-semibold text-neutral-dark"
            @click="emit('close')"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

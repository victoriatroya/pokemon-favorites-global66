import { ref } from 'vue'

export function useClipboard(resetAfterMs = 2000) {
  const copied = ref(false)

  async function copy(text: string) {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => (copied.value = false), resetAfterMs)
  }

  return { copied, copy }
}

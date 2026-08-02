import { ref, watch, onBeforeUnmount, type Ref } from 'vue'

export function useInfiniteScroll(
  sentinel: Ref<HTMLElement | null>,
  onReachEnd: () => void,
  options: { rootMargin?: string } = {},
) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) onReachEnd()
    },
    { rootMargin: options.rootMargin ?? '300px' },
  )

  watch(sentinel, (el, prev) => {
    if (prev) observer.unobserve(prev)
    if (el) observer.observe(el)
  })

  onBeforeUnmount(() => observer.disconnect())
}

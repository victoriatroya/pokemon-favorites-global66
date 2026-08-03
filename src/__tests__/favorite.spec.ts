import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '@/stores/favorite'

describe('favorites store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('empieza vacío', () => {
    const store = useFavoritesStore()
    expect(store.favorites).toEqual([])
  })

  it('toggle agrega y quita un favorito', () => {
    const store = useFavoritesStore()

    store.toggleFavorite('pikachu')
    expect(store.isFavorite('pikachu')).toBe(true)

    store.toggleFavorite('pikachu')
    expect(store.isFavorite('pikachu')).toBe(false)
  })

  it('persiste en localStorage al cambiar', async () => {
    const store = useFavoritesStore()
    store.toggleFavorite('bulbasaur')

    await Promise.resolve()

    expect(JSON.parse(localStorage.getItem('pokemon-favorites')!)).toEqual(['bulbasaur'])
  })

  it('se hidrata desde localStorage al crearse', () => {
    localStorage.setItem('pokemon-favorites', JSON.stringify(['charmander']))
    setActivePinia(createPinia())

    const store = useFavoritesStore()
    expect(store.isFavorite('charmander')).toBe(true)
  })

  it('ignora storage corrupto y empieza limpio', () => {
    localStorage.setItem('pokemon-favorites', '{esto no es json válido')
    setActivePinia(createPinia())

    const store = useFavoritesStore()
    expect(store.favorites).toEqual([])
  })
})

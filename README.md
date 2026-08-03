# Pokédex — Prueba técnica Front End (Vue.js) · Global66

Aplicación de lista de pokémons favoritos construida con Vue 3, consumiendo [PokeAPI](https://pokeapi.co/). Diseño mobile-first basado en el Figma, adaptado a desktop.

## Stack

- **Vue 3 + TypeScript + Vite** — Composition API con `<script setup>`; TypeScript tipa los contratos con la API y los props de los componentes.
- **Pinia** — store oficial de Vue 3, usado para los favoritos.
- **Vue Router** — Pokédex, detalle, favoritos, onboarding y secciones en construcción.
- **Tailwind CSS v4** — design tokens en `@theme` extraídos del Figma.
- **Vitest + Vue Test Utils** — unit tests.

## Cómo correr el proyecto

```bash
npm install
npm run dev        # servidor de desarrollo
npm run test:unit  # unit tests
npm run build      # build de producción
```

Requiere Node 22/24 LTS.

## Arquitectura

```
src/
  components/
    ui/          → componentes base del dominio (SearchInput, EmptyState, NavBar, AttributeCard...)
    pokemon/     → componentes de dominio (PokemonCard, TypeChip, PokemonGender, PokemonWeaknesses, TypeFilterModal...)
  composables/   → lógica reutilizable (usePokemonList, usePokemonSearch, useInfiniteScroll, useClipboard)
  services/      → acceso a datos (pokemonService, pokemonCache)
  stores/        → estado global (favoritos)
  utils/         → funciones puras (formatPokemonShare, formatUnits, genderRatio, computeWeaknesses...)
  views/         → pantallas de la app
  types/         → contratos TypeScript de la API
```

Principios aplicados:

- **Single Responsibility**: componentes presentacionales (props + eventos), lógica en composables, datos en servicios. `PokemonCard` no conoce el store, por eso se reutiliza en lista, búsqueda y favoritos con comportamientos distintos.
- **Inversión de dependencias**: la capa de datos expone la interfaz `IPokemonRepository`; el resto depende de la interfaz, lo que facilita mockear en tests.
- **Open/Closed**: `EmptyState` cubre vacío, error, con props y un slot de acción, sin modificarse por caso.
- **DRY**: el chip de tipo es un solo componente (`TypeChip`) usado en cards, detalle y debilidades; el tinte de íconos SVG se resuelve una vez con CSS mask; los colores viven una sola vez como tokens.

## Pensando en gran cantidad de data

La PokeAPI expone ~1300 pokémons. Decisiones tomadas:

- **Scroll infinito** (`limit`/`offset` + IntersectionObserver con `rootMargin` de 300px): 20 por tanda, y la siguiente se pide antes de llegar al final.
- **Detalles en paralelo por página** (`Promise.all` de a 20): el endpoint de lista solo trae nombres y las cards necesitan tipos, número y sprite.
- **Caché con deduplicación**: cada recurso se pide a la API una sola vez por sesión, una fábrica (`createCachedFetcher`) le agrega esa lógica a cualquier fetcher, y la reutilizo para detalles, species y tipos sin repetir código. Como guarda la petición en curso y no solo el resultado, dos componentes que piden lo mismo al mismo tiempo comparten un único request; y si un llamado falla, se limpia la entrada para poder reintentar. El caché vive solo en memoria a propósito: la prueba pide no persistir data de la API.
- **Búsqueda global con índice en cliente**: PokeAPI no tiene endpoint de búsqueda; en la primera búsqueda se trae el índice de nombres (un request, lazy) y se filtra en memoria, pidiendo detalle solo de los matches. Debounce de 300ms, submit inmediato con botón/Enter, solo la búsqueda más reciente escribe resultados).

## Favoritos

- **Pinia** con setup store; guarda solo **nombres** (fuente de verdad mínima) — los detalles se resuelven vía caché, sin duplicar objetos grandes en el estado global.
- **Persistencia manual en localStorage**: hidratación al crear el store + `watch` profundo que guarda en cada cambio, con manejo de storage bloqueado.
- **Eliminar**: Al eliminar, se quita el nombre del pokémon del store, la persistencia en localStorage se actualiza automáticamente vía el watch

## Botón compartir

Copia al portapapeles el nombre con sus atributos separados por coma (`bulbasaur, weight: 69, height: 7, types: grass, poison`) usando `navigator.clipboard` a través de `useClipboard`, con feedback visual de copiado.

## Loading

## Página de detalle

Ruta propia (`/pokemon/:name`, compartible por URL) con estados de loading/error para el acceso directo y back inteligente. Muestra:

- Peso y altura convertidos: la API entrega **hectogramos y decímetros**; `formatWeight`/`formatHeight` los convierten a `6,9 kg` / `0,7 m` (coma decimal, como el diseño).
- **Género, categoría y descripción** desde `pokemon-species` (tres datos por un solo llamado), y **habilidad en español** desde `/ability/{name}`. El caso `gender_rate: -1` muestra "Sin género"; los flavor texts se limpian de caracteres de control heredados de los juegos.
- **Debilidades** desde `/type/{name}`: solo existen 18 tipos.
  `computeWeaknesses` combina las `damage_relations` por multiplicadores, manejando correctamente los tipos dobles.

## Filtro por tipo

Con estado borrador (Aplicar confirma, Cancelar descarta), badge de filtros activos y contador de resultados con "Borrar filtro". Con filtro activo **se pausa el scroll infinito**.

## Adaptación mobile → desktop

- Mobile-first Figma; en desktop el contenido crece **agregando columnas** (grid 1/2/3) en lugar de estirar cards.
- **NavBar única responsive**: bottom bar fija en móvil (como el diseño), top bar sticky en desktop.
- **Onboarding** de dos pasos solo en la primera visita (flag en localStorage + navigation guard); en desktop se presenta como card centrada.

## Testing

Unit tests con Vitest (~28 tests) sobre las piezas de mayor valor:

- **Store de favoritos**: agregar y quitar favoritos, que cada cambio se guarde en localStorage, que al volver a abrir la app los favoritos se recuperen, y que unos datos corruptos en el storage no rompan nada (la app arranca limpia).
- **Funciones puras de formato y dominio**: `formatWeight`/`formatHeight` (conversión de unidades con coma decimal), `formatPokemonShare` (formato del portapapeles), `getGenderRatio` (octavos → porcentajes, caso sin género), `getCategory`/`getDescription`/`getAbilityName` (fallbacks de idioma es→en y limpieza de caracteres de control de los juegos), `computeWeaknesses` (cancelación por resistencias, acumulación ×4, inmunidades).
- **`createCachedFetcher`** con fetcher mockeado (`vi.fn`): pide una sola vez, evita peticiones repetidas.

## CI/CD

CI — GitHub Actions: en cada push y pull request corre el pipeline (lint, unit tests y build con type-check). Instala dependencias con npm ci para builds reproducibles desde el lock file.
CD — Cloudflare Pages: conectado al repositorio; cada push a main construye y despliega automáticamente, y cada rama genera un preview deployment con su propia URL.

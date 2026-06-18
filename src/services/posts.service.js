const STORAGE_KEY = 'postflow.posts.v1'

const seedPosts = [
  {
    id: 'p-1001',
    title: 'Una interfaz que siempre tiene algo para mostrar',
    summary: 'Las vistas de PostFlow priorizan contenido real, bloques útiles y feedback inmediato.',
    content:
      'PostFlow nace para evitar pantallas vacías. Cada vista mantiene contexto, acciones visibles y una sensación de producto terminado incluso cuando el usuario está explorando.',
    user: 'Equipo PostFlow',
    featured: true,
    status: 'published',
    createdAt: '2026-06-01T12:00:00.000Z',
    updatedAt: '2026-06-15T10:20:00.000Z',
  },
  {
    id: 'p-1002',
    title: 'Formulario único para crear y editar',
    summary: 'Una sola experiencia reduce fricción y ayuda a que la edición se sienta natural.',
    content:
      'El formulario reutilizable mantiene consistencia visual, valida datos esenciales y acompaña al usuario con una vista previa en tiempo real que refuerza el resultado final.',
    user: 'Jordy',
    featured: false,
    status: 'published',
    createdAt: '2026-06-04T15:30:00.000Z',
    updatedAt: '2026-06-13T08:45:00.000Z',
  },
  {
    id: 'p-1003',
    title: 'Arquitectura modular para crecer sin ruido',
    summary: 'Contexto, hooks y servicios separan responsabilidades y facilitan mantenimiento.',
    content:
      'Cada capa resuelve una preocupación concreta: datos, estado, navegación y presentación. Esa separación permite sumar nuevas pantallas o reglas sin romper la experiencia actual.',
    user: 'Equipo PostFlow',
    featured: true,
    status: 'published',
    createdAt: '2026-06-08T11:10:00.000Z',
    updatedAt: '2026-06-16T16:05:00.000Z',
  },
  {
    id: 'p-1004',
    title: 'Una tercera ruta que aporte contexto',
    summary: 'La página Acerca de completa la navegación y explica el proyecto sin interrumpir el flujo.',
    content:
      'La ruta Acerca de funciona como una pieza de orientación. Explica objetivo, tecnologías e integrantes para que el proyecto no dependa solo de la pantalla principal.',
    user: 'Jordy',
    featured: false,
    status: 'draft',
    createdAt: '2026-06-02T09:00:00.000Z',
    updatedAt: '2026-06-10T09:00:00.000Z',
  },
  {
    id: 'p-1005',
    title: 'Animaciones sutiles, sensación premium',
    summary: 'Pequeños cambios de elevación y contraste ayudan a que la UI se sienta viva.',
    content:
      'Las animaciones no deben distraer. En PostFlow se usan para guiar la mirada, reforzar jerarquía y acompañar los estados principales con suavidad.',
    user: 'Equipo PostFlow',
    featured: false,
    status: 'published',
    createdAt: '2026-06-11T18:35:00.000Z',
    updatedAt: '2026-06-12T20:00:00.000Z',
  },
]

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function clonePosts(posts) {
  return posts.map((post) => ({ ...post }))
}

function isValidPost(post) {
  return Boolean(
    post &&
      typeof post.id === 'string' &&
      typeof post.title === 'string' &&
      typeof post.content === 'string' &&
      typeof post.summary === 'string' &&
      typeof post.user === 'string' &&
      typeof post.createdAt === 'string' &&
      typeof post.updatedAt === 'string',
  )
}

export function loadPosts() {
  if (!canUseStorage()) {
    return clonePosts(seedPosts)
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY)

  if (!storedValue) {
    return clonePosts(seedPosts)
  }

  try {
    const parsedValue = JSON.parse(storedValue)

    if (!Array.isArray(parsedValue)) {
      throw new Error('El formato de las publicaciones guardadas es inválido.')
    }

    if (!parsedValue.every(isValidPost)) {
      throw new Error('Algunas publicaciones guardadas están corruptas.')
    }

    if (parsedValue.length === 0) {
      return []
    }

    return clonePosts(parsedValue)
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('No se pudieron leer las publicaciones guardadas.', { cause: error })
    }

    if (error instanceof Error) {
      throw new Error('No se pudieron cargar las publicaciones.', { cause: error })
    }

    throw new Error('No se pudieron cargar las publicaciones.', { cause: error })
  }
}

export function savePosts(posts) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

export function createSummary(content) {
  const cleanContent = content.trim().replace(/\s+/g, ' ')

  if (cleanContent.length <= 110) {
    return cleanContent
  }

  return `${cleanContent.slice(0, 107).trimEnd()}...`
}

export function createPostRecord({ title, content }) {
  const timestamp = new Date().toISOString()

  return {
    id:
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `post-${Date.now()}`,
    title: title.trim(),
    summary: createSummary(content),
    content: content.trim(),
    user: 'Equipo PostFlow',
    featured: false,
    status: 'published',
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}

export function updatePostRecord(post, updates) {
  return {
    ...post,
    ...updates,
    summary: createSummary(updates.content),
    updatedAt: new Date().toISOString(),
  }
}

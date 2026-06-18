import { useMemo, useState } from 'react'
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal.jsx'
import { StatsGrid } from '../components/StatsGrid.jsx'
import { EmptyState } from '../components/ui/EmptyState.jsx'
import { SearchBar } from '../components/ui/SearchBar.jsx'
import { usePosts } from '../context/PostsContext.jsx'
import { usePostsFilters } from '../hooks/usePostsFilters.js'
import { PostCard } from '../components/PostCard.jsx'
import { Button } from '../components/ui/Button.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { Spinner } from '../components/ui/Spinner.jsx'

function sortByUpdatedDate(posts) {
  return [...posts].sort((leftPost, rightPost) => new Date(rightPost.updatedAt) - new Date(leftPost.updatedAt))
}

export function PostsPage() {
  const { posts, sessionStats, deletePost, isLoading, error, reloadPosts } = usePosts()
  const { showToast } = useToast()
  const [pendingDelete, setPendingDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const { query, setQuery, filteredPosts } = usePostsFilters(sortByUpdatedDate(posts))

  const counts = useMemo(
    () => ({
      total: posts.length,
      visible: filteredPosts.length,
    }),
    [filteredPosts.length, posts],
  )

  return (
    <div className="page-frame page-frame--home">
      <header className="home-header">
        <span className="eyebrow">Inicio</span>
        <h1>Gestioná publicaciones de forma simple y moderna.</h1>
      </header>

      {isLoading ? (
        <section className="page-state page-state--loading" aria-label="Cargando publicaciones">
          <Spinner size="lg" />
          <p>Cargando publicaciones...</p>
        </section>
      ) : error ? (
        <EmptyState
          icon="!"
          title="No pudimos cargar las publicaciones."
          description={error.message}
          actionLabel="Reintentar"
          actionOnClick={reloadPosts}
        />
      ) : (
        <>
      <StatsGrid
        total={posts.length}
        sessionCreated={sessionStats.created}
        sessionDeleted={sessionStats.deleted}
        visible={filteredPosts.length}
      />

      <section className="home-search" aria-label="Buscador de publicaciones">
        <SearchBar
          label="Buscar publicaciones"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por título, contenido, usuario o ID"
        />
      </section>

      <section className="home-actions">
        <Button to="/posts/new">
          Nuevo Post
        </Button>
      </section>

      <section className="home-count">
        <span className="toolbar__count">{counts.total} Posts · {counts.visible} visibles</span>
      </section>

      {query.trim() && filteredPosts.length === 0 ? (
        <EmptyState
          icon="⌕"
          title="No encontramos publicaciones."
          description="Probá con otro término de búsqueda o limpiá el buscador para ver todos los posts."
          actionLabel="Limpiar búsqueda"
          actionOnClick={() => setQuery('')}
        />
      ) : posts.length === 0 ? (
        <EmptyState
          icon="✦"
          title="Aún no hay publicaciones."
          description="Creá el primer post para empezar a poblar la aplicación con contenido."
          actionLabel="Crear publicación"
          actionTo="/posts/new"
        />
      ) : filteredPosts.length > 0 ? (
        <section className="cards-grid home-list" aria-label="Listado de publicaciones">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onDelete={setPendingDelete} />
          ))}
        </section>
      ) : (
        <EmptyState
          icon="✦"
          title="No encontramos coincidencias"
          description="Probá con otro término o volvé al listado general. Siempre podés crear una nueva publicación desde acá."
          actionLabel="Crear publicación"
          actionTo="/posts/new"
        />
      )}

        </>
      )}
      <ConfirmDeleteModal
        open={Boolean(pendingDelete)}
        post={pendingDelete}
        loading={isDeleting}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            setIsDeleting(true)

            window.setTimeout(() => {
              deletePost(pendingDelete.id)
              showToast('Publicación eliminada', 'success')
              setIsDeleting(false)
              setPendingDelete(null)
            }, 240)
          }
        }}
      />
    </div>
  )
}

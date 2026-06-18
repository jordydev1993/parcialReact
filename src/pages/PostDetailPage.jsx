import { Link, Navigate, useParams } from 'react-router-dom'
import { usePosts } from '../context/PostsContext.jsx'
import { Spinner } from '../components/ui/Spinner.jsx'
import { EmptyState } from '../components/ui/EmptyState.jsx'

export function PostDetailPage() {
  const { postId } = useParams()
  const { getPostById, isLoading, error } = usePosts()
  const post = getPostById(postId)

  if (isLoading) {
    return (
      <section className="page-state page-state--loading">
        <Spinner size="lg" />
        <p>Cargando publicación...</p>
      </section>
    )
  }

  if (error) {
    return (
      <EmptyState
        icon="!"
        title="No pudimos abrir esta publicación."
        description={error.message}
        actionLabel="Volver al inicio"
        actionTo="/"
      />
    )
  }

  if (!post) {
    return <Navigate to="/" replace />
  }

  return (
    <section className="detail-layout">
      <article className="detail-article">
        <div className="post-card__top">
          <span className={`badge ${post.featured ? 'badge--secondary' : 'badge--muted'}`}>
            {post.featured ? 'Destacado' : post.status === 'draft' ? 'Borrador' : 'Publicado'}
          </span>
          <span className="badge badge--primary">Detalle</span>
        </div>

        <h1 className="detail-title">{post.title}</h1>

        <div className="detail-content">
          <p className="detail-copy">
            Una vista limpia para leer el contenido completo sin perder accesos rápidos a edición o navegación.
          </p>
          <p className="detail-body">{post.content}</p>
        </div>

        <div className="detail-actions">
          <Link to="/" className="app-button-ghost">
            Volver
          </Link>
          <Link to={`/posts/${post.id}/edit`} className="app-button-secondary">
            Editar
          </Link>
        </div>
      </article>

      <aside className="detail-sidebar">
        <div className="detail-card">
          <div className="detail-card__row">
            <span className="detail-card__label">Usuario</span>
            <strong>{post.user}</strong>
          </div>

          <div className="detail-card__row">
            <span className="detail-card__label">ID</span>
            <strong>{post.id}</strong>
          </div>

          <div className="detail-card__row">
            <span className="detail-card__label">Actualización</span>
            <strong>{new Date(post.updatedAt).toLocaleDateString('es-AR', { dateStyle: 'long' })}</strong>
          </div>
        </div>

        <div className="detail-card">
          <span className="badge badge--primary">Resumen</span>
          <p className="detail-copy">{post.summary}</p>
        </div>
      </aside>
    </section>
  )
}

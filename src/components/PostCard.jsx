import { Button } from './ui/Button.jsx'
import { Card } from './ui/Card.jsx'

function getAvatarLabel(text) {
  const normalizedText = text.trim().replace(/\s+/g, ' ')

  if (!normalizedText) {
    return 'PF'
  }

  return normalizedText
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function formatPostDate(dateValue) {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateValue))
}

export function PostCard({ post, onDelete }) {
  const avatarLabel = getAvatarLabel(post.title || post.user)
  const publishedDate = formatPostDate(post.createdAt || post.updatedAt)

  return (
    <Card className="post-card">
      <div className="post-card__top">
        <div className="post-card__avatar" aria-hidden="true">
          {avatarLabel}
        </div>

        <div className="post-card__meta">
          <h2 className="post-card__title">{post.title}</h2>
          <span className="post-card__date">{publishedDate}</span>
        </div>
      </div>

      <p className="post-card__summary">{post.content}</p>

      <div className="post-card__footer">
        <Button to={`/posts/${post.id}`} variant="ghost">
          Ver
        </Button>
        <Button to={`/posts/${post.id}/edit`} variant="secondary">
          Editar
        </Button>
        <Button variant="danger" onClick={() => onDelete(post)}>
          Eliminar
        </Button>
      </div>
    </Card>
  )
}

import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { PostForm } from '../components/PostForm.jsx'
import { usePosts } from '../context/PostsContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { Spinner } from '../components/ui/Spinner.jsx'
import { EmptyState } from '../components/ui/EmptyState.jsx'

export function PostFormPage({ mode }) {
  const navigate = useNavigate()
  const { postId } = useParams()
  const { getPostById, createPost, updatePost, isLoading, error } = usePosts()
  const { showToast } = useToast()
  const post = mode === 'edit' ? getPostById(postId) : null

  if (isLoading) {
    return (
      <section className="page-state page-state--loading">
        <Spinner size="lg" />
        <p>Cargando formulario...</p>
      </section>
    )
  }

  if (error) {
    return (
      <EmptyState
        icon="!"
        title="No pudimos cargar el formulario."
        description={error.message}
        actionLabel="Volver al inicio"
        actionTo="/"
      />
    )
  }

  if (mode === 'edit' && !post) {
    return <Navigate to="/" replace />
  }

  return (
    <PostForm
      initialValues={post ? { title: post.title, content: post.content } : { title: '', content: '' }}
      submitLabel={mode === 'edit' ? 'Guardar cambios' : 'Crear publicación'}
      onCancel={() => navigate(-1)}
      onSubmit={(values) => {
        const savedPost = mode === 'edit' ? updatePost(post.id, values) : createPost(values)

        showToast(mode === 'edit' ? 'Cambios guardados' : 'Publicación creada', 'success')

        navigate(savedPost ? `/posts/${savedPost.id}` : '/')
      }}
    />
  )
}

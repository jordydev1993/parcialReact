import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createPostRecord, loadPosts, savePosts, updatePostRecord } from '../services/posts.service.js'

const PostsContext = createContext(null)

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sessionStats, setSessionStats] = useState({ created: 0, deleted: 0 })

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const loadedPosts = loadPosts()

        setPosts(loadedPosts)
        setError(null)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError : new Error('No se pudieron cargar las publicaciones.'))
      } finally {
        setIsLoading(false)
      }
    }, 450)

    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (!isLoading && !error) {
      savePosts(posts)
    }
  }, [error, isLoading, posts])

  const reloadPosts = () => {
    setIsLoading(true)
    setError(null)

    window.setTimeout(() => {
      try {
        const loadedPosts = loadPosts()

        setPosts(loadedPosts)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError : new Error('No se pudieron cargar las publicaciones.'))
      } finally {
        setIsLoading(false)
      }
    }, 450)
  }

  const value = useMemo(() => {
    const createPost = ({ title, content }) => {
      const nextPost = createPostRecord({ title, content })

      setPosts((currentPosts) => [nextPost, ...currentPosts])
      setSessionStats((s) => ({ ...s, created: s.created + 1 }))

      return nextPost
    }

    const updatePost = (postId, updates) => {
      let updatedPost = null

      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.id !== postId) {
            return post
          }

          updatedPost = updatePostRecord(post, updates)

          return updatedPost
        }),
      )

      return updatedPost
    }

    const deletePost = (postId) => {
      setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId))
      setSessionStats((s) => ({ ...s, deleted: s.deleted + 1 }))
    }

    const getPostById = (postId) => posts.find((post) => post.id === postId) ?? null

    return {
      posts,
      totalPosts: posts.length,
      sessionStats,
      isLoading,
      error,
      reloadPosts,
      createPost,
      updatePost,
      deletePost,
      getPostById,
    }
  }, [error, isLoading, posts, sessionStats])

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePosts() {
  const context = useContext(PostsContext)

  if (!context) {
    throw new Error('usePosts must be used inside PostsProvider')
  }

  return context
}

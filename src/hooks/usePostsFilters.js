import { useMemo, useState } from 'react'

const RECENT_WINDOW_MS = 1000 * 60 * 60 * 24 * 7

function matchesFilter(post, filter) {
  if (filter === 'featured') {
    return post.featured
  }

  if (filter === 'recent') {
    return new Date(post.updatedAt).getTime() >= Date.now() - RECENT_WINDOW_MS
  }

  return true
}

export function usePostsFilters(posts) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return posts.filter((post) => {
      const haystack = [post.title, post.summary, post.content, post.user, post.id]
        .join(' ')
        .toLowerCase()

      const matchesQuery = normalizedQuery.length === 0 || haystack.includes(normalizedQuery)

      return matchesQuery && matchesFilter(post, filter)
    })
  }, [filter, posts, query])

  return {
    query,
    setQuery,
    filter,
    setFilter,
    filteredPosts,
  }
}

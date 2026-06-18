import { useState } from 'react'

export const TITLE_MAX = 100
export const CONTENT_MAX = 1000

export function usePostForm({ initialValues, onSubmit }) {
  const [formValues, setFormValues] = useState(initialValues ?? { title: '', content: '' })
  const [touched, setTouched] = useState({ title: false, content: false })

  const titleError = touched.title && !formValues.title.trim() ? 'El título es obligatorio.' : ''
  const contentError = touched.content && !formValues.content.trim() ? 'El contenido es obligatorio.' : ''
  const titleOver = formValues.title.length > TITLE_MAX
  const contentOver = formValues.content.length > CONTENT_MAX
  const isValid = !!formValues.title.trim() && !!formValues.content.trim() && !titleOver && !contentOver

  function handleChange(event) {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleBlur(event) {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  function handleClear() {
    setFormValues({ title: '', content: '' })
    setTouched({ title: false, content: false })
  }

  function handleSubmit(event) {
    event.preventDefault()
    setTouched({ title: true, content: true })
    if (!isValid) return
    onSubmit({
      title: formValues.title.trim(),
      content: formValues.content.trim(),
    })
  }

  return {
    formValues,
    touched,
    titleError,
    contentError,
    titleOver,
    contentOver,
    isValid,
    handleChange,
    handleBlur,
    handleClear,
    handleSubmit,
  }
}

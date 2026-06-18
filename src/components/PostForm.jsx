import { useEffect, useRef } from 'react'
import { Badge } from './ui/Badge.jsx'
import { Button } from './ui/Button.jsx'
import { Card } from './ui/Card.jsx'
import { Input } from './ui/Input.jsx'
import { Textarea } from './ui/Textarea.jsx'
import { usePostForm, TITLE_MAX, CONTENT_MAX } from '../hooks/usePostForm.js'

export function PostForm({ initialValues, onSubmit, submitLabel, onCancel }) {
  const titleRef = useRef(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  const {
    formValues,
    touched,
    titleError,
    contentError,
    titleOver,
    contentOver,
    handleChange,
    handleBlur,
    handleClear,
    handleSubmit,
  } = usePostForm({ initialValues, onSubmit })

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <Card className="form-card">
        <div className="form-stack">
          <div className="form-header">
            <div>
              <h1 className="form-title">{submitLabel}</h1>
              <p className="form-help">Completá los campos y revisá la vista previa antes de guardar.</p>
            </div>
          </div>

          <div className="form-row">
            <div className="form-label-row">
              <label className="form-label" htmlFor="title">
                Título <span className="form-required" aria-hidden="true">*</span>
              </label>
              <span className={`form-char-count ${titleOver ? 'form-char-count--over' : ''}`}>
                {formValues.title.length}/{TITLE_MAX}
              </span>
            </div>
            <Input
              ref={titleRef}
              id="title"
              name="title"
              className={`form-field ${titleError ? 'field--error' : touched.title && formValues.title.trim() ? 'field--valid' : ''}`}
              value={formValues.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Escribí un título claro y atractivo"
              autoComplete="off"
              aria-describedby={titleError ? 'title-error' : undefined}
            />
            {titleError && <p id="title-error" className="field-error-msg">{titleError}</p>}
            {titleOver && <p className="field-error-msg">El título no puede superar {TITLE_MAX} caracteres.</p>}
          </div>

          <div className="form-row">
            <div className="form-label-row">
              <label className="form-label" htmlFor="content">
                Contenido <span className="form-required" aria-hidden="true">*</span>
              </label>
              <span className={`form-char-count ${contentOver ? 'form-char-count--over' : ''}`}>
                {formValues.content.length}/{CONTENT_MAX}
              </span>
            </div>
            <Textarea
              id="content"
              name="content"
              className={`form-textarea ${contentError ? 'field--error' : touched.content && formValues.content.trim() ? 'field--valid' : ''}`}
              value={formValues.content}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Desarrollá el cuerpo de la publicación..."
              aria-describedby={contentError ? 'content-error' : undefined}
            />
            {contentError && <p id="content-error" className="field-error-msg">{contentError}</p>}
            {contentOver && <p className="field-error-msg">El contenido no puede superar {CONTENT_MAX} caracteres.</p>}
          </div>

          <div className="form-actions">
            <Button type="button" variant="ghost" onClick={handleClear}>
              Limpiar
            </Button>
            {onCancel && (
              <Button type="button" variant="ghost" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            <Button type="submit" variant="primary">
              {submitLabel}
            </Button>
          </div>
        </div>
      </Card>

      <Card as="aside" className="preview-card">
        <div className="preview-card__canvas">
          <Badge variant="primary">Vista previa</Badge>
          {formValues.title.trim() ? (
            <h2 className="preview-title">{formValues.title}</h2>
          ) : (
            <p className="preview-empty">Tu título aparecerá acá apenas empieces a escribir.</p>
          )}
          {formValues.content.trim() ? (
            <p className="preview-body">{formValues.content}</p>
          ) : (
            <p className="preview-empty">El contenido completo se previsualiza en tiempo real.</p>
          )}
        </div>
      </Card>
    </form>
  )
}

export function Textarea({ className = '', id, error, ...props }) {
  const textareaClassName = ['ui-textarea', error ? 'ui-input--error' : '', className].filter(Boolean).join(' ')

  return <textarea id={id} className={textareaClassName} aria-invalid={Boolean(error)} {...props} />
}
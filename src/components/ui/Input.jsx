export function Input({ className = '', id, error, ...props }) {
  const inputClassName = ['ui-input', error ? 'ui-input--error' : '', className].filter(Boolean).join(' ')

  return <input id={id} className={inputClassName} aria-invalid={Boolean(error)} {...props} />
}
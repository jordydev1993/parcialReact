export function ErrorMessage({ children, className = '' }) {
  if (!children) {
    return null
  }

  return <p className={`ui-error-message ${className}`.trim()}>{children}</p>
}
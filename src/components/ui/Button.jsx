import { Link } from 'react-router-dom'
import { Spinner } from './Spinner.jsx'

export function Button({
  children,
  to,
  as = 'button',
  variant = 'primary',
  type = 'button',
  loading = false,
  className = '',
  ...props
}) {
  const buttonClassName = `ui-button ui-button--${variant} ${className}`.trim()

  if (as === 'link' || to) {
    return (
      <Link className={buttonClassName} to={to} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={buttonClassName} type={type} disabled={loading} {...props}>
      {loading ? <Spinner size="sm" /> : null}
      <span>{children}</span>
    </button>
  )
}
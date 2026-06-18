import { Button } from './Button.jsx'

export function EmptyState({ icon = '✦', title, description, actionLabel, actionTo, actionOnClick }) {
  return (
    <div className="ui-empty-state">
      <div className="ui-empty-state__icon">{icon}</div>
      <h2 className="section-title">{title}</h2>
      <p>{description}</p>
      {actionTo ? (
        <Button to={actionTo}>{actionLabel}</Button>
      ) : actionOnClick ? (
        <Button onClick={actionOnClick}>{actionLabel}</Button>
      ) : null}
    </div>
  )
}
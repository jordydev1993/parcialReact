import { Card } from './Card.jsx'

export function Modal({ open, title, onClose, children, footer }) {
  if (!open) {
    return null
  }

  return (
    <div className="ui-modal" role="presentation" onClick={onClose}>
      <Card
        as="section"
        className="ui-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'ui-modal-title' : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        {title ? <h2 className="ui-modal__title" id="ui-modal-title">{title}</h2> : null}
        <div className="ui-modal__body">{children}</div>
        {footer ? <div className="ui-modal__footer">{footer}</div> : null}
      </Card>
    </div>
  )
}
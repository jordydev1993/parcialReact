import { Badge } from './ui/Badge.jsx'
import { Button } from './ui/Button.jsx'
import { Modal } from './ui/Modal.jsx'
import { Spinner } from './ui/Spinner.jsx'

export function ConfirmDeleteModal({ post, open, loading = false, onClose, onConfirm }) {
  if (!open || !post) {
    return null
  }

  return (
    <Modal
      open={open}
      title="Eliminar publicación"
      onClose={onClose}
      footer={(
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            Eliminar definitivamente
          </Button>
        </>
      )}
    >
      <div className="modal__header">
        <Badge variant="muted">{post.id}</Badge>
        {loading ? <Spinner size="sm" /> : null}
      </div>

      <p className="modal__body">
        Vas a eliminar <strong>{post.title}</strong>. Esta acción no se puede deshacer.
      </p>
    </Modal>
  )
}

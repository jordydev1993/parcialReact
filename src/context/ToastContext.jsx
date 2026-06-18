import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Toast } from '../components/ui/Toast.jsx'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type })
  }, [])

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setToast(null)
    }, 2200)

    return () => window.clearTimeout(timeoutId)
  }, [toast])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={toast?.message} type={toast?.type} />
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used inside ToastProvider')
  }

  return context
}
import { toast } from 'react-toastify'
import type { ToastPosition } from 'react-toastify'

// Third-party Imports
import 'react-toastify/dist/ReactToastify.css'

// Types
type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastOptions {
  message: string
  type?: ToastType
  position?: ToastPosition
  autoClose?: number
  hideProgressBar?: boolean
  closeOnClick?: boolean
  pauseOnHover?: boolean
  draggable?: boolean
}

/**
 * Displays a toast notification with customizable type, message, and options.
 *
 * @param options - Configuration options for the toast
 * @param options.message - The message to display in the toast
 * @param options.type - Type of toast ('success', 'error', 'warning', 'info')
 * @param options.position - Position of the toast (e.g., 'top-left', 'bottom-right')
 * @param options.autoClose - Time in milliseconds before toast auto-closes
 * @param options.hideProgressBar - Whether to hide the progress bar
 * @param options.closeOnClick - Whether clicking the toast closes it
 * @param options.pauseOnHover - Whether to pause the toast on hover
 * @param options.draggable - Whether the toast can be dragged
 * @throws Error if message is empty or invalid
 */
export const showToast = ({
  message,
  type = 'success',
  position = 'top-left',
  autoClose = 3000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true
}: ToastOptions): void => {
  // Validate message
  if (!message || typeof message !== 'string' || message.trim() === '') {
    throw new Error('Toast message must be a non-empty string')
  }

  // Common toast configuration
  const toastConfig = {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable
  }

  // Display toast based on type
  switch (type) {
    case 'success':
      toast.success(message, toastConfig)
      break
    case 'error':
      toast.error(message, toastConfig)
      break
    case 'warning':
      toast.warn(message, toastConfig)
      break
    case 'info':
      toast.info(message, toastConfig)
      break
    default:
      toast(message, toastConfig)
  }
}

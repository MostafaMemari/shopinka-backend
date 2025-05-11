// MUI Imports
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

import { ToastContainer } from 'react-toastify'
import NextTopLoader from 'nextjs-toploader'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

import QueryProvider from './providers'

export const metadata = {
  title: 'ووکسی - قالب داشبورد مدیریتی Next.js و MUI',
  description: 'ووکسی - قالب داشبورد مدیریتی Next.js و MUI، دوست‌دار توسعه‌دهندگان و بسیار قابل تنظیم، بر پایه MUI نسخه ۵.'
}

const RootLayout = async (props: ChildrenType) => {
  const { children } = props

  // Vars
  const systemMode = await getSystemMode()
  const direction = 'rtl'

  return (
    <html id='__next' lang='fa' dir={direction} suppressHydrationWarning>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <NextTopLoader color='var(--primary-color)' showSpinner={false} />
        <ToastContainer
          position='top-left'
          theme={systemMode}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <InitColorSchemeScript attribute='data' defaultMode={systemMode} />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}

export default RootLayout

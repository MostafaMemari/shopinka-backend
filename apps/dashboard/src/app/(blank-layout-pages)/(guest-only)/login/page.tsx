// Next Imports
import type { Metadata } from 'next'

// Component Imports
import LoginOtp from '@/views/pages/auth/LoginOtp'

// Server Action Imports
// import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'ورود',
  description: 'لطفا به حساب کاربری خود وارد شوید'
}

const LoginPage = async () => {
  // Vars
  // const mode = await getServerMode()

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
      <LoginOtp />
    </div>
  )
}

export default LoginPage

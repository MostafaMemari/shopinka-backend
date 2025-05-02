'use client'

import { useState } from 'react'

// Next Imports
import Link from 'next/link'

import { useForm } from 'react-hook-form'

import CustomTextField from '@core/components/mui/TextField'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import AuthIllustrationWrapper from './AuthIllustrationWrapper'

import OtpInputComponent from './OtpInputComponent'
import { sendOtp } from '@/libs/api/auth'
import { ToastContainer } from 'react-toastify'
import { showToast } from '@/utils/showToast'
import { extractTime } from '@/utils/getInitials'

const LoginOtp = () => {
  const [step, setStep] = useState<'login' | 'otp'>('login')
  const [phone, setPhone] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data: any) => {
    try {
      await sendOtp(data?.mobile)
      showToast({ type: 'success', message: 'کد اعبتار سنجی با موفیت ارسال شد', position: 'top-left' })

      setPhone(data?.mobile)
      setStep('otp')
    } catch (err: any) {
      if (err?.status == 400) return showToast({ type: 'error', message: 'شماره نامعتبر است' })
      if (err?.status == 403) return showToast({ type: 'error', message: 'درخواست زیاد بود، بعداً تلاش کنید' })
      if (err?.status == 409) return showToast({ type: 'error', message: 'کد قبلاً ارسال شده است' })
      showToast({ type: 'error', message: 'خطای سیستم' })
    }
  }

  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='sm:!p-12'>
          <Link href='/' className='flex justify-center mbe-6'>
            <Logo />
          </Link>

          {step === 'login' ? (
            <>
              <div className='flex flex-col gap-1 mbe-6'>
                <Typography variant='h4'>{`به ${themeConfig.templateName} خوش آمدید! 👋🏻`}</Typography>
                <Typography>لطفاً با شماره موبایل خود وارد شوید و ماجرا را آغاز کنید</Typography>
              </div>
              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                <CustomTextField
                  autoFocus
                  fullWidth
                  label='شماره موبایل'
                  placeholder='شماره موبایل خود را وارد کنید'
                  type='tel'
                  error={!!errors.mobile}
                  helperText={errors.mobile ? 'شماره موبایل معتبر نیست' : ''}
                  inputProps={{
                    style: { textAlign: 'center' }
                  }}
                  {...register('mobile', {
                    required: true,
                    pattern: {
                      value: /^(0|0098|\+98)9(0[1-5]|[13]\d|2[0-2]|98)\d{7}$/,
                      message: 'شماره موبایل معتبر نیست'
                    }
                  })}
                />

                <Button fullWidth variant='contained' type='submit'>
                  ورود
                </Button>
                <div className='flex justify-center items-center flex-wrap gap-2'>
                  <Typography>کاربر جدید هستید؟</Typography>
                  <Typography color='primary.main'>ایجاد حساب کاربری</Typography>
                </div>
              </form>
            </>
          ) : (
            <OtpInputComponent phoneNumber={phone} />
          )}
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default LoginOtp

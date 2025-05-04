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

import OtpInputComponent from './OtpStep'
import { sendOtp } from '@/libs/api/auth'
import { showToast } from '@/utils/showToast'
import { handleApiError } from '@/utils/handleApiError'

// Messages
import { errorPhoneNumberStepMessages, phoneNumberStepMessages } from '@/messages/auth/loginMessages'

const LoginOtp = () => {
  const [step, setStep] = useState<'login' | 'otp'>('login')
  const [phone, setPhone] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ mobile: string }>()

  const onSubmit = async (data: { mobile: string }) => {
    try {
      const res = await sendOtp(data.mobile)

      const errorMessage = handleApiError(res.status, errorPhoneNumberStepMessages)

      if (errorMessage) return showToast({ type: 'error', message: errorMessage })

      showToast({ type: 'success', message: 'کد اعتبار سنجی با موفقیت ارسال شد' })

      setPhone(data.mobile)
      setStep('otp')
    } catch (err) {
      showToast({ type: 'error', message: 'خطای سیستمی' })
    }
  }

  const messages = phoneNumberStepMessages

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
                <Typography variant='h4'>{messages.welcome(themeConfig.templateName)}</Typography>
                <Typography>{messages.instruction}</Typography>
              </div>
              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                <CustomTextField
                  autoFocus
                  fullWidth
                  label={messages.phoneLabel}
                  placeholder={messages.phonePlaceholder}
                  type='tel'
                  error={!!errors.mobile}
                  helperText={errors.mobile ? messages.invalidPhone : ''}
                  inputProps={{
                    style: { textAlign: 'center' }
                  }}
                  {...register('mobile', {
                    required: true,
                    pattern: {
                      value: /^(0|0098|\+98)9(0[1-5]|[13]\d|2[0-2]|98)\d{7}$/,
                      message: messages.invalidPhone
                    }
                  })}
                />

                <Button fullWidth variant='contained' type='submit'>
                  {messages.loginButton}
                </Button>
                <div className='flex justify-center items-center flex-wrap gap-2'>
                  <Typography>{messages.newUser}</Typography>
                  <Typography color='primary.main'>{messages.createAccount}</Typography>
                </div>
              </form>
            </>
          ) : (
            <OtpInputComponent phoneNumber={phone} onBack={() => setStep('login')} />
          )}
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default LoginOtp

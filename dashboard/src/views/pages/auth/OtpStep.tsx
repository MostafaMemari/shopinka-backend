'use client'

import { useState, useRef, useEffect } from 'react'

// MUI
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Third-party
import { OTPInput } from 'input-otp'
import type { SlotProps } from 'input-otp'
import classnames from 'classnames'

// Components
import Link from '@components/Link'
import { useOtpTimer } from '@/hooks/useOtpTimer'

// Styles
import styles from '@/libs/styles/inputOtp.module.css'

// Messages
import { otpStepMessages } from './messages'

const Slot = (props: SlotProps & { isError?: boolean }) => (
  <div
    className={classnames(styles.slot, {
      [styles.slotActive]: props.isActive,
      [styles.slotError]: props.isError
    })}
  >
    {props.char !== null && <div>{props.char}</div>}
    {props.hasFakeCaret && <FakeCaret />}
  </div>
)

const FakeCaret = () => (
  <div className={styles.fakeCaret}>
    <div className='w-px h-5 bg-textPrimary' />
  </div>
)

const OtpInputComponent = ({ phoneNumber, onBack }: { phoneNumber: string; onBack: () => void }) => {
  const [otp, setOtp] = useState('')
  const [isError, setIsError] = useState(false)
  const otpInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const { timeLeft, isExpired, formatTime, resetTimer } = useOtpTimer(300)

  useEffect(() => {
    otpInputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      handleSubmit()
    }
  }, [otp])

  const handleSubmit = () => {
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      console.log('OTP Submitted:', otp)

      // مثال: شبیه‌سازی خطا
      const isSuccess = false

      if (!isSuccess) {
        setIsError(true)
        setOtp('')
        setTimeout(() => setIsError(false), 500)
        otpInputRef.current?.focus()
      }

      formRef.current?.requestSubmit()
    } else {
      console.error('Invalid OTP')
    }
  }

  const maskedPhoneNumber = phoneNumber.slice(0, -4) + '****'

  const messages = otpStepMessages

  return (
    <div className='text-center max-w-md mx-auto'>
      <div className='flex flex-col gap-1 mbe-6'>
        <Typography variant='h4'>{messages.title}</Typography>
        <Typography>{messages.subtitle}</Typography>
        <Typography className='font-medium' color='text.primary' dir='ltr'>
          {maskedPhoneNumber}
        </Typography>
      </div>

      <form
        ref={formRef}
        noValidate
        autoComplete='off'
        onSubmit={e => {
          e.preventDefault()
          console.log('Form Submitted with OTP:', otp)
        }}
        className='flex flex-col gap-6'
      >
        <div className='flex flex-col gap-2'>
          <Typography>{messages.inputLabel}</Typography>
          <div dir='ltr'>
            <OTPInput
              ref={otpInputRef}
              onChange={(value: string) => /^\d*$/.test(value) && setOtp(value)}
              value={otp}
              maxLength={6}
              containerClassName='flex items-center justify-between w-full gap-4'
              render={({ slots }) => (
                <div className='flex items-center justify-between w-full gap-4'>
                  {slots.slice(0, 6).map((slot, idx) => (
                    <Slot key={idx} {...slot} isError={isError} />
                  ))}
                </div>
              )}
            />
          </div>

          <Typography color={isExpired ? 'error.main' : 'text.primary'} className='mt-2'>
            {isExpired ? messages.timerExpired : `زمان باقی‌مانده: ${formatTime(timeLeft)}`}
          </Typography>
        </div>

        <Button fullWidth variant='contained' type='submit' disabled={otp.length !== 6 || isExpired}>
          {messages.submitButton}
        </Button>

        <div className='flex justify-center items-center flex-wrap gap-2'>
          <Typography>{messages.resendPrompt}</Typography>
          <Typography
            color={isExpired ? 'primary.main' : 'text.disabled'}
            component={Link}
            href='/'
            onClick={e => {
              e.preventDefault()

              if (isExpired) {
                resetTimer()
                setOtp('')
                console.log('Resend OTP')
              }
            }}
          >
            {messages.resendLink}
          </Typography>
        </div>

        <Button variant='text' onClick={onBack}>
          {messages.back}
        </Button>
      </form>
    </div>
  )
}

export default OtpInputComponent

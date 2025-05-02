'use client'

// React Imports
import { useState, useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Third-party Imports
import { OTPInput } from 'input-otp'
import type { SlotProps } from 'input-otp'
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link'

// Style Imports
import styles from '@/libs/styles/inputOtp.module.css'

const Slot = (props: SlotProps & { isError?: boolean }) => {
  return (
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
}

const FakeCaret = () => {
  return (
    <div className={styles.fakeCaret}>
      <div className='w-px h-5 bg-textPrimary' />
    </div>
  )
}

const OtpInputComponent = ({ phoneNumber }: { phoneNumber: string }) => {
  const [otp, setOtp] = useState<string>('')
  const [timeLeft, setTimeLeft] = useState<number>(300) // 5 دقیقه (300 ثانیه)
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false) // برای حاشیه قرمز
  const otpInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const maskedPhoneNumber = phoneNumber.slice(0, -4) + '****'

  useEffect(() => {
    if (otpInputRef.current) {
      otpInputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimerExpired(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  useEffect(() => {
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      handleSubmit()
    }
  }, [otp])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  // مدیریت سابمیت فرم
  const handleSubmit = () => {
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      console.log('OTP Submitted:', otp)
      // فرض می‌کنیم عملیات ناموفق است (برای تست)
      const isSuccess = false // اینجا می‌تونید منطق واقعی سرور رو اضافه کنید

      if (!isSuccess) {
        // عملیات ناموفق: پاک کردن ورودی‌ها، حاشیه قرمز، فوکوس
        setIsError(true)
        setOtp('')
        setTimeout(() => {
          setIsError(false)
        }, 500) // حاشیه قرمز به مدت ۰.۵ ثانیه
        if (otpInputRef.current) {
          otpInputRef.current.focus()
        }
      }

      // سابمیت فرم
      if (formRef.current) {
        formRef.current.requestSubmit()
      }
    } else {
      console.error('Invalid OTP')
    }
  }

  const messages = {
    title: 'تأیید دو مرحله‌ای 💬',
    subtitle: 'ما یک کد تأیید به شماره موبایل شما ارسال کردیم. کد را در کادر زیر وارد کنید.',
    inputLabel: 'کد امنیتی ۶ رقمی را وارد کنید',
    submitButton: 'تأیید حساب من',
    resendPrompt: 'کد را دریافت نکردید؟',
    resendLink: 'ارسال مجدد',
    timerExpired: 'زمان به پایان رسید!'
  }

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
          // اینجا می‌تونید منطق سابمیت به سرور رو اضافه کنید
        }}
        className='flex flex-col gap-6'
      >
        <div className='flex flex-col gap-2'>
          <Typography>{messages.inputLabel}</Typography>
          <div dir='ltr'>
            <OTPInput
              ref={otpInputRef}
              onChange={(value: string) => {
                // فقط اعداد مجاز هستند
                if (/^\d*$/.test(value)) {
                  setOtp(value)
                }
              }}
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
          {/* نمایش تایمر */}
          <Typography color={isTimerExpired ? 'error.main' : 'text.primary'} className='mt-2'>
            {isTimerExpired ? messages.timerExpired : `زمان باقی‌مانده: ${formatTime(timeLeft)}`}
          </Typography>
        </div>
        <Button fullWidth variant='contained' type='submit' disabled={otp.length !== 6 || isTimerExpired}>
          {messages.submitButton}
        </Button>
        <div className='flex justify-center items-center flex-wrap gap-2'>
          <Typography>{messages.resendPrompt}</Typography>
          <Typography
            color={isTimerExpired ? 'primary.main' : 'text.disabled'}
            component={Link}
            href='/'
            onClick={e => {
              e.preventDefault()
              if (isTimerExpired) {
                setTimeLeft(300)
                setIsTimerExpired(false)
                setOtp('')
                console.log('Resend OTP')
              }
            }}
          >
            {messages.resendLink}
          </Typography>
        </div>
      </form>
    </div>
  )
}

export default OtpInputComponent

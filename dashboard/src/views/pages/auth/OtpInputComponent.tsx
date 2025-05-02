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

const Slot = (props: SlotProps) => {
  return (
    <div className={classnames(styles.slot, { [styles.slotActive]: props.isActive })}>
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
  const otpInputRef = useRef<HTMLInputElement>(null)

  // فوکوس خودکار روی اولین اینپوت موقع لود
  useEffect(() => {
    if (otpInputRef.current) {
      otpInputRef.current.focus()
    }
  }, [])

  // متون فارسی
  const messages = {
    title: 'تأیید دو مرحله‌ای 💬',
    subtitle: 'ما یک کد تأیید به شماره موبایل شما ارسال کردیم. کد را در کادر زیر وارد کنید.',
    inputLabel: 'کد امنیتی ۶ رقمی را وارد کنید',
    submitButton: 'تأیید حساب من',
    resendPrompt: 'کد را دریافت نکردید؟',
    resendLink: 'ارسال مجدد'
  }

  return (
    <div className='text-center'>
      <div className='flex flex-col gap-1 mbe-6'>
        <Typography variant='h4'>{messages.title}</Typography>
        <Typography>{messages.subtitle}</Typography>
        <Typography className='font-medium' color='text.primary'>
          {phoneNumber}
        </Typography>
      </div>

      <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <Typography>{messages.inputLabel}</Typography>
          <div dir='ltr'>
            <OTPInput
              ref={otpInputRef}
              onChange={setOtp}
              value={otp}
              maxLength={6}
              containerClassName='flex items-center justify-between w-full gap-4'
              render={({ slots }) => (
                <div className='flex items-center justify-between w-full gap-4'>
                  {slots.slice(0, 6).map((slot, idx) => (
                    <Slot key={idx} {...slot} />
                  ))}
                </div>
              )}
            />
          </div>
        </div>
        <Button fullWidth variant='contained' type='submit'>
          {messages.submitButton}
        </Button>
        <div className='flex justify-center items-center flex-wrap gap-2'>
          <Typography>{messages.resendPrompt}</Typography>
          <Typography color='primary.main' component={Link} href='/' onClick={e => e.preventDefault()}>
            {messages.resendLink}
          </Typography>
        </div>
      </form>
    </div>
  )
}

export default OtpInputComponent

// Third-party Imports
import { OTPInput } from 'input-otp'
import type { SlotProps } from 'input-otp'

// MUI Imports
import Typography from '@mui/material/Typography'

const OtpInputComponent = ({ phoneNumber }: { phoneNumber: string }) => {
  return (
    <div className='text-center'>
      <Typography variant='h6'>کد ارسال‌شده به {phoneNumber} را وارد کنید</Typography>

      <div className='flex flex-col gap-1 mbe-6'>
        <Typography variant='h4'>Two Step Verification 💬</Typography>
        <Typography>We sent a verification code to your mobile. Enter the code from the mobile in the field below.</Typography>
        <Typography className='font-medium' color='text.primary'>
          ******1234
        </Typography>
      </div>
      <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <Typography>Type your 6 digit security code</Typography>
          <OTPInput
            onChange={setOtp}
            value={otp ?? ''}
            maxLength={6}
            containerClassName='flex items-center'
            render={({ slots }) => (
              <div className='flex items-center justify-between w-full gap-4'>
                {slots.slice(0, 6).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>
            )}
          />
        </div>
        <Button fullWidth variant='contained' type='submit'>
          Verify my account
        </Button>
        <div className='flex justify-center items-center flex-wrap gap-2'>
          <Typography>Didn&#39;t get the code?</Typography>
          <Typography color='primary.main' component={Link} href='/' onClick={e => e.preventDefault()}>
            Resend
          </Typography>
        </div>
      </form>
    </div>
  )
}

export default OtpInputComponent

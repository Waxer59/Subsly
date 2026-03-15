import { TrashIcon } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { useAccount } from '@/hooks/useAccount'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from '../ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { toast } from 'sonner'
import { OTP_LENGTH } from '@/constants'
import { useState } from 'react'

export const SettingsDeleteAccount = () => {
  const { deleteAccount } = useAccount()
  const [otp, setOtp] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleDeleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (otp.length !== OTP_LENGTH) {
      toast.error('Please enter a valid OTP')
      return
    }

    setIsSending(true)
    await deleteAccount(otp)
    setIsSending(false)
  }

  const handleSendOTP = () => {
    deleteAccount()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer"
          variant="destructive"
          onClick={handleSendOTP}>
          <TrashIcon /> Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-800">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Please enter the OTP you received in your email to delete your
            account.
          </DialogDescription>
        </DialogHeader>
        <form
          className="mt-4 flex flex-col gap-4 justify-center items-center"
          onSubmit={handleDeleteAccount}>
          <InputOTP
            maxLength={6}
            minLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={otp}
            onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            disabled={isSending}
            className="cursor-pointer w-full"
            variant="destructive"
            type="submit">
            Delete Account
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

import { GoogleIcon } from '@/components/icons/google-icon'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { API_URL } from '@/constants'
import { useAccount } from '@/hooks/useAccount'
import { useAccountSettings } from '@/hooks/useAccountSettings'
import { useSubscriptions } from '@/hooks/useSubcriptions'
import { GithubIcon } from 'lucide-react'
import { useState } from 'react'

export const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const { retrieveAccount } = useAccount()
  const { retrieveSubcriptions } = useSubscriptions()
  const { retrieveAccountSettings } = useAccountSettings()

  const handleOauthLogin = (provider: string) => {
    const authUrl = `${API_URL}/auth/login/${provider}?platform=chrome_extension`
    setIsLoggingIn(true)
    chrome.identity
      .launchWebAuthFlow({
        url: authUrl,
        interactive: true
      })
      .then(() => {
        setIsLoggingIn(false)
        retrieveAccount()
        retrieveSubcriptions()
        retrieveAccountSettings()
      })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="text-xl cursor-pointer px-8 py-6">
          Log in
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900">
        <DialogTitle></DialogTitle>
        <DialogHeader>
          <DialogDescription className="flex flex-col gap-4 mt-2">
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              disabled={isLoggingIn}
              onClick={() => handleOauthLogin('github')}>
              <GithubIcon /> Login with Github
            </Button>
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              disabled={isLoggingIn}
              onClick={() => handleOauthLogin('google')}>
              <GoogleIcon /> Login with Google
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

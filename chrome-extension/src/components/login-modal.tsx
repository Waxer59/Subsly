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
import { GithubIcon } from 'lucide-react'

export const LoginModal = () => {
  const { retrieve } = useAccount()

  const handleOauthLogin = (provider: string) => {
    const authUrl = `${API_URL}/auth/login/${provider}?platform=chrome_extension`
    chrome.identity
      .launchWebAuthFlow({
        url: authUrl,
        interactive: true
      })
      .then(retrieve)
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
              onClick={() => handleOauthLogin('github')}>
              <GithubIcon /> Login with Github
            </Button>
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => handleOauthLogin('google')}>
              <GoogleIcon /> Login with Google
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

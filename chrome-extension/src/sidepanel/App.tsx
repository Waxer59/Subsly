import { LoginModal } from '@/components/login-modal'
import { useAccount } from '@/hooks/useAccount'
import { useAccountSettings } from '@/hooks/useAccountSettings'
import { useSubscriptions } from '@/hooks/useSubcriptions'
import { useAccountStore } from '@/store/account'
import { useEffect } from 'react'

export default function App() {
  const isLoggedIn = useAccountStore((state) => Boolean(state.user))
  const { retrieveAccount } = useAccount()
  const { retrieveSubcriptions } = useSubscriptions()
  const { retrieveAccountSettings } = useAccountSettings()

  useEffect(() => {
    retrieveAccount()
    retrieveSubcriptions()
    retrieveAccountSettings()
  }, [])

  return (
    <div className="bg-zinc-800 w-full h-screen flex items-center justify-center">
      {isLoggedIn ? <>Auth</> : <LoginModal />}
    </div>
  )
}

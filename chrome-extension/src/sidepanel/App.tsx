import { Dashboard } from '@/components/dashboard'
import { Login } from '@/components/login'
import { useAccount } from '@/hooks/useAccount'
import { useAccountSettings } from '@/hooks/useAccountSettings'
import { useSubscriptions } from '@/hooks/useSubcriptions'
import { useAccountStore } from '@/store/account'
import { useEffect } from 'react'
import { Toaster } from 'sonner'

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
    <div className={`bg-zinc-800 w-full h-screen flex ${isLoggedIn ? 'overflow-scroll overflow-x-hidden' : 'items-center'} justify-center`}>
      {isLoggedIn ? <Dashboard /> : <Login />}
      <Toaster />
    </div>
  )
}

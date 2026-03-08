import { useAccount } from '@/hooks/useAccount'
import { useSubscriptions } from '@/hooks/useSubcriptions'
import { useAccountStore } from '@/store/account'
import { useEffect } from 'react'
import { useAccountSettings } from '@/hooks/useAccountSettings'
import { Dashboard } from '@/components/dashboard'
import { Login } from '@/components/login'
import { Toaster } from '@/components/ui/sonner'

export default function App() {
  const isLoggedIn = useAccountStore((state) => Boolean(state.user))
  const user = useAccountStore((state) => state.user)
  const { retrieveAccount } = useAccount()
  const { retrieveSubcriptions } = useSubscriptions()
  const { retrieveAccountSettings } = useAccountSettings()

  useEffect(() => {
    retrieveAccount()
  }, [])

  useEffect(() => {
    if (user) {
      retrieveSubcriptions()
      retrieveAccountSettings()
    }
  }, [user])

  return (
    <div
      className={`bg-zinc-800 w-96 h-120 flex ${isLoggedIn ? 'overflow-scroll overflow-x-hidden' : 'items-center'} justify-center`}>
      {isLoggedIn ? <Dashboard /> : <Login />}
      <Toaster theme='dark' />
    </div>
  )
}

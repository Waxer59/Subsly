import { LoginModal } from '@/components/login-modal'
import { useAccount } from '@/hooks/useAccount'
import { useSubscriptions } from '@/hooks/useSubcriptions'
import { useAccountStore } from '@/store/account'
import { useEffect } from 'react'
import { useAccountSettings } from '@/hooks/useAccountSettings'
import { useSubscriptionsStore } from '@/store/subcriptions'
import { SubcriptionCards } from '@/components/subcription-cards'
import { useAccountSettingsStore } from '@/store/account-settings'
import { formatAmount } from '@/helpers/formatAmount'
import { Button } from '@/components/ui/button'
import { PlusIcon, SettingsIcon } from 'lucide-react'
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu
} from '@/components/ui/dropdown-menu'
import { getUsernameInitials } from '@/helpers/getUsernameInitials'

export default function App() {
  const isLoggedIn = useAccountStore((state) => Boolean(state.user))
  const subcriptions = useSubscriptionsStore((state) => state.subscriptions)
  const currency = useAccountSettingsStore((state) => state.currency)
  const account = useAccountStore((state) => state.user)

  const { retrieveAccount } = useAccount()
  const { retrieveSubcriptions } = useSubscriptions()
  const { retrieveAccountSettings } = useAccountSettings()

  useEffect(() => {
    retrieveAccount()
    retrieveSubcriptions()
    retrieveAccountSettings()
  }, [])

  return (
    <div
      className={`bg-zinc-800 w-96 h-112 flex ${isLoggedIn ? '' : 'items-center'} justify-center overflow-scroll overflow-x-hidden`}>
      {isLoggedIn ? (
        <div className="w-full max-w-[90%] h-125 mx-auto">
          <div className="flex justify-between w-full mt-8">
            <Button className="cursor-pointer" variant="outline">
              <SettingsIcon />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full cursor-pointer">
                  <Avatar>
                    <AvatarImage
                      src={account?.profile_picture}
                      alt={`${account?.username} profile picture`}
                    />
                    <AvatarFallback>
                      {getUsernameInitials(account!.username)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32 bg-zinc-800 p-2">
                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center mt-8">
            <h2 className="text-xl italic">Your monthy spending</h2>
            <h1 className="text-3xl font-bold">
              {formatAmount(
                subcriptions.reduce((acc, curr) => acc + curr.amount, 0),
                currency
              )}
            </h1>
          </div>
          <Button className="ml-auto cursor-pointer block mb-4" variant="outline">
            <PlusIcon />
          </Button>
          <div className="pb-4">
            <SubcriptionCards
              subcriptions={[...subcriptions, ...subcriptions, ...subcriptions]}
            />
          </div>
        </div>
      ) : (
        <LoginModal />
      )}
    </div>
  )
}

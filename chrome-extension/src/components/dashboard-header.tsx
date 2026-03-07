import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu
} from '@/components/ui/dropdown-menu'
import { getUsernameInitials } from '@/helpers/getUsernameInitials'
import { useAccountStore } from '@/store/account'
import { Button } from './ui/button'
import { useAccount } from '@/hooks/useAccount'
import { Settings } from './settings'

export const DashboardHeader = () => {
  const account = useAccountStore((state) => state.user)
  const { logout } = useAccount()

  return (
    <div className="flex justify-between w-full mt-8">
      <Settings />
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
          <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={logout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

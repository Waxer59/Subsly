import { SubcriptionCards } from '@/components/subcription-cards'
import { formatAmount } from '@/helpers/formatAmount'
import { useSubscriptionsStore } from '@/store/subcriptions'
import { useAccountSettingsStore } from '@/store/account-settings'
import { DashboardHeader } from './dashboard-header'
import { SubcriptionModal } from './subcription-modal'
import { PlusIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Subscription } from '@/types'
import { useSubscriptions } from '@/hooks/useSubcriptions'

export const Dashboard = () => {
  const subcriptions = useSubscriptionsStore((state) => state.subscriptions)
  const currency = useAccountSettingsStore((state) => state.currency)
  const { addSubcription } = useSubscriptions()

  const handleSubmit = (data: Omit<Subscription, 'id'>) => {
    addSubcription(data)
  }

  return (
    <div className="w-full max-w-[90%] h-125 mx-auto">
      <DashboardHeader />
      <div className="flex flex-col gap-2 items-center justify-center mt-8">
        <h2 className="text-xl italic">Your monthy spending</h2>
        <h1 className="text-3xl font-bold">
          {formatAmount(
            subcriptions?.reduce((acc, curr) => acc + curr.amount, 0),
            currency
          )}
        </h1>
      </div>
      <SubcriptionModal onSubmit={handleSubmit}>
        <Button className="ml-auto cursor-pointer block mb-4" variant="outline">
          <PlusIcon />
        </Button>
      </SubcriptionModal>
      <div className="pb-4">
        <SubcriptionCards subcriptions={subcriptions} />
      </div>
    </div>
  )
}

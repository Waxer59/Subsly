import { Card } from '@/components/ui/card'
import { Subscription } from '@/types'
import faviconFetch from 'favicon-fetch'
import { useAccountSettingsStore } from '@/store/account-settings'
import { formatAmount } from '@/helpers/formatAmount'
import { Button } from './ui/button'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { SubcriptionModal } from './subcription-modal'
import { useSubscriptions } from '@/hooks/useSubcriptions'

interface Props {
  subcription: Subscription
}

export const SubcriptionCard: React.FC<Props> = ({ subcription }) => {
  const currency = useAccountSettingsStore((state) => state.currency)
  const { deleteSubcription, updateSubcription } = useSubscriptions()
  const url = new URL(subcription.serviceUrl)
  const favicon = faviconFetch({ hostname: url.hostname })

  const handleDelete = () => {
    deleteSubcription(subcription.id)
  }

  const handleEdit = (updatedSubcription: Omit<Subscription, 'id'>) => {
    updateSubcription(subcription.id, updatedSubcription)
  }

  return (
    <Card className="w-full bg-zinc-800 flex items-center p-4 flex-row max-w-175 mx-auto">
      <img
        src={favicon}
        alt={`${url.hostname} icon`}
        className="object-cover w-15 h-15 md:w-25 md:h-25 rounded-md"
        width="75px"
        height="75px"
      />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between gap-2 w-full">
          <h3 className="text-2xl font-bold truncate text-ellipsis overflow-hidden max-w-[8ch] md:max-w-[18ch]">
            <a
              className="group"
              href={url.href}
              target="_blank"
              rel="noreferrer">
              {subcription.name}
              <div className="bg-white h-0.5 w-0 group-hover:w-full transition-all duration-500"></div>
            </a>
          </h3>
          <div className="flex gap-4">
            <SubcriptionModal
              isUpdate
              subcription={subcription}
              onSubmit={handleEdit}>
              <Button className="cursor-pointer" variant="outline">
                <PencilIcon />
              </Button>
            </SubcriptionModal>
            <Button
              className="cursor-pointer"
              variant="destructive"
              onClick={handleDelete}>
              <TrashIcon />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl">
            {formatAmount(subcription.amount, currency)} per month
          </p>
          <p className="text-xl italic">
            {formatAmount(subcription.amount, currency)} per year
          </p>
        </div>
      </div>
    </Card>
  )
}

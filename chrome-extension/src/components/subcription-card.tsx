import { Card } from '@/components/ui/card'
import { Subscription } from '@/types'
import React from 'react'
import faviconFetch from 'favicon-fetch'
import { useAccountSettingsStore } from '@/store/account-settings'
import { formatAmount } from '@/helpers/formatAmount'

interface Props {
  subcription: Subscription
}

export const SubcriptionCard: React.FC<Props> = ({ subcription }) => {
  const currency = useAccountSettingsStore((state) => state.currency)

  const url = new URL(subcription.serviceUrl)
  const favicon = faviconFetch({ hostname: url.hostname })

  return (
    <Card className="w-full bg-zinc-800 flex items-center p-4 flex-row max-w-175 mx-auto">
      <img
        src={favicon}
        alt={`${url.hostname} icon`}
        className="object-cover w-25 h-25 rounded-md"
        width="75px"
        height="75px"
      />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between gap-8 w-full">
          <h3 className="text-2xl font-bold truncate text-ellipsis overflow-hidden max-w-[18ch]">
            <a className="group" href={url.href} target='_blank' rel='noreferrer'>
              {subcription.name}
              <div className="bg-white h-0.5 w-0 group-hover:w-full transition-all duration-500"></div>
            </a>
          </h3>
          <div className="flex gap-4">
            <button className="cursor-pointer"></button>
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

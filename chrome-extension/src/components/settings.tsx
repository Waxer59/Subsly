import { SettingsIcon } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from './ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { CURRENCIES } from '@/constants'
import { useAccountSettingsStore } from '@/store/account-settings'
import { FormEvent } from 'react'
import { Currency } from '@/types'

export const Settings = () => {
  const currency = useAccountSettingsStore((state) => state.currency)

  const handleFormChange = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);

    const currencyUpdate = formData.get('currency') as Currency;

    useAccountSettingsStore.setState({ currency: currencyUpdate })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-800">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <form onChange={handleFormChange} className='mt-4'>
            <Select name='currency' value={currency}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={currency} />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

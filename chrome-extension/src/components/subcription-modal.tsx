import { Subscription } from '@/types'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { Field, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { Button } from './ui/button'
import z from 'zod'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  subcription?: Subscription
  children: React.ReactNode
  isUpdate?: boolean
}

const subcriptionSchema = z.object({
  name: z.string().min(1),
  amount: z.number().min(0),
  renewsEvery: z.number().min(1).max(12),
  serviceUrl: z.url()
})

export const SubcriptionModal: React.FC<Props> = ({
  children,
  isUpdate,
  subcription
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const [serviceUrl, setServiceUrl] = useState(subcription?.serviceUrl ?? '')
  const [name, setName] = useState(subcription?.name ?? '')
  const [amount, setAmount] = useState(subcription?.amount ?? 0)
  const [renews, setRenews] = useState(subcription?.renewsEvery ?? 1)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const subcriptionObject = {
      name,
      amount,
      renewsEvery: renews,
      serviceUrl
    }

    const { error } = subcriptionSchema.safeParse(subcriptionObject)

    if (error) {
      toast.error("Please check the form's fields")
      return
    }

    toast.success(isUpdate ? 'Changes saved' : 'Subcription added')

    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-zinc-800">
        <DialogTitle>{isUpdate ? 'Edit' : 'Add'} subcription</DialogTitle>
        <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
          <Field>
            <FieldLabel htmlFor="service-url">
              Service url <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="service-url"
              name="service-url"
              placeholder="https://amazon.com"
              value={serviceUrl}
              onChange={(e) => setServiceUrl(e.target.value)}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="subcription-name">Subcription name</FieldLabel>
            <Input
              id="subcription-name"
              name="subcription-name"
              placeholder="Amazon prime"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="subcription-amount">
              Subcription amount <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="subcription-amount"
              name="subcription-amount"
              type="number"
              min={0}
              defaultValue={0}
              required
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="subcription-renews">
              Renews every ... month/s
            </FieldLabel>
            <Input
              id="subcription-renews"
              name="subcription-renews"
              type="number"
              min={1}
              max={12}
              defaultValue={1}
              value={renews}
              onChange={(e) => setRenews(+e.target.value)}
            />
          </Field>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              className="cursor-pointer"
              variant="outline"
              type="submit"
              onClick={() => {
                setIsOpen(false)
              }}>
              Cancel
            </Button>
            <Button className="cursor-pointer">
              {isUpdate ? 'Save changes' : 'Add subcription'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

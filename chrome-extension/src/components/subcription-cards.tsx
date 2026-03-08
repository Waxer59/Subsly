import { Subscription } from '@/types'
import { SubcriptionCard } from './subcription-card'
import { Card } from './ui/card'

interface Props {
  subcriptions: Subscription[]
}

export const SubcriptionCards: React.FC<Props> = ({ subcriptions }) => {
  return (
    <ul className="flex flex-col gap-8">
      {subcriptions.length === 0 && (
        <Card className="bg-zinc-800">
          <h3 className='text-lg text-center'>No subcriptions yet</h3>
        </Card>
      )}
      {subcriptions.map((subcription) => (
        <li key={subcription.id}>
          <SubcriptionCard subcription={subcription} />
        </li>
      ))}
    </ul>
  )
}

import { Subscription } from '@/types'
import { SubcriptionCard } from './subcription-card'

interface Props {
  subcriptions: Subscription[]
}

export const SubcriptionCards: React.FC<Props> = ({ subcriptions }) => {
  return (
    <ul className='flex flex-col gap-8'>
      {subcriptions.map((subcription) => (
        <li key={subcription.id}>
          <SubcriptionCard subcription={subcription} />
        </li>
      ))}
    </ul>
  )
}

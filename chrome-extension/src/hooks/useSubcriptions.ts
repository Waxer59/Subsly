import { API_URL } from '@/constants'
import { useSubscriptionsStore } from '@/store/subcriptions'
import { Subscription } from '@/types'
import { toast } from 'sonner'

export const useSubscriptions = () => {
  const setSubscriptions = useSubscriptionsStore(
    (state) => state.setSubscriptions
  )
  const deleteSubscription = useSubscriptionsStore(
    (state) => state.deleteSubscription
  )
  const addSubscription = useSubscriptionsStore((state) => state.addSubscription)
  const updateSubscription = useSubscriptionsStore(
    (state) => state.updateSubscription
  )

  const retrieveSubcriptions = async () => {
    try {
      const resp = await fetch(`${API_URL}/subscriptions`, {
        credentials: 'include'
      })
      const data = await resp.json()

      if (data && resp.ok) {
        setSubscriptions(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addSubcription = async (subcription: Omit<Subscription, 'id'>) => {
    try {
      const resp = await fetch(`${API_URL}/subscriptions`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subcription)
      })
      const data = await resp.json()

      if (data && resp.ok) {
        addSubscription(data)
        toast.success("Subcription added!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteSubcription = async (id: string) => {
    try {
      const resp = await fetch(`${API_URL}/subscriptions/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (resp.ok) {
        deleteSubscription(id)
        toast.success("Subcription deleted!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateSubcription = async (id: string, subcription: Omit<Subscription, 'id'>) => {
    try {
      const resp = await fetch(`${API_URL}/subscriptions/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subcription)
      })
      const data = await resp.json()

      if (data && resp.ok) {
        updateSubscription(id, data)
        toast.success("Subcription updated!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    retrieveSubcriptions,
    addSubcription,
    deleteSubcription,
    updateSubcription
  }
}

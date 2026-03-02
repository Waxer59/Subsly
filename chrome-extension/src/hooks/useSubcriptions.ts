import { API_URL } from "@/constants"
import { useSubscriptionsStore } from "@/store/subcriptions"

export const useSubscriptions = () => {
  const setSubscriptions = useSubscriptionsStore((state) => state.setSubscriptions)

  const retrieveSubcriptions = async () => {
    try {
      const resp = await fetch(`${API_URL}/subscriptions`, {
        credentials: 'include'
      })
      const data = await resp.json()

      if (data) {
        setSubscriptions(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    retrieveSubcriptions
  }
}
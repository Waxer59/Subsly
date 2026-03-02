import { API_URL } from '@/constants'
import { useAccountSettingsStore } from '@/store/account-settings'

export const useAccountSettings = () => {
  const setCurrency = useAccountSettingsStore((state) => state.setCurrency)

  const retrieveAccountSettings = async () => {
    try {
      const resp = await fetch(`${API_URL}/user-config`, {
        credentials: 'include'
      })
      const data = await resp.json()

      if (data) {
        setCurrency(data.currency)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    retrieveAccountSettings
  }
}

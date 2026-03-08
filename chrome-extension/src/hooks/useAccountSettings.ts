import { API_URL } from '@/constants'
import { useAccountSettingsStore } from '@/store/account-settings'
import { UserSettings } from '@/types'

export const useAccountSettings = () => {
  const setCurrency = useAccountSettingsStore((state) => state.setCurrency)

  const retrieveAccountSettings = async () => {
    try {
      const resp = await fetch(`${API_URL}/user-config`, {
        credentials: 'include'
      })
      const data = await resp.json()

      if (data && resp.ok) {
        setCurrency(data.currency)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateAccountSettings = async (userSettings: UserSettings) => {
    try {
      const resp = await fetch(`${API_URL}/user-config`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userSettings)
      })
      const data = await resp.json()

      if (data && resp.ok) {
        setCurrency(data.currency)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    retrieveAccountSettings,
    updateAccountSettings
  }
}

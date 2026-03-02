import { API_URL } from '@/constants'
import { useAccountStore } from '@/store/account'

export const useAccount = () => {
  const setAccount = useAccountStore((state) => state.setAccount)

  const retrieveAccount = async () => {
    try {
      const resp = await fetch(`${API_URL}/users`, {
        credentials: 'include'
      })
      const data = await resp.json()

      if (data) {
        setAccount(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    retrieveAccount
  }
}

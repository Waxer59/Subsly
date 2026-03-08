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

      if (data && resp.ok) {
        setAccount(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      const resp = await fetch(`${API_URL}/auth/logout`, {
        credentials: 'include',
        method: "POST"
      })

      if (resp.ok) {
        setAccount(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    retrieveAccount,
    logout
  }
}

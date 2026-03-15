import { API_URL } from '@/constants'
import { useAccountStore } from '@/store/account'
import { DeleteAccountResponse, DeleteAccountState } from '@/types'
import { toast } from 'sonner'

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
        method: 'POST'
      })

      if (resp.ok) {
        setAccount(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAccount = async (otp?: string) => {
    try {
      const resp = await fetch(`${API_URL}/users`, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ otp })
      })

      const data: DeleteAccountResponse = await resp.json()

      if (data.state === DeleteAccountState.SUCCESS && otp) {
        toast.success('Account deleted successfully')
        setAccount(null)
      } else if (data.state === DeleteAccountState.FAILURE && otp) {
        toast.error('Invalid OTP')
      } else if (data.state === DeleteAccountState.SEND_OTP) {
        toast.info('Please check your email for the OTP')
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    retrieveAccount,
    logout,
    deleteAccount
  }
}

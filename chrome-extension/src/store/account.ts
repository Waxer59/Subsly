import { User } from '@/types'
import { create } from 'zustand'

interface State {
  user: User | null
}

interface Actions {
  setAccount: (account: User) => void
  clear: () => void
}

const initialState: State = {
  user: null
}

export const useAccountStore = create<State & Actions>()((set) => ({
  ...initialState,
  setAccount: (account) => set({ user: account }),
  clear: () => set(initialState)
}))

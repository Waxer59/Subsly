import { Subscription } from '@/types'
import { create } from 'zustand'

interface State {
  subscriptions: Subscription[]
}

interface Actions {
  setSubscriptions: (subscriptions: Subscription[]) => void
  addSubscription: (subscription: Subscription) => void
  updateSubscription: (id: string, subscription: Subscription) => void
  deleteSubscription: (id: string) => void
  clear: () => void
}

const initialState: State = {
  subscriptions: []
}

export const useSubscriptionsStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  setSubscriptions: (subscriptions) => set({ subscriptions }),
  addSubscription: (subscription) =>
    set({ subscriptions: [...get().subscriptions, subscription] }),
  deleteSubscription: (id) =>
    set({ subscriptions: get().subscriptions.filter((sub) => sub.id !== id) }),
  updateSubscription: (id, subscription) =>
    set({
      subscriptions: get().subscriptions.map((sub) =>
        sub.id === id ? subscription : sub
      )
    }),
  clear: () => set(initialState)
}))

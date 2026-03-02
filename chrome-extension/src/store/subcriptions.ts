import { Subscription } from "@/types";
import { create } from "zustand";

interface State {
  subscriptions: Subscription[]
}

interface Actions {
  setSubscriptions: (subscriptions: Subscription[]) => void
  clear: () => void
}

const initialState: State = {
  subscriptions: []
}

export const useSubscriptionsStore = create<State & Actions>()((set) => ({
  ...initialState,
  setSubscriptions: (subscriptions) => set({ subscriptions }),
  clear: () => set(initialState)
}))
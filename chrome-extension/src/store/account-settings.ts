import { Currency } from "@/types"
import { create } from "zustand"

interface State {
  currency: Currency
}

interface Actions {
  setCurrency: (currency: Currency) => void
  clear: () => void
}

const initialState: State = {
  currency: Currency.EUR
}

export const useAccountSettingsStore = create<State & Actions>()((set) => ({
  ...initialState,
  setCurrency: (currency) => set({ currency }),
  clear: () => set(initialState)
}))
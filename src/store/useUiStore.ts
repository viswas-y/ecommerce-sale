import { create } from "zustand";
import { Product } from "@/types";
import { persist } from "zustand/middleware";

interface UserProfile {
  name: string;
  email: string;
}

interface UiState {
  isCartOpen: boolean;
  isMobileNavOpen: boolean;
  isAuthModalOpen: boolean;
  isAuthenticated: boolean;
  user: UserProfile | null;
  quickViewProduct: Product | null;
  setCartOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setAuthModalOpen: (open: boolean) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setUser: (user: UserProfile | null) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      isCartOpen: false,
      isMobileNavOpen: false,
      isAuthModalOpen: false,
      isAuthenticated: false, // Default is logged out
      user: null,
      quickViewProduct: null,
      setCartOpen: (open) => set({ isCartOpen: open }),
      setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
      setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      setUser: (user) => set({ user }),
      openQuickView: (product) => set({ quickViewProduct: product }),
      closeQuickView: () => set({ quickViewProduct: null }),
    }),
    {
      name: "novara-ui-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }), // Only persist authentication state and user details, keep modals state ephemeral
    }
  )
);

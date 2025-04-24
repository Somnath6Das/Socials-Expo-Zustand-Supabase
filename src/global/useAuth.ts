import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

export type AuthType = {
  auth: {
    isAuthenticated: boolean;
    session: Session | null;
    user?: User | null;
    isReady: boolean;
  };
  updateAuth: (auth: any) => void;
};

export const useAuth = create((set) => ({
  auth: {
    isAuthenticated: false,
    session: null,
    user: null,
    isReady: false,
  },
  updateAuth: (newAuth: AuthType) =>
    set((state: { auth: AuthType }) => ({
      auth: { ...state.auth, ...newAuth },
    })),
}));

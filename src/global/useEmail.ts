import { create } from "zustand";
export type EmailType = {
  email: string;
  otp: string;
  setEmail: (email: any) => void;
  setOtp: (otp: any) => void;
};

export const useEmail = create((set) => ({
  email: "",
  otp: "",
  setEmail: (newEmail: EmailType) => set(() => ({ email: newEmail })),
  setOtp: (newOtp: EmailType) => set(() => ({ otp: newOtp })),
}));

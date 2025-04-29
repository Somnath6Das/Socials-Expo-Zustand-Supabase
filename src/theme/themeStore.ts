import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  colorScheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",
      colorScheme: Appearance.getColorScheme() || "light",
      setTheme: (theme: Theme) => {
        const systemColorScheme = Appearance.getColorScheme() || "light";
        const newColorScheme = theme === "system" ? systemColorScheme : theme;
        set({ theme, colorScheme: newColorScheme });
      },
    }),
    {
      name: "theme-storage",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);

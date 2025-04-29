import React from "react";
import { useThemeStore } from "./themeStore";
import { getTheme } from "./theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};
export const useTheme = () => {
  const { colorScheme } = useThemeStore();
  return getTheme(colorScheme);
};

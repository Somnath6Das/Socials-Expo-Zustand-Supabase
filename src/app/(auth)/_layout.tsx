import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthType, useAuth } from "~/src/global/useAuth";
import { useTheme } from "~/src/theme/ThemeProvider";

export default function Layout() {
  const { auth } = useAuth() as AuthType;
  const theme = useTheme();
  if (auth.isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="set_password" />
        <Stack.Screen name="verify_email" />
        <Stack.Screen name="verify_otp" />
      </Stack>
      <StatusBar
        backgroundColor={theme.background}
        style={theme.background === "#212121" ? "light" : "dark"}
      />
    </>
  );
}

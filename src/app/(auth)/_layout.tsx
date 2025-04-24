import { Redirect, Stack } from "expo-router";
import { AuthType, useAuth } from "~/src/global/useAuth";

export default function Layout() {
  const { auth } = useAuth() as AuthType;
  if (auth.isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="set_password" />
      <Stack.Screen name="verify_email" />
      <Stack.Screen name="verify_otp" />
    </Stack>
  );
}

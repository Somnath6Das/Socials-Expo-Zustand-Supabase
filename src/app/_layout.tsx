import { Stack } from "expo-router";
import { AppState } from "react-native";
import { supabase } from "../lib/supabase";
import { useEffect, useRef } from "react";
import { AuthType, useAuth } from "../global/useAuth";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function RootLayout() {
  const { auth, updateAuth } = useAuth() as AuthType;
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        updateAuth({
          session,
          isReady: true,
          user: session?.user,
          isAuthenticated: !!session?.user,
        });
      });
      supabase.auth.onAuthStateChange((_event, session) => {
        updateAuth({
          session,
          isReady: true,
          user: session?.user,
          isAuthenticated: !!session?.user,
        });
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}

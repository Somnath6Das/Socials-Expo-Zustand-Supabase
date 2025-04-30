import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { ActivityIndicator, AppState, View } from "react-native";
import { supabase } from "../lib/supabase";
import { useCallback, useEffect, useRef } from "react";
import { AuthType, useAuth } from "../global/useAuth";
import NetworkAware from "../components/NetworkAware";
import { ThemeProvider, useTheme } from "../theme/ThemeProvider";

// splash screen
SplashScreen.preventAutoHideAsync();

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function RootLayout() {
  // splash screen
  const onLayoutSplash = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  const { auth, updateAuth } = useAuth() as AuthType;
  const isMounted = useRef(false);
  const theme = useTheme();

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
  if (!auth.isReady) {
    return (
      <View
        style={{ flex: 1, backgroundColor: theme.background }}
        onLayout={onLayoutSplash}
      >
        <NetworkAware>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={"large"} color={"green"} />
          </View>
        </NetworkAware>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutSplash}>
      <NetworkAware>
        <ThemeProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen
              name="profile_model"
              options={{
                presentation: "transparentModal",
                animation: "fade",
                headerShown: false,
              }}
            />
          </Stack>
        </ThemeProvider>
      </NetworkAware>
    </View>
  );
}

import {
  FontAwesome,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthType, useAuth } from "~/src/global/useAuth";
import { useTheme } from "~/src/theme/ThemeProvider";
import NotificationProvider from "~/src/notification/Provider";

export default function Layout() {
  const { auth } = useAuth() as AuthType;
  const theme = useTheme();
  if (!auth.isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <NotificationProvider>
      <GestureHandlerRootView>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            headerTitleAlign: "center",
            headerTintColor: theme.primary,
            headerStyle: {
              elevation: 0,
              backgroundColor: theme.background,
            },
            tabBarStyle: {
              backgroundColor: theme.background,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              headerTitle: "Home",
              tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons
                  name="home-circle"
                  size={focused ? 30 : 25}
                  color={focused ? theme.primary : theme.text}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="new_post"
            options={{
              headerTitle: "Create Post",
              tabBarIcon: ({ color, focused }) => (
                <FontAwesome
                  name="plus-circle"
                  size={focused ? 30 : 25}
                  color={focused ? theme.primary : theme.text}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              headerTitle: "Profile",
              tabBarIcon: ({ color, focused }) => (
                <FontAwesome
                  name="user-circle-o"
                  size={focused ? 28 : 23}
                  color={focused ? theme.primary : theme.text}
                />
              ),
            }}
          />
        </Tabs>
        <StatusBar backgroundColor="white" style={"light"} />
      </GestureHandlerRootView>
    </NotificationProvider>
  );
}

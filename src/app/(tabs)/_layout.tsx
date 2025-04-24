import {
  FontAwesome,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthType, useAuth } from "~/src/global/useAuth";

export default function Layout() {
  const { auth } = useAuth() as AuthType;
  if (!auth.isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <GestureHandlerRootView>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          headerTintColor: "black",
          headerStyle: {
            elevation: 0,
            backgroundColor: "white",
          },
          tabBarStyle: {
            backgroundColor: "white",
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
                color={focused ? "blue" : "grey"}
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
                color={focused ? "blue" : "grey"}
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
                color={focused ? "blue" : "grey"}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="white" style={"light"} />
    </GestureHandlerRootView>
  );
}

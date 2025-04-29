import { Entypo, Ionicons } from "@expo/vector-icons";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../lib/supabase";
import { useTheme } from "../theme/ThemeProvider";
import { useState } from "react";
import { useThemeStore } from "../theme/themeStore";
import { Switch } from "react-native-gesture-handler";

const ColorModeSettings = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { setTheme } = useThemeStore();
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    isDarkTheme ? setTheme("light") : setTheme("dark");
  };
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        margin: 12,
        marginTop: 20,
        justifyContent: "space-between",
      }}
    >
      <View>
        <TouchableOpacity
          onPress={toggleTheme}
          style={{
            flexDirection: "row",
            width: "100%",
            borderRadius: 8,
            height: 50,
            backgroundColor: theme.content,
          }}
        >
          <Switch
            trackColor={{ false: "#767577", true: "#f4f3f4" }}
            thumbColor={isDarkTheme ? "#767577" : "#f4f3f4"}
            ios_backgroundColor={"#3e3e3e"}
            onValueChange={toggleTheme}
            value={isDarkTheme}
            style={{ alignSelf: "center", marginLeft: 7 }}
          />
          <Text
            style={{
              fontSize: 20,
              alignSelf: "center",
              marginLeft: 80,
              color: theme.text,
            }}
          >
            {isDarkTheme ? "Dark Mode" : "Light Mode"}
          </Text>
        </TouchableOpacity>
        <Pressable
          onPress={() => setTheme("system")}
          style={{
            width: "100%",
            borderRadius: 8,
            height: 50,
            backgroundColor: theme.content,
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Entypo
            name="ccw"
            size={30}
            style={{
              marginLeft: 15,
              alignSelf: "center",
            }}
            color={theme.text}
          />
          <Text
            style={{
              fontSize: 20,
              alignSelf: "center",
              color: theme.text,
              marginLeft: 82,
            }}
          >
            System Mode
          </Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => supabase.auth.signOut()}
        style={{
          width: "100%",
          borderRadius: 8,
          height: 50,
          backgroundColor: theme.content,
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Ionicons
          name="log-out-outline"
          size={30}
          style={{
            marginLeft: 18,
            alignSelf: "center",
          }}
          color={theme.text}
        />
        <Text
          style={{
            fontSize: 20,
            alignSelf: "center",
            color: theme.text,
            marginLeft: 113,
          }}
        >
          Log out
        </Text>
      </Pressable>
    </View>
  );
};
export default ColorModeSettings;

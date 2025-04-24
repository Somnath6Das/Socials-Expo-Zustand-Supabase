import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { supabase } from "../lib/supabase";

const ColorModeSettings = () => {
  return (
    <View style={{ flex: 1, margin: 8 }}>
      <Pressable
        onPress={() => supabase.auth.signOut()}
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          borderRadius: 8,
          width: "100%",
          height: 40,
          backgroundColor: "grey",
        }}
      >
        <Ionicons name="log-out-outline" size={26} color={"white"} />
        <Text
          style={{
            marginLeft: 8,
            color: "white",
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          Log out
        </Text>
      </Pressable>
    </View>
  );
};
export default ColorModeSettings;

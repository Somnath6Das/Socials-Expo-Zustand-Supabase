import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetContext } from "@gorhom/bottom-sheet/lib/typescript/contexts";
import { useCallback, useRef, useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import BottomSheetComponent from "~/src/components/BottomSheet";
import ColorModeSettings from "~/src/components/ColorModeSettings";
import CustomButton from "~/src/components/CustomButton";
import InputField from "~/src/components/InputField";
import { supabase } from "~/src/lib/supabase";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={openSheet}
        style={{ alignItems: "flex-end", marginRight: 15, marginTop: 15 }}
      >
        <Ionicons name="settings-sharp" size={26} color={"black"} />
      </TouchableOpacity>
      <View style={{ alignItems: "center", marginTop: "10%" }}>
        <Image
          source={require("~/assets/images/user.png")}
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            backgroundColor: "grey",
            borderColor: "blue",
            borderWidth: 4,
          }}
        />
        <TouchableOpacity>
          <Text
            style={{
              color: "black",
              fontWeight: "600",
              marginVertical: 10,
              fontSize: 16,
            }}
          >
            Change
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            marginTop: "10%",
            width: "90%",
            gap: 15,
          }}
        >
          <InputField
            title="Username"
            placeholder="Username"
            value={username}
            handleChangeText={(e) => {
              setUsername(e);
            }}
            keyboardType="default"
          />
          <InputField
            title="Bio"
            placeholder="Bio"
            value={bio}
            handleChangeText={(e) => {
              setUsername(e);
            }}
            keyboardType="default"
          />
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: "7%",
            marginBottom: 30,
            width: "90%",
          }}
        >
          <CustomButton title="Update profile" loading={loading}></CustomButton>
        </View>
      </View>
      <BottomSheetComponent
        bottomSheetRef={bottomSheetRef}
        ViewModel={<ColorModeSettings />}
        minIndex="25%"
        maxIndex="50%"
      />
    </View>
  );
}

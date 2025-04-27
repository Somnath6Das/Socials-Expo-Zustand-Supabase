import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetContext } from "@gorhom/bottom-sheet/lib/typescript/contexts";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomSheetComponent from "~/src/components/BottomSheet";
import ColorModeSettings from "~/src/components/ColorModeSettings";
import CustomButton from "~/src/components/CustomButton";
import InputField from "~/src/components/InputField";
import { supabase } from "~/src/lib/supabase";
import * as ImagePicker from "expo-image-picker";
import { AuthType, useAuth } from "~/src/global/useAuth";
import { cld, uploadImage } from "~/src/lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "cloudinary-react-native";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [image, setImage] = useState<string | undefined>("");
  const { auth } = useAuth() as AuthType;
  const [remoteImage, setRemoteImage] = useState<string | null>(null);
  const isMounted = useRef(false);

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  useEffect(() => {
    isMounted.current = true;
    getProfile();
    return () => {
      isMounted.current = false;
    };
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const getProfile = async () => {
    if (!auth.user?.id) {
      return;
    }
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", auth.user.id)
      .single();
    if (error) {
      Alert.alert("Failed to get profile");
    }
    setUsername(data.username);
    setBio(data.bio);
    setRemoteImage(data.avatar_url);
  };
  const updateProfile = async () => {
    // console.log(auth.user?.id);
    if (!auth.user?.id) {
      return;
    }
    const updatedProfile = {
      id: auth.user.id,
      username,
      bio,
      avatar_url: "",
    };
    setLoading(true);
    if (image) {
      const response = await uploadImage(image);
      updatedProfile.avatar_url = response.public_id;
      // console.log(updatedProfile.avatar_url);
    }
    const { data, error } = await supabase
      .from("profiles")
      .update(updatedProfile)
      .eq("id", auth.user.id);
    setLoading(false);
    if (error) {
      Alert.alert("Failed to update profile");
    }
    Alert.alert("Profile updated");
  };
  let remoteCldImage;
  if (remoteImage) {
    remoteCldImage = cld.image(remoteImage);
    remoteCldImage.resize(thumbnail().width(300).height(300));
  }
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={openSheet}
        style={{ alignItems: "flex-end", marginRight: 15, marginTop: 15 }}
      >
        <Ionicons name="settings-sharp" size={26} color={"black"} />
      </TouchableOpacity>
      <View style={{ alignItems: "center", marginTop: "10%" }}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              backgroundColor: "grey",
              borderColor: "blue",
              borderWidth: 4,
            }}
          />
        ) : remoteCldImage ? (
          <AdvancedImage
            cldImg={remoteCldImage}
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              backgroundColor: "grey",
              borderColor: "blue",
              borderWidth: 4,
            }}
          />
        ) : (
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
        )}
        <TouchableOpacity onPress={pickImage}>
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
              setBio(e);
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
          <CustomButton
            onPress={updateProfile}
            title="Update Profile"
            loading={loading}
          ></CustomButton>
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

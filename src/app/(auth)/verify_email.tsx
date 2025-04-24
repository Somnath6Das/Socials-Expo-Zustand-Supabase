import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "~/src/components/CustomButton";
import InputField from "~/src/components/InputField";
import { EmailType, useEmail } from "~/src/global/useEmail";
import { supabase } from "~/src/lib/supabase";

export default function SetEmail() {
  const { heading } = useLocalSearchParams();
  const { email, setEmail } = useEmail() as EmailType;
  const [loading, setloading] = useState(false);
  const emailVerify = async () => {
    setloading(true);
    if (!email) {
      Alert.alert("Please write your email.");
      return;
    }
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    });
    if (error) {
      Alert.alert("Not a valid email.");
      return;
    }
    setloading(false);
    router.push("/verify_otp");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("~/assets/images/instagram.png")}
          resizeMode="contain"
          style={{
            alignSelf: "center",
            width: 120,
            height: 120,
            marginBottom: 35,
          }}
        />
        <Text
          style={{
            alignSelf: "center",
            marginVertical: 20,
            fontSize: 19,
            color: "black",
          }}
        >
          {heading}
        </Text>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            gap: 20,
          }}
        >
          <InputField
            title="Email"
            value={email}
            placeholder="example@email.com"
            handleChangeText={(e) => setEmail(e)}
            keyboardType="email-address"
          />
          <CustomButton
            title="Verify"
            loading={loading}
            onPress={() => emailVerify()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

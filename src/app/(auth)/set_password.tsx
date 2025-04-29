import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "~/src/components/CustomButton";
import InputField from "~/src/components/InputField";
import { EmailType, useEmail } from "~/src/global/useEmail";
import { supabase } from "~/src/lib/supabase";
import { useTheme } from "~/src/theme/ThemeProvider";

export default function SetPassword() {
  const { email, otp } = useEmail() as EmailType;
  const [pass, setPass] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const setPassword = async () => {
    if (!pass.password && !pass.confirmPassword) {
      Alert.alert("Please set the Password and Confirm Password");
      return;
    }
    if (pass.password !== pass.confirmPassword) {
      Alert.alert("Password and Confirm Password is not match!");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });
    const { error: updateError } = await supabase.auth.updateUser({
      password: pass.password,
    });
    setLoading(false);
    if (updateError) {
      Alert.alert(updateError?.message);
      return;
    }
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
            fontSize: 22,
            marginBottom: 18,
            color: theme.text,
          }}
        >
          Set Password
        </Text>
        <View style={{ width: "100%", alignItems: "center", gap: 10 }}>
          <InputField
            title="Password"
            value={pass.password}
            placeholder="******"
            handleChangeText={(e) => setPass({ ...pass, password: e })}
            keyboardType="default"
          />
          <InputField
            title="Password"
            value={pass.confirmPassword}
            placeholder="******"
            handleChangeText={(e) => setPass({ ...pass, confirmPassword: e })}
            keyboardType="default"
          />
          <CustomButton
            loading={loading}
            title="Sign up"
            onPress={setPassword}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

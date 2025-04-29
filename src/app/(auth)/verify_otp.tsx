import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "~/src/components/CustomButton";
import { EmailType, useEmail } from "~/src/global/useEmail";
import { useTheme } from "~/src/theme/ThemeProvider";

export default function SetOtp() {
  const { otp, setOtp } = useEmail() as EmailType;
  const theme = useTheme();
  const otpVerify = () => {
    if (otp.length === 6) {
      router.push("/set_password");
    } else {
      Alert.alert("Please put the 6 charcters otp.");
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
        <Text style={{ fontSize: 22, alignSelf: "center", color: theme.text }}>
          Please give your otp.
        </Text>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text
            style={{ fontSize: 19, marginBottom: 14, color: "black" }}
          ></Text>
          <OtpInput
            focusColor={theme.primary}
            type="numeric"
            numberOfDigits={6}
            onTextChange={(text) => setOtp(text)}
            autoFocus={true}
            theme={{
              containerStyle: {
                justifyContent: "center",
                gap: 8,
                alignItems: "center",
                height: 10,
                width: 10,
                marginVertical: 40,
              },
              pinCodeTextStyle: { color: theme.primary },
              focusStickStyle: { borderColor: theme.primary },
              pinCodeContainerStyle: { backgroundColor: theme.cardback },
            }}
          />
          <CustomButton title="Sign up" onPress={() => otpVerify()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

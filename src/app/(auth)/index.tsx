import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "~/src/components/CustomButton";
import InputField from "~/src/components/InputField";
import { AuthType, useAuth } from "~/src/global/useAuth";
import { supabase } from "~/src/lib/supabase";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState(true);
  const { auth, updateAuth } = useAuth() as AuthType;

  const signInWithEmail = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    updateAuth({
      session,
      isReady: true,
      user: session?.user,
      isAuthenticated: !!session?.user,
    });
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
        <View style={{ width: "100%", alignItems: "center", gap: 10 }}>
          <Text style={{ fontSize: 22 }}>Login to Socials</Text>
          <InputField
            title="Email"
            value={form.email}
            placeholder="example@email.com"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />
          <InputField
            title="Password"
            value={form.password}
            placeholder="******"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            keyboardType="default"
          />
          <CustomButton
            title="Sign in"
            loading={loading}
            onPress={() => signInWithEmail()}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 16, color: "black" }}>
            Don't have an account ?
          </Text>
          <Link href="verify_email?heading=Sign up for new profile">
            Sign up
          </Link>
        </View>
        {errorInfo && (
          <TouchableOpacity
            onPress={() =>
              router.push(
                "verify_email?heading=Verify email to set new password"
              )
            }
            style={{ alignItems: "center", marginTop: 8 }}
          >
            <Text style={{ fontSize: 16 }}>Forget Password</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

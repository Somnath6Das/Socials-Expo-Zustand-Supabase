import { Link, router, useLocalSearchParams } from "expo-router";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { useTheme } from "../theme/ThemeProvider";
import { Image, Pressable, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AdvancedImage } from "cloudinary-react-native";
import { useEffect, useRef, useState } from "react";
import { cld } from "../lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { supabase } from "../lib/supabase";

export default function Model() {
  const params = useLocalSearchParams();
  const postId = params.postId ?? null;
  const userId = params.userId ?? null;
  const theme = useTheme();
  const isPresented = router.canGoBack();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [user, setUser] = useState({
    name: "",
    bio: "",
  });
  const isMounted = useRef(false);
  const getProfile = async () => {
    let { data, error } = await supabase
      .from("posts")
      .select("*, profiles(*)")
      .eq("id", postId);
    if (data && data.length > 0) {
      setAvatarUrl(data[0].profiles.avatar_url);
      setUser({
        ...user,
        name: data[0].profiles.username,
        bio: data[0].profiles.bio,
      });
    }
  };
  const getUser = async () => {
    let { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);
    if (data && data.length > 0) {
      setAvatarUrl(data[0].avatar_url);
      setUser({
        ...user,
        name: data[0].username,
        bio: data[0].bio,
      });
    }
  };
  useEffect(() => {
    isMounted.current = true;
    if (postId) {
      getProfile();
    }
    if (userId) {
      getUser();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);
  if (!avatarUrl) {
    return;
  }
  let remoteCldImage = cld.image(avatarUrl);
  remoteCldImage.resize(thumbnail().width(300).height(300));
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.cardback,
      }}
    >
      <Link href={"../"} asChild>
        <Pressable style={StyleSheet.absoluteFill} />
      </Link>
      <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={{
          width: "90%",
          height: "80%",
          backgroundColor: theme.cardfore,
        }}
      >
        {isPresented && (
          <Link
            style={{ color: theme.text, marginLeft: 10, marginTop: 10 }}
            href="../"
          >
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </Link>
        )}
        <View style={{ alignItems: "center", marginTop: "10%" }}>
          {postId || userId ? (
            <AdvancedImage
              cldImg={remoteCldImage}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                backgroundColor: theme.content,
                borderColor: theme.text,
                borderWidth: 4,
              }}
            />
          ) : (
            <Image
              source={require("~/assets/images/user.png")}
              style={{
                width: 150,
                height: 150,
                borderRadius: 50,
                backgroundColor: theme.content,
                borderColor: theme.text,
                borderWidth: 4,
              }}
            />
          )}
        </View>
        <View
          style={{
            marginTop: "8%",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text style={{ color: theme.text, fontSize: 28 }}>{user.name}</Text>
          <Text style={{ color: theme.text, fontSize: 28 }}>{user.bio}</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

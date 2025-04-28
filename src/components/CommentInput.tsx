import { Alert, Image, TouchableOpacity, View } from "react-native";
import { AuthType, useAuth } from "../global/useAuth";
import { supabase } from "../lib/supabase";
import { useEffect, useRef, useState } from "react";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "../lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { fetchComments } from "../func/fetchComments";
import { PostIdType, usePostId } from "../global/usePostId";

const CommentInput = () => {
  const { auth } = useAuth() as AuthType;
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const isMounted = useRef(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { postId } = usePostId() as PostIdType;

  const getProfile = async () => {
    if (!auth.user?.id) {
      return;
    }
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", auth.user.id)
      .select();
    if (error) {
      Alert.alert("Faild to fetch profile");
    }
    if (data) {
      setAvatar(data[0]?.avatar_url || null);
      setUsername(data[0]?.username || null);
    }
    setText("");
  };
  const makeComment = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          user_id: auth.user?.id,
          post_id: postId,
          comment: text,
        },
      ])
      .select();
    setText("");
    // console.log(JSON.stringify(data, null, 2));
    if (data) {
      let postidCmt = data[0]?.post_id;
      fetchComments(postidCmt);
    }
  };
  let remoteCldImage = cld.image(avatar);
  remoteCldImage.resize(thumbnail().width(300).height(300));
  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      getProfile();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <View
      style={{
        height: 45,
        margin: 12,
        borderWidth: 2,
        borderColor: "blue",
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      {avatar ? (
        <AdvancedImage
          cldImg={remoteCldImage}
          style={{
            width: 25,
            height: 25,
            aspectRatio: 1,
            borderRadius: 50,
          }}
        />
      ) : (
        <Image
          source={require("~/assets/images/user.png")}
          style={{ width: 25, height: 25, aspectRatio: 1, borderRadius: 50 }}
        />
      )}
      <TextInput
        style={{
          color: "black",
        }}
        onChangeText={setText}
        placeholder={`Comment as ${username}`}
        placeholderTextColor={"black"}
        value={text}
        keyboardType="default"
      />
      <TouchableOpacity
        style={{ marginLeft: "auto" }}
        onPress={makeComment}
        disabled={loading}
      >
        <Ionicons name="send" size={20} color={"blue"} />
      </TouchableOpacity>
    </View>
  );
};
export default CommentInput;

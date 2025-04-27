import { AdvancedImage } from "cloudinary-react-native";
import { Image, Text, View } from "react-native";
import { cld } from "../lib/cloudinary";
import PostContent from "./PostContent";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

const PostList = ({ post }: any) => {
  let avatar = cld.image(post.user.avatar_url);
  console.log(JSON.stringify(post, null, 2));
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10,
          marginTop: 10,
          gap: 8,
          marginBottom: 16,
        }}
      >
        {post.user.avatar_url ? (
          <AdvancedImage
            cldImg={avatar}
            style={{
              width: 47,
              height: 47,
              aspectRatio: 1,
              borderRadius: 50,
            }}
          />
        ) : (
          <Image source={require("~/assets/images/user.png")} />
        )}
        <View style={{ flexDirection: "column", gap: 2 }}>
          <Text style={{ fontSize: 16, color: "black" }}>
            {post.user.username || "unknown"}
          </Text>
          {post.caption && (
            <View>
              <Text
                style={{ fontWeight: "semibold", fontSize: 16, color: "black" }}
              >
                {post.caption}
              </Text>
            </View>
          )}
        </View>
      </View>
      <PostContent post={post} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 6,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
            gap: 7,
          }}
        >
          <AntDesign name={"hearto"} size={20} color={"black"} />
          <Ionicons name="chatbubble-outline" size={20} color={"black"} />
          <Feather name="send" size={20} color={"black"} />
        </View>
        <Feather
          name="bookmark"
          size={20}
          style={{ marginRight: 10 }}
          color={"black"}
        />
      </View>
      <View
        style={{ flexDirection: "row", marginTop: 5, gap: 1, marginBlock: 10 }}
      >
        <Text style={{ fontWeight: "semibold", marginLeft: 7, color: "black" }}>
          Likes 0
        </Text>
        <Text style={{ fontWeight: "semibold", marginLeft: 7, color: "black" }}>
          Comments 0
        </Text>
      </View>
    </View>
  );
};
export default PostList;

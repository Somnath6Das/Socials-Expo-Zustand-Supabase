import { AdvancedImage } from "cloudinary-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { cld } from "../lib/cloudinary";
import { useTheme } from "../theme/ThemeProvider";
import { router } from "expo-router";

const CommentList = ({ comment }: any) => {
  const theme = useTheme();
  let avatar = cld.image(comment.user.avatar_url);
  // console.log(comment);
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        marginLeft: 8,
        marginRight: 8,
      }}
    >
      <View style={{ marginBottom: 10 }}>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              router.push(`/profile_model?userId=${comment.user.id}`)
            }
          >
            {comment.user.avatar_url ? (
              <AdvancedImage
                cldImg={avatar}
                style={{
                  width: 40,
                  height: 40,
                  aspectRatio: 1,
                  borderRadius: 50,
                }}
              />
            ) : (
              <Image source={require("~/assets/images/user.png")} />
            )}
          </TouchableOpacity>
          <View style={{ gap: 3 }}>
            <Text
              style={{ fontSize: 15, fontWeight: "500", color: theme.text }}
            >
              {comment.user.username || "Unknown"}
            </Text>
            <Text style={{ color: theme.text }}>{comment.comment}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default CommentList;

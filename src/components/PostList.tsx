import { AdvancedImage } from "cloudinary-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { cld } from "../lib/cloudinary";
import PostContent from "./PostContent";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { AuthType, useAuth } from "../global/useAuth";
import { supabase } from "../lib/supabase";
import { PostIdType, usePostId } from "../global/usePostId";
import { fetchComments } from "../func/fetchComments";

const PostList = ({ post, openSheet }: any) => {
  let avatar = cld.image(post.user.avatar_url);
  // console.log(JSON.stringify(post, null, 2));
  const likeCountRef = useRef(post.likes?.[0]?.count);
  const { auth } = useAuth() as AuthType;
  const [isLiked, setIsLiked] = useState(false);
  const [likeRecord, setLikeRecord] = useState<{ id: string } | null>(null);
  const { setPostId } = usePostId() as PostIdType;
  const [commentCount, setCommentCount] = useState<number | null>(null);
  const isMounted = useRef(false);
  useEffect(() => {
    if (post.my_likes.length > 0) {
      setLikeRecord(post.my_likes[0]);
      setIsLiked(true);
    }
  }, [post.my_likes]);

  useEffect(() => {
    if (isLiked) {
      saveLike();
    } else {
      deleteLike();
    }
  }, [isLiked]);
  const saveLike = async () => {
    if (likeRecord) {
      return;
    }
    const { data } = await supabase
      .from("likes")
      .insert([
        {
          user_id: auth.user?.id,
          post_id: post.id,
        },
      ])
      .select();
    if (data) {
      setLikeRecord(data[0]);
    }
  };
  const deleteLike = async () => {
    if (likeRecord) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("id", likeRecord.id);
      if (!error) {
        setLikeRecord(null);
      }
    }
  };
  const commentByPostId = () => {
    fetchComments(post.id).then(({ data, count, error }) => {
      setCommentCount(count);
    });
  };
  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      commentByPostId();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);
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
          <TouchableOpacity
            onPress={() => {
              if (!isLiked) {
                likeCountRef.current += 1;
                setIsLiked(true);
              } else {
                likeCountRef.current -= 1;
                setIsLiked(false);
              }
            }}
          >
            <AntDesign
              name={isLiked ? "heart" : "hearto"}
              size={20}
              color={isLiked ? "crimson" : "black"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPostId(post.id);
              commentByPostId();
              openSheet();
            }}
          >
            <Ionicons name="chatbubble-outline" size={20} color={"black"} />
          </TouchableOpacity>
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
          Likes {likeCountRef.current || 0}
        </Text>
        <Text style={{ fontWeight: "semibold", marginLeft: 7, color: "black" }}>
          Comments {commentCount?.toString()}
        </Text>
      </View>
    </View>
  );
};
export default PostList;

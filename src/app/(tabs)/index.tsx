import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { supabase } from "~/src/lib/supabase";
import PostList from "~/src/components/PostList";
import { AuthType, useAuth } from "~/src/global/useAuth";
import BottomSheetComponent from "~/src/components/BottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CommentList from "~/src/components/CommentList";
import CommentInput from "~/src/components/CommentInput";

export default function Home() {
  const [posts, setPosts] = useState<any[] | null>([]);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);
  const { auth } = useAuth() as AuthType;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const fetchPosts = async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from("posts")
      .select("*, user:profiles(*), my_likes:likes(*), likes(count)")
      .eq("my_likes.user_id", auth.user?.id)
      .order("created_at", { ascending: false });
    if (error) {
      Alert.alert("Something went wrong");
    }
    setPosts(data);
    setLoading(false);
  };
  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current) {
      fetchPosts();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={posts}
        renderItem={({ item }: any) => (
          <PostList post={item} openSheet={openSheet} />
        )}
        contentContainerStyle={{
          gap: 10,
          maxWidth: 512,
          alignSelf: "center",
          width: "100%",
        }}
        showsVerticalScrollIndicator={false}
        onRefresh={fetchPosts}
        refreshing={loading}
      />
      <BottomSheetComponent
        bottomSheetRef={bottomSheetRef}
        ViewModel={
          <FlatList
            data={comments}
            renderItem={({ item }: any) => <CommentList comment={item} />}
            contentContainerStyle={{
              gap: 10,
              maxWidth: 512,
              alignSelf: "center",
              width: "100%",
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <MaterialCommunityIcons
                  name="comment"
                  size={50}
                  color={"black"}
                />
                <Text style={{ color: "black" }}>No Comments yet</Text>
              </View>
            }
            onRefresh={fetchPosts}
            refreshing={loading}
          />
        }
        commentInput={<CommentInput />}
        minIndex="50%"
        maxIndex="80%"
      />
    </View>
  );
}

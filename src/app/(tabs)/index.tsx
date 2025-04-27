import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { supabase } from "~/src/lib/supabase";
import PostList from "~/src/components/PostList";

export default function Home() {
  const [posts, setPosts] = useState<any[] | null>([]);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);

  const fetchPosts = async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from("posts")
      .select("*, user:profiles(*)")
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
        renderItem={({ item }: any) => <PostList post={item} />}
      />
    </View>
  );
}

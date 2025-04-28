import { useCommentsStore } from "../global/useComments";
import { supabase } from "../lib/supabase";

export const fetchComments = async (postid: any) => {
  const { data, count, error } = await supabase
    .from("comments")
    .select("*, user:profiles(*)", { count: "exact" })
    .eq("post_id", postid)
    .order("created_at", { ascending: true });
  if (error) {
    console.log(error);
  }
  if (data) {
    useCommentsStore.getState().setComments(data);
  }
  return { data, count, error };
};

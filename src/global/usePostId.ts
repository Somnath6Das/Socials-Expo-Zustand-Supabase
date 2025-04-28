import { create } from "zustand";
export type PostIdType = {
  postId: string;
  setPostId: (postId: any) => void;
};
export const usePostId = create((set) => ({
  postId: "",
  setPostId: (newId: PostIdType) => set(() => ({ postId: newId })),
}));

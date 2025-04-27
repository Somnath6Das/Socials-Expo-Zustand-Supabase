import { AdvancedImage } from "cloudinary-react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useWindowDimensions } from "react-native";
import { cld } from "../lib/cloudinary";
import { scale, thumbnail } from "@cloudinary/url-gen/actions/resize";

const PostContent = ({ post }: any) => {
  const { width, height } = useWindowDimensions();
  const image = cld.image(post.file_id);
  image.resize(thumbnail().width(width).height(width));

  const video = cld.video(post.file_id);
  video.resize(scale().width(width));

  const videoUrl = post.media_type === "video" ? video.toURL() : null;
  const player = useVideoPlayer(videoUrl || "", (player) => {
    player.loop = false;
    // player.play();
  });

  return post.media_type === "image" ? (
    <AdvancedImage
      cldImg={image}
      style={{
        width: "100%",
        aspectRatio: 4 / 3,
      }}
    />
  ) : post.media_type === "video" ? (
    <VideoView
      style={{
        width: "100%",
        aspectRatio: 16 / 9,
      }}
      player={player}
      allowsFullscreen
      allowsPictureInPicture
      nativeControls={true}
    />
  ) : null;
};
export default PostContent;

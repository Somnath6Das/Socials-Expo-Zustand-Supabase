import { ActivityIndicator, Pressable, Text } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
};
const CustomButton = ({ title, onPress, loading = false }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={{
        backgroundColor: "blue",
        marginTop: 10,
        width: "90%",
        paddingVertical: 15,
        borderRadius: 5,
      }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color="white"
          style={{ alignSelf: "center" }}
        />
      ) : (
        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            color: "white",
            fontWeight: "500",
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};
export default CustomButton;

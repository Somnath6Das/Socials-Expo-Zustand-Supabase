import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
type FormField = {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  keyboardType: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
};

const InputField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
}: FormField) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={{ width: "90%", gap: 7 }}>
      <Text style={{ color: "black", fontSize: 18 }}>{title}</Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 64,
          justifyContent: "space-between",
          paddingHorizontal: 16,
          backgroundColor: "white",
          borderColor: "blue",
          borderWidth: 2,
          paddingVertical: 10,
          borderRadius: 10,
        }}
      >
        <TextInput
          style={{
            color: "black",
            textAlignVertical: "center",
            fontSize: 18,
            height: 35,
            width: "90%",
          }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"black"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        {title === "Password" && (
          <TouchableOpacity
            style={{ justifyContent: "center" }}
            onPress={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <Feather name="eye" size={24} color="black" />
            ) : (
              <Feather name="eye-off" size={24} color="black" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default InputField;

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useTheme } from "../theme/ThemeProvider";

const NetworkAware = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const theme = useTheme();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return isConnected ? (
    <>{children}</>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 24, color: "#e50000" }}>
        No Internet Connection
      </Text>
      <Text style={{ color: theme.text }}>
        Please check your network and try again.
      </Text>
    </View>
  );
};
export default NetworkAware;

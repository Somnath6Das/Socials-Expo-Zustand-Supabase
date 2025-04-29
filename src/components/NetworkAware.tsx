import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const NetworkAware = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

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
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 24, color: "#e50000" }}>
        No Internet Connection
      </Text>
      <Text style={{ color: "#8f8e8e" }}>
        Please check your network and try again.
      </Text>
    </View>
  );
};
export default NetworkAware;

import { FontAwesome } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { useCommentsStore } from "../global/useComments";
import { useTheme } from "../theme/ThemeProvider";

const BottomSheetComponent = ({
  bottomSheetRef,
  minIndex,
  maxIndex,
  ViewModel,
  commentInput = null,
}: any) => {
  const snapPoints = useMemo(() => [minIndex, maxIndex], []);
  const theme = useTheme();
  const handleSheetChange = useCallback((index: number) => {
    if (index === -1) {
      useCommentsStore.getState().clearComments();
      bottomSheetRef.current?.close();
    }
  }, []);
  const handleClosePress = () => {
    useCommentsStore.getState().clearComments();
    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheet
      index={-1}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      onChange={handleSheetChange}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: theme.cardback }}
      handleIndicatorStyle={{ backgroundColor: theme.text }}
    >
      <BottomSheetView
        style={{
          flex: 1,
          backgroundColor: theme.cardback,
        }}
      >
        <TouchableOpacity
          onPress={handleClosePress}
          style={{ alignItems: "flex-end", marginRight: 20 }}
        >
          <FontAwesome name="close" size={20} color={theme.text} />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          {ViewModel}
          {commentInput}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
export default BottomSheetComponent;

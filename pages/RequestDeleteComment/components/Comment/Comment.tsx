import { Text, View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS, BORDER_RADIUS } from "../../../../constants/theme";
import {
  getColorByTypeDangerous,
  getTextByTypeDangerous,
} from "../../../../helper/helper";
import { TypeDangerous } from "../../../../modals/allNumbersModal";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { ICommentCommon } from "../../../../modals/common";

const styles = StyleSheet.create({
  сontainer: {
    padding: 15,
    position: "relative",
    backgroundColor: COLORS.white,
	 borderRadius: BORDER_RADIUS.xLarge
  },

  additionInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },

  date: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  // @ts-ignore */
  typeDangerous: (type) => ({
    backgroundColor: getColorByTypeDangerous(type) + "4D",
    color: getColorByTypeDangerous(type),
    borderRadius: BORDER_RADIUS.xLarge,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontWeight: 600,
  }),
});

const Comment = () => {
	const route = useRoute();
  const { item } = route.params as { item: ICommentCommon };

  return (
    <View>
      <Text style={{fontWeight: "600", marginBottom: 15, fontSize: 16}}>Коментар для видалення</Text>
      <View style={styles.сontainer}>
        <Text>{item.comment}</Text>
        <View style={styles.additionInfo}>
          <Text
            // @ts-ignore */
            style={styles.typeDangerous(item.typeDangerous)}
          >
            {getTextByTypeDangerous(item.typeDangerous)}
          </Text>
          <View style={styles.date}>
            <FontAwesome type="font-awesome" name="clock-o" />
            <Text>{item.date}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Comment;

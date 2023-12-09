import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { COLORS, BORDER_RADIUS } from "../../constants/theme";
import { ColorByTypeDangerous, INumberRow, TypeDangerous } from "../../modals/allNumbersModal";
import { phonePageScreen } from "../../constants/screens";
import { getColorByTypeDangerous } from "../../helper/helper";
import { clearNumbersData } from "../../store/features/allNumbersSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { AnyAction } from "@reduxjs/toolkit";

const styles = StyleSheet.create({
  // @ts-ignore
  listItemsContainer: (activeNumber: number, item: number): ViewStyle => ({
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 15,
    borderColor: COLORS.gray,
    backgroundColor: activeNumber === item ? COLORS.secondary : "transparent",
  }),

  listItem: {
    flex: 50,
  },
  listItemPrimaryContainer: {
    flex: 50,
    alignItems: "center",
  },
  // @ts-ignore
  listItemPrimary: (type: TypeDangerous) => ({
    backgroundColor: getColorByTypeDangerous(type) + "4C",
    color: getColorByTypeDangerous(type),
    borderRadius: BORDER_RADIUS.xLarge,
    padding: 10,
    fontSize: 14,
    textAlign: "center",
    width: 100,
    fontWeight: "600",
  }),
});

type Props = {
  item: INumberRow;
  clearData: () => AnyAction;
};

const ListItem = ({ item, clearData }: Props) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [activeNumber, setActiveNumber] = useState<string>("");
  const handleGoNumberPage = (item: string) => {
    setActiveNumber(item);
    navigation.navigate(phonePageScreen as never, { number: item } as never);
	  dispatch(clearData());
  };

  return (
    <TouchableOpacity
      // @ts-ignore
      style={styles.listItemsContainer(activeNumber, item.number)}
      onPressIn={() => handleGoNumberPage(item.number)}
      onPressOut={() => setActiveNumber("")}
    >
      <Text style={styles.listItem}>{item.number}</Text>
      <View style={styles.listItemPrimaryContainer}>
        <Text
          // @ts-ignore
          style={styles.listItemPrimary(item.typeDangerous)}
        >
          {item.level_dangerous}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};
 
export default ListItem;
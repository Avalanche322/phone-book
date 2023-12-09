import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS } from "../../constants/theme";
import { phonePageScreen } from "../../constants/screens";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  // @ts-ignore
  listItem: (index, lastIndex) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: index !== lastIndex ? 15 : 0,
    marginTop: 15,
    borderColor: index !== lastIndex ? COLORS.gray : "transparent",
  }),

  numberInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    marginRight: 40,
  },

  numberInfoText: {
    fontWeight: "600",
  },

  numberInfoPrimery: {
    color: COLORS.primary + "B2",
  },

  listItemIcon: {
    fontSize: 22,
    color: COLORS.red,
  },
});

type Props = {
  lastIndex: number;
  index: number;
  handleRemove: (num: string) => void;
  item: any;
};

const ListItemRemove = ({
  item,
  index,
  lastIndex,
  handleRemove,
}: Props) => {
  const navigation = useNavigation();

  const handleToNumber = (number: string) => {
    navigation.navigate(phonePageScreen as never, { number } as never);
  };

  return (
    <View
      /* 
			// @ts-ignore */
      style={styles.listItem(index, lastIndex)}
    >
      <TouchableOpacity
        style={styles.numberInfo}
        onPress={() => handleToNumber(item.number)}
      >
        <Text style={styles.numberInfoText}>{item.number}</Text>
        <Text style={styles.numberInfoPrimery}>{item.date}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRemove(item.number)}>
        <FontAwesome
          type="font-awesome"
          name="remove"
          style={styles.listItemIcon}
        />
      </TouchableOpacity>
    </View>
  );
};
 
export default ListItemRemove;
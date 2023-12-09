import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Dropdown } from "react-native-element-dropdown";

import { BORDER_RADIUS, COLORS } from "../../../../constants/theme";
import { TypeSort } from "../../../../modals/allNumbersModal";

type Props = {
  selectedSort: TypeSort;
  onValueChange: (value: TypeSort) => void;
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.xLarge,
    padding: 2,
    paddingLeft: 15,
    width: 150,
  },

  // @ts-ignore */
  listContainer: (width) => ({
    marginTop: 5,
    borderRadius: BORDER_RADIUS.xLarge,
    left: 15,
    width: width - 15 * 2,
  }),

  icon: {
    paddingRight: 18,
    fontSize: 15,
    color: COLORS.white,
  },

  placeholder: {
    color: COLORS.lightWhite,
  },
});

const items = [
  {
    label: "Рівень небезпеки (від високої до низької)",
    value: TypeSort.DescLevelDangerous,
  },
  {
    label: "Рівень небезпеки (від низької до високої)",
    value: TypeSort.AscLevelDangerous,
  },
  {
    label: "Кількість коментарів (від вищої до меншої)",
    value: TypeSort.DescCountMarks,
  },
  {
    label: "Кількість коментарів (від меншої до вищої)",
    value: TypeSort.AscCountMarks,
  },
];

const SortDropdown = ({ onValueChange, selectedSort }: Props) => {
  const { width } = useWindowDimensions();

  const RenderItem = (item: any) => {
    return (
      <View
        style={{
          padding: 15,
          borderBottomWidth: 1,
          borderColor: COLORS.gray,
			 flexDirection: "row",
			 alignItems: "center",
			 justifyContent: "space-between"
        }}
      >
        <Text key={item.value} style={{color: item.value === selectedSort ? COLORS.primary : undefined}}>{item.label}</Text>
        {item.value === selectedSort && (
          <FontAwesome
            type="font-awesome"
            name="check"
            style={{ fontSize: 18, color: COLORS.primary }}
          />
        )}
      </View>
    );
  };

  const Icon = () => (
    <FontAwesome type="font-awesome" name="sort" style={styles.icon} />
  );

  return (
    <View style={{ marginVertical: 10, alignItems: "flex-end" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Dropdown
          data={items}
          value={selectedSort}
          labelField="label"
          valueField="value"
          placeholder="Сортувати"
          selectedTextProps={{ numberOfLines: 1 }}
          onChange={({ value }) => onValueChange(value)}
          renderItem={RenderItem}
          style={styles.dropdown}
          placeholderStyle={styles.placeholder}
          // @ts-ignore */
          containerStyle={styles.listContainer(width)}
          renderRightIcon={Icon}
          selectedTextStyle={{ color: COLORS.white }}
          itemContainerStyle={{ paddingHorizontal: 8 }}
        />
      </View>
    </View>
  );
};

export default SortDropdown;

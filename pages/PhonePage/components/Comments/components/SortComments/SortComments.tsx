import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { COLORS, BORDER_RADIUS } from "../../../../../../constants/theme";
import { TypeDangerous } from "../../../../../../modals/allNumbersModal";
import { getColorByTypeDangerous } from "../../../../../../helper/helper";
import { useAppSelector } from "../../../../../../hooks/reduxHooks";
import { selectCommentsState } from "../../../../../../store/features/numberInfoSlice";

const styles = StyleSheet.create({
  сontainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xLarge,
    marginTop: 20,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
	 paddingHorizontal: 15,
	 paddingVertical: 15
  },
});

const Itemstyles = StyleSheet.create({
  // @ts-ignore */
  сontainer: ({ selected, type, index, lastIndex }) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor:
      type === selected ? getColorByTypeDangerous(type) + "7F" : "transparent",
    borderTopLeftRadius: index === 0 ? BORDER_RADIUS.xLarge : 0,
    borderBottomLeftRadius: index === 0 ? BORDER_RADIUS.xLarge : 0,
    borderTopRightRadius: index === lastIndex ? BORDER_RADIUS.xLarge : 0,
    borderBottomRightRadius: index === lastIndex ? BORDER_RADIUS.xLarge : 0,
  }),

  // @ts-ignore */
  count: (type, selected) => ({
    backgroundColor:
      type === selected ? COLORS.white : getColorByTypeDangerous(type) + "4D",
    borderRadius: 100,
    textAlign: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    color: getColorByTypeDangerous(type),
    fontSize: 12,
  }),

  text: {
    fontSize: 12,
  },

  // @ts-ignore */
  close: {
    color: COLORS.white,
	 fontSize: 16,
	 borderRightWidth: 1,
	 borderColor: COLORS.gray,
	 paddingRight: 10
  },
});

type SortItemProps = {
  item: {
    label: string;
    type: number;
    count: number;
  };
  handleSelectSort: (type: number) => void;
  selected: number;
  index: number;
  lastIndex: number;
};

const SortItem = ({
  item,
  handleSelectSort,
  selected,
  index,
  lastIndex,
}: SortItemProps) => {
  return (
    <View>
      <TouchableOpacity
        // @ts-ignore */
        style={Itemstyles.сontainer({
          selected,
          type: item.type,
          index,
          lastIndex,
        })}
        activeOpacity={1}
        onPress={() => handleSelectSort(item.type)}
      >
        {selected === item.type && <FontAwesome
          type="font-awesome"
          name="close"
          // @ts-ignore */
          style={Itemstyles.close}
        />}
        <Text style={Itemstyles.text}>{item.label}</Text>
        <Text
          // @ts-ignore */
          style={Itemstyles.count(item.type, selected)}
        >
          {item.count}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

type Props = {
  handleSelectSort: (type: TypeDangerous) => void;
  selected: TypeDangerous;
};

const SortComments = ({ handleSelectSort, selected }: Props) => {
  const { filterSettings } = useAppSelector(selectCommentsState);

  const data = [
    {
      label: "Безпечний",
      count: filterSettings.safeCount,
      type: TypeDangerous.Safe,
    },
    {
      label: "Нейтральний",
      count: filterSettings.neutralCount,
      type: TypeDangerous.Neutral,
    },
    {
      label: "Небезпечний",
      count: filterSettings.dangerousCount,
      type: TypeDangerous.Dangerous,
    },
  ];

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <>
          {Boolean(item.count) && (
            <SortItem
              item={item}
              handleSelectSort={handleSelectSort}
              selected={selected}
              index={index}
              lastIndex={data.length - 1}
            />
          )}
        </>
      )}
      keyExtractor={({ label }) => label}
      horizontal
      style={styles.сontainer}
    />
  );
};

export default SortComments;

import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { COLORS } from "../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  clearDataHistory,
  clearErrorHistory,
  selectHistoryPaginationState,
  selectHistoryState,
} from "../../store/features/userInfoSlice";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { phonePageScreen } from "../../constants/screens";
import useShowError from "../../hooks/useShowError";
import { clearHistory, getHistory } from "../../store/thunk/userInfoThunk";
import List from "../../components/List";
import { IFavoriteHistoryNumber } from "../../modals/userInfoModal";
import Button, { TypeButton } from "../../components/Button/Button";

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: COLORS.lightWhite,
    flex: 1,
  },

  numberInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },

  numberInfoText: {
    fontWeight: "600",
  },

  numberInfoPrimery: {
    color: COLORS.primary + "B2",
  },

  // @ts-ignore
  listItem: (index, lastIndex) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: index !== lastIndex ? 15 : 0,
    marginTop: 15,
    marginHorizontal: 15,
    borderColor: index !== lastIndex ? COLORS.gray : "transparent",
  }),
});

const HistoryNumbers = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [page, setPage] = useState<number>(1);
  const { items, error, loading } = useAppSelector(selectHistoryState);
  const { totalPage } = useAppSelector(selectHistoryPaginationState);

  const handleToNumber = (number: string) => {
    navigation.navigate(phonePageScreen as never, { number } as never);
  };

  const handleClearHistory = () => {
    dispatch(clearHistory())
      .unwrap()
      .then(() => dispatch(clearDataHistory()));
  };

  useEffect(() => {
    dispatch(getHistory({ page }));
  }, [page]);

  const handleClearData = () => {
    dispatch(clearDataHistory());
  };

  useShowError({ error, clearError: clearErrorHistory });

  return (
    <View style={styles.wrapper}>
      <List
        items={items}
        page={page}
        setPage={setPage}
        loading={loading}
        totalPage={totalPage}
        clearData={handleClearData}
        header={["Номер телефонну", "Доданно"]}
        keyExtractor={({ id }: IFavoriteHistoryNumber) => `${id}`}
        renderItem={({ item, index }) => (
          <View
            key={item.number}
            /* 
					// @ts-ignore */
            style={styles.listItem(index, items.length - 1)}
          >
            <TouchableOpacity
              style={styles.numberInfo}
              onPress={() => handleToNumber(item.number)}
            >
              <Text style={styles.numberInfoText}>{item.number}</Text>
              <Text style={styles.numberInfoPrimery}>{item.date}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={{ marginTop: 10, maxWidth: 200 }}>
        <Button
          onPress={handleClearHistory}
          text="Очистити історію"
          type={TypeButton.error}
        />
      </View>
    </View>
  );
};

export default HistoryNumbers;

import { View, StyleSheet, Alert } from "react-native";
import { COLORS } from "../../constants/theme";
import List from "../../components/List";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import ListItemRemove from "../../components/ListItemRemove";
import { getFavoriteNumbers, removeFavoriteNumber } from "../../store/thunk/userInfoThunk";
import {
  clearDataFavorites,
  clearErrorFavorites,
  selectFavoriteNumbersPaginationState,
  selectFavoriteNumbersState,
} from "../../store/features/userInfoSlice";
import { IFavoriteHistoryNumber } from "../../modals/userInfoModal";
import useShowError from "../../hooks/useShowError";
import { useIsFocused } from "@react-navigation/native";

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: COLORS.lightWhite,
    flex: 1,
  },
});

const FavoriteNumbers = () => {
	const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const { items, error, loading } = useAppSelector(selectFavoriteNumbersState);
  const { totalPage } = useAppSelector(selectFavoriteNumbersPaginationState);

  useEffect(() => {
    const data = {
      page,
    };
    dispatch(getFavoriteNumbers(data));

	 return () => {
		dispatch(clearDataFavorites());
	 }
  }, [page, isFocused]);

  
  

  useShowError({ error, clearError: clearErrorFavorites });

  const handleClearData = () => {
    dispatch(clearDataFavorites());
  };

  const handleRemoveFavorite = (number: string) => {
    dispatch(removeFavoriteNumber({ number }));
  };

  return (
    <View style={styles.wrapper}>
      <List
        items={items}
        page={page}
        setPage={setPage}
        loading={loading}
        totalPage={totalPage}
        clearData={handleClearData}
        header={["Номер телефонну", "Доданно", "Видалити"]}
        keyExtractor={({ id }: IFavoriteHistoryNumber) => `${id}`}
        renderItem={({ item, index }) => (
          <View style={{ paddingHorizontal: 15 }}>
            <ListItemRemove
              key={index}
              item={item}
              index={index}
              lastIndex={items.length - 1}
              handleRemove={handleRemoveFavorite}
            />
          </View>
        )}
      />
    </View>
  );
};

export default FavoriteNumbers;

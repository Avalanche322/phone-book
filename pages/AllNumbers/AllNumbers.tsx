import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import SortDropdown from "./components/SortDropdown";
import List from "../../components/List";
import { COLORS } from "../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  IAllNumbersRequest,
  INumberRow,
  TypeSort,
} from "../../modals/allNumbersModal";
import {
  clearError,
  clearNumbersData,
  selectAllNumbersPaginationState,
  selectAllNumbersState,
} from "../../store/features/allNumbersSlice";
import { getAllNumbers } from "../../store/thunk/allNumbersThunk";
import ListItem from "../../components/ListItem";
import useShowError from "../../hooks/useShowError";
import { useIsFocused } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.lightWhite,
  },
});

const AllNumbers = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const { items, error, loading } = useAppSelector(selectAllNumbersState);
  const { totalPage } = useAppSelector(selectAllNumbersPaginationState);

  const [page, setPage] = useState<number>(1);
  const [selectedSort, setSelectedSort] = useState<TypeSort>(TypeSort.Default);

  useEffect(() => {
    const data: IAllNumbersRequest = {
      page,
      typeSort: selectedSort,
    };
    dispatch(getAllNumbers(data));

	 return () => {
		dispatch(clearNumbersData());
	 }
  }, [page, selectedSort, isFocused]);

  useShowError({ error, clearError });

  const handleSelecSort = (value: TypeSort) => {
    if (value !== selectedSort) {
      setSelectedSort(value);
    } else {
      setSelectedSort(TypeSort.Default);
    }
	 setPage(1);
	 dispatch(clearNumbersData());
  };

  const handleClearData = () => {
    dispatch(clearNumbersData());
  };

  return (
    <View style={styles.container}>
      <SortDropdown
        onValueChange={handleSelecSort}
        selectedSort={selectedSort}
      />
      <List
        items={items}
        page={page}
        setPage={setPage}
        loading={loading}
        totalPage={totalPage}
        clearData={handleClearData}
        header={["Номер телефонну", "Рівень небезпеки"]}
        keyExtractor={({ number }: INumberRow) => number}
        renderItem={({ item }) => <ListItem item={item} clearData={clearNumbersData} />}
      />
    </View>
  );
};

export default AllNumbers;

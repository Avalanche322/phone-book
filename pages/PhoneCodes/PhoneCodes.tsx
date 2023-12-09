import { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import List from "../../components/List";
import { BORDER_RADIUS, COLORS } from "../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { clearData, clearError, selectNumberCodesPaginationState, selectNumberCodesState } from "../../store/features/numberCodesSlice";
import { getNumberCodes } from "../../store/thunk/numberCodesThunk";
import useShowError from "../../hooks/useShowError";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.lightWhite,
  },

  searchContainer: {
    backgroundColor: COLORS.white,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: BORDER_RADIUS.large,
  },

  input: {
    padding: 5,
    flex: 1,
    paddingLeft: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: BORDER_RADIUS.xLarge,
  },

  searchTitle: { fontWeight: "600" },

	listItemsContainer: {
		flexDirection: "row",
		borderBottomWidth: 1,
		padding: 15,
		borderColor: COLORS.gray,
	},

	listItem: {
		flex: 50
	},

	listItemPrimary: {
		flex: 50,
		color: COLORS.primary
	},
});

const PhoneCodes = () => {
	const [page, setPage] = useState<number>(1);
	const [search, setSearch] = useState<string>("");
	const dispatch = useAppDispatch();
	const {items, error, loading} = useAppSelector(selectNumberCodesState);
	const { totalCount, totalPage } = useAppSelector(selectNumberCodesPaginationState);
	
	useEffect(() => {
    const data = {
      page,
      search,
    };
    dispatch(getNumberCodes(data));
  }, [page, search]);

  useShowError({ error, clearError });

  const handleSearch = (value: string) => {
	setSearch(value);
	setPage(1);
	dispatch(clearData())
  }

  const handleClearData = () => {
	dispatch(clearData());
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchTitle}>Фільтрувати</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleSearch}
          value={search}
          placeholder="Пошук"
        />
      </View>

      <List
        items={items}
        page={page}
        setPage={setPage}
        loading={loading}
        totalPage={totalPage}
        count={totalCount}
		  clearData={handleClearData}
        header={["Назва країни", "Код"]}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <View style={styles.listItemsContainer}>
            <Text style={styles.listItem}>{item.title}</Text>
            <Text style={styles.listItemPrimary}>{item.code}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default PhoneCodes;

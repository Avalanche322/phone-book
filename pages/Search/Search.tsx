import {
  TextInput,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BORDER_RADIUS, COLORS } from "../../constants/theme";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  clearSearchData,
  clearSearchError,
  selectSearchNumbersState,
} from "../../store/features/allNumbersSlice";
import useShowError from "../../hooks/useShowError";
import { searchNumber } from "../../store/thunk/allNumbersThunk";
import ListItem from "../../components/ListItem";

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  searchSection: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: BORDER_RADIUS.xLarge,
    padding: 3,
  },
  searchIcon: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    color: COLORS.white,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 20,
    paddingLeft: 15,
  },
});

const Search = () => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const [searchNumberValue, setSearchNumberValue] = useState<string>("");
  const { items, error, loading } = useAppSelector(selectSearchNumbersState);

  const onSearch = (val: string) => {
	let numOnly = val.replace(/\D/g, "");

    if (numOnly.length) {
      dispatch(searchNumber(numOnly));
    } else {
      dispatch(clearSearchData());
    }
	setSearchNumberValue(numOnly);
  };

  useEffect(() => {
    return () => {
      setSearchNumberValue("");
    };
  }, [isFocused]);

  const getNumberWithoutCode = () => {
	if (searchNumberValue.startsWith("38")) {
		return searchNumberValue.slice(2)
	} 
	return searchNumberValue;
}

   useShowError({ error, clearError: clearSearchError });

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="+380 123 456 789"
          keyboardType="numeric"
          value={searchNumberValue}
          onChangeText={(text: string) => onSearch(text)}
        />
        {loading ? (
          <ActivityIndicator color={COLORS.secondary} size="small" />
        ) : (
          <FontAwesome name="search" size={22} style={styles.searchIcon} />
        )}
      </View>
      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          borderRadius: BORDER_RADIUS.xLarge,
          marginTop: 40,
        }}
      >
        {!Boolean(items.length) &&
          !loading &&
          !Boolean(getNumberWithoutCode().length) && (
            <Text
              style={{
                textAlign: "center",
                marginTop: 20,
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Ми знайдемо номер який ви шукаєте
            </Text>
          )}
        {Boolean(items.length) &&
          !loading &&
          items.map((item) => (
            <ListItem
              key={item.number}
              item={item}
              clearData={clearSearchData}
            />
          ))}
        {!Boolean(items.length) &&
          !loading &&
          Boolean(getNumberWithoutCode().length) && (
            <ListItem
              item={{
                number: getNumberWithoutCode(),
                level_dangerous: 0,
                typeDangerous: 0,
              }}
              clearData={clearSearchData}
            />
          )}
        {loading && <ActivityIndicator color={COLORS.secondary} size="large" />}
      </View>
    </View>
  );
};

export default Search;

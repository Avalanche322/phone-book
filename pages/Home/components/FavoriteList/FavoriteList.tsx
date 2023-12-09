import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { COLORS, BORDER_RADIUS } from "../../../../constants/theme";
import Title from "../../../../components/Title";
import {
  favoriteNumbersNumbersScreen,
  loginScreen,
} from "../../../../constants/screens";
import ListItemRemove from "../../../../components/ListItemRemove";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useCallback, useState } from "react";
import { getFavoriteNumbers, removeFavoriteNumber } from "../../../../store/thunk/userInfoThunk";
import {
  clearDataFavorites,
  clearErrorFavorites,
  selectFavoriteNumbersState,
} from "../../../../store/features/userInfoSlice";
import { getToken } from "../../../../services/storage";
import useShowError from "../../../../hooks/useShowError";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },

  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.large,
    padding: 15,
    paddingTop: 0,
    marginTop: 20,
  },

  wrapper: {
    marginTop: 25,
  },

  linkToAll: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  linkToAllText: {
    color: COLORS.secondary,
  },

  linkToAllIcon: {
    fontSize: 16,
  },

  noAuth: {
	marginTop: 15,
  },
});

const FavoriteList = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { items, error } = useAppSelector(selectFavoriteNumbersState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleToAll = () => {
    navigation.navigate(favoriteNumbersNumbersScreen as never);
  };

  const handleRemoveFavorite = (number: string) => {
    dispatch(removeFavoriteNumber({ number, page: 1, pageSize: 5 }));
  };

  const handleToAuth = () => {
    navigation.navigate(loginScreen as never);
  };

   useFocusEffect(
     useCallback(() => {
       const bootstrapAsync = async () => {
         const token = await getToken();

         if (token) {
           setIsAuthenticated(true);
           dispatch(getFavoriteNumbers({ page: 1, pageSize: 5 }));
         } else {
           setIsAuthenticated(false);
         }
       };
       bootstrapAsync();

       return () => dispatch(clearDataFavorites());
     }, [])
   );

  useShowError({ error, clearError: clearErrorFavorites });

  return (
    <View style={styles.wrapper}>
      <Title text="Останні 5 збережених номерів" />

      <View style={styles.container}>
        {Boolean(items.length) &&
          items.map((item, i) => (
            <ListItemRemove
              item={item}
              index={i}
              lastIndex={items.length - 1}
              handleRemove={handleRemoveFavorite}
              key={item.number}
            />
          ))}
        {!Boolean(items.length) && isAuthenticated && (
          <Text style={styles.noAuth}>Ви ще не зберігали номерів.</Text>
        )}
        {!Boolean(items.length) && !isAuthenticated && (
          <>
            <Text style={styles.noAuth}>
              Ви не авторизовані. Ввійдіть в систему щоб переглянути збережені.
            </Text>
            <TouchableOpacity onPress={handleToAuth}>
              <Text style={{ color: COLORS.secondary }}>Авторизація</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      {!Boolean(items.length) && isAuthenticated && (
        <TouchableOpacity style={styles.linkToAll} onPress={handleToAll}>
          <Text style={styles.linkToAllText}>Переглянути всі збереженні</Text>
          <FontAwesome
            type="font-awesome"
            name="arrow-right"
            style={[styles.linkToAllText, styles.linkToAllIcon]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FavoriteList;

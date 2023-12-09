import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { COLORS, BORDER_RADIUS } from "../../../../constants/theme";
import Title from "../../../../components/Title";
import { historyNumbersScreen, loginScreen, phonePageScreen } from "../../../../constants/screens";
import { useCallback, useState } from "react";
import { getToken } from "../../../../services/storage";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { clearDataHistory, clearErrorHistory, selectHistoryState } from "../../../../store/features/userInfoSlice";
import { getHistory } from "../../../../store/thunk/userInfoThunk";
import useShowError from "../../../../hooks/useShowError";

const styles = StyleSheet.create({
  // @ts-ignore
  listItem: (index, lastIndex) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: index !== lastIndex ? 15 : 0,
    marginTop: index !== 0 ? 15 : 0,
    borderColor: index !== lastIndex ? COLORS.gray : "transparent",
  }),

  numberInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },

  numberInfoText: {
	fontWeight: "600"
  },

  numberInfoPrimery: {
    color: COLORS.primary + "B2",
  },

  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.large,
    padding: 15,
    marginTop: 20,
  },

  wrapper: {
    marginTop: 40,
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
});

const ViwedList = () => {
  const navigation = useNavigation();
   const dispatch = useAppDispatch();
  const { items, error } = useAppSelector(selectHistoryState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleToHistory = () => {
    navigation.navigate(historyNumbersScreen as never);
  };

  const handleToNumber = (number: string) => {
    navigation.navigate(phonePageScreen as never, { number } as never);
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
          dispatch(getHistory({ page: 1, pageSize: 5 }));
        } else {
          setIsAuthenticated(false);
        }
      };
      bootstrapAsync();

      return () => dispatch(clearDataHistory());
    }, [])
  );

  useShowError({ error, clearError: clearErrorHistory });

  return (
    <View style={styles.wrapper}>
      <Title text="Останні 5 переглянутих номерів" />

      <View style={styles.container}>
        {Boolean(items.length) &&
          items.map((item, i) => (
            <View
              key={item.number}
              /* 
					// @ts-ignore */
              style={styles.listItem(i, items.length - 1)}
            >
              <TouchableOpacity
                style={styles.numberInfo}
                onPress={() => handleToNumber(item.number)}
              >
                <Text style={styles.numberInfoText}>{item.number}</Text>
                <Text style={styles.numberInfoPrimery}>{item.date}</Text>
              </TouchableOpacity>
            </View>
          ))}
        {!Boolean(items.length) && isAuthenticated && (
          <Text>Ви ще не переглядали номера.</Text>
        )}
        {!Boolean(items.length) && !isAuthenticated && (
          <>
            <Text>
              Ви не авторизовані. Ввійдіть в систему щоб переглянути історію
              номерів.
            </Text>
            <TouchableOpacity onPress={handleToAuth}>
              <Text style={{ color: COLORS.secondary }}>Авторизація</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      {!Boolean(items.length) && isAuthenticated && (
        <TouchableOpacity style={styles.linkToAll} onPress={handleToHistory}>
          <Text style={styles.linkToAllText}>Переглянути всю історію</Text>
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

export default ViwedList;

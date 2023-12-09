import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  addFavoriteNumber,
  removeFavoriteNumber,
} from "../../../../store/thunk/numberInfoThunk";
import { selectNumberInfoState } from "../../../../store/features/numberInfoSlice";
import { getToken } from "../../../../services/storage";
import { PhonePageRouteProp } from "../../../../modals/phonePageModal";
import { COLORS } from "../../../../constants/theme";
import { regexDate } from "../../../../constants/regex";

const styles = StyleSheet.create({
  bth: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});

const ToggleFavorite = () => {
  const route = useRoute<PhonePageRouteProp>();
  const navigation = useNavigation();
  const { number } = route.params;
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectNumberInfoState);

  const handleAddFavorite = () => {
    dispatch(addFavoriteNumber({ number }));
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFavoriteNumber({ number }));
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const token = await getToken();

      if (token && regexDate.test(data.last_date_mark)) {
        if (data.isFavoriteNum) {
          navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity
                onPress={handleRemoveFavorite}
                style={styles.bth}
              >
                <FontAwesome
                  type="font-awesome"
                  name="bookmark"
                  style={{ fontSize: 24 }}
                />
              </TouchableOpacity>
            ),
          });
        } else {
          navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity onPress={handleAddFavorite} style={styles.bth}>
                <FontAwesome
                  type="font-awesome"
                  name="bookmark-o"
                  style={{ fontSize: 24 }}
                />
              </TouchableOpacity>
            ),
          });
        }
      }
    };
    bootstrapAsync();
  }, [data, navigation]);

  return <></>;
};

export default ToggleFavorite;

import { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, StyleSheet } from "react-native";

import { COLORS } from "../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { PhonePageRouteProp } from "../../modals/phonePageModal";
import { clearData, selectNumberInfoState } from "../../store/features/numberInfoSlice";
import { addNumberHistory, getNumberInfo } from "../../store/thunk/numberInfoThunk";
import Info from "./components/Info/Info";
import ToggleFavorite from "./components/ToggleFavorite";
import { getToken } from "../../services/storage";
import FormComment from "./components/FormComment";
import Comments from "./components/Comments";
import { regexDate } from "../../constants/regex";

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: COLORS.lightWhite,
  },
});

const PhonePage = ({
  route,
}: {
  route: PhonePageRouteProp;
}) => {
  const { number } = route.params;
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector(selectNumberInfoState);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const token = await getToken();

      if (token) {
        setIsAuthenticated(true);
        if (regexDate.test(data.last_date_mark)) {
          dispatch(addNumberHistory(number));
        }
      } else {
        setIsAuthenticated(false);
      }
    };

	 dispatch(getNumberInfo(number))
     .unwrap()
     .then(() => {
       bootstrapAsync();
     });

    return () => {
      dispatch(clearData());
    };
  }, [number]);
  
  return (
    <ScrollView style={styles.wrapper}>
      <ToggleFavorite />
      <Info />
      {isAuthenticated && <FormComment />}
      {regexDate.test(data.last_date_mark) && !loading && <Comments />}
      {loading && <ActivityIndicator size="large" />}
    </ScrollView>
  );
};

export default PhonePage;

import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import List from "../../components/List";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { BORDER_RADIUS, COLORS } from "../../constants/theme";
import {
  getColorByTypeDangerous,
  getTextByTypeDangerous,
} from "../../helper/helper";
import { useNavigation } from "@react-navigation/native";
import { phonePageScreen } from "../../constants/screens";
import { ICommentHistory } from "../../modals/userInfoModal";
import { getMyComments } from "../../store/thunk/userInfoThunk";
import {
  clearDataMyComments,
  clearErrorMyComments,
  selectMyCommentsPaginationState,
  selectMyCommentsState,
} from "../../store/features/userInfoSlice";
import useShowError from "../../hooks/useShowError";

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: COLORS.lightWhite,
    flex: 1,
  },

  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },

  text: {
    flex: 1,
    maxWidth: 120,
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

  // @ts-ignore */
  typeDangerous: (type) => ({
    backgroundColor: getColorByTypeDangerous(type) + "4D",
    color: getColorByTypeDangerous(type),
    borderRadius: BORDER_RADIUS.xLarge,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontWeight: 600,
  }),
});

const MyComments = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [page, setPage] = useState<number>(1);
  const { items, loading, error } = useAppSelector(selectMyCommentsState);
  const { totalPage } = useAppSelector(selectMyCommentsPaginationState);

  const handleToNumber = (number: string) => {
    navigation.navigate(phonePageScreen as never, { number } as never);
  };

  useEffect(() => {
    dispatch(getMyComments({ page }));
  }, [page]);

  const handleClearData = () => {
    dispatch(clearDataMyComments());
  };

  useShowError({ error, clearError: clearErrorMyComments });

  return (
    <View style={styles.wrapper}>
      <List
        items={items}
        page={page}
        setPage={setPage}
        loading={loading}
        totalPage={totalPage}
        clearData={handleClearData}
        header={["Тип", "Коментар", "Створенно"]}
        keyExtractor={({ id }: ICommentHistory) => `${id}`}
        renderItem={({
          item,
          index,
        }: {
          item: ICommentHistory;
          index: number;
        }) => (
          <View
            key={item.id}
            /* 
					// @ts-ignore */
            style={styles.listItem(index, items.length - 1)}
          >
            <TouchableOpacity
              style={styles.commentContainer}
              onPress={() => handleToNumber(item.number)}
            >
              <Text
                // @ts-ignore */
                style={styles.typeDangerous(item.typeDangerous)}
              >
                {getTextByTypeDangerous(item.typeDangerous)}
              </Text>
              <Text numberOfLines={1} style={styles.text}>
                {item.comment}
              </Text>
              <Text>{item.date}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default MyComments;

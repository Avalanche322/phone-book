import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ICommentNumberInfo } from "../../../../../../modals/numberInfoModal";
import { BORDER_RADIUS, COLORS } from "../../../../../../constants/theme";
import {
  getColorByTypeDangerous,
  getTextByTypeDangerous,
} from "../../../../../../helper/helper";
import { getToken } from "../../../../../../services/storage";
import {
  loginScreen,
  requestDeleteComment,
} from "../../../../../../constants/screens";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ColorByTypeDangerous } from "../../../../../../modals/allNumbersModal";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import { deleteComment } from "../../../../../../store/thunk/numberInfoThunk";
import useShowError from "../../../../../../hooks/useShowError";
import { clearErrorComments, selectCommentsState } from "../../../../../../store/features/numberInfoSlice";
import { useEffect, useState } from "react";

type Props = {
  item: ICommentNumberInfo;
  index: number;
  lastIndex: number;
};

const styles = StyleSheet.create({
  // @ts-ignore
  listItem: ({ index, lastIndex, createdByUser }) => ({
    position: "relative",
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingTop: 15,
    paddingHorizontal: 15,
    borderColor: index !== lastIndex ? COLORS.gray : "transparent",
    backgroundColor: createdByUser
      ? COLORS.secondary + "1D"
      : ColorByTypeDangerous.Default,
  }),

  additionInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  date: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  // @ts-ignore */
  typeDangerous: (type) => ({
    backgroundColor: getColorByTypeDangerous(type) + "4D",
    color: getColorByTypeDangerous(type),
    borderRadius: BORDER_RADIUS.xLarge,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontWeight: 600,
  }),

  containerTrash: {
    backgroundColor: COLORS.gray,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 100,
  },

  trashIcon: {
    fontSize: 14,
  },
});

const ListItem = ({ item, index, lastIndex }: Props) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { number } = route.params as never;
  const { loading } = useAppSelector(selectCommentsState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleDeleteComment = () => {
    if (isAuthenticated) {
      if (item.createdByUser) {
        dispatch(deleteComment({ id: item.id, number }));
      } else {
        navigation.navigate(
          requestDeleteComment as never,
          { number, item } as never
        );
      }
    } else {
      navigation.navigate(loginScreen as never);
    }
  };

  useEffect(() => {
	const bootstrapAsync = async () => {
    const token = await getToken();

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };
  bootstrapAsync();
  }, [])

  return (
    <View
      // @ts-ignore
      style={styles.listItem({
        index,
        lastIndex,
        createdByUser: item.createdByUser,
      })}
    >
      <Text>{item.comment}</Text>
      <View style={styles.additionInfo}>
        <View style={styles.box}>
          <Text
            // @ts-ignore */
            style={styles.typeDangerous(item.typeDangerous)}
          >
            {getTextByTypeDangerous(item.typeDangerous)}
          </Text>
          <View style={styles.date}>
            <FontAwesome type="font-awesome" name="clock-o" />
            <Text>{item.date}</Text>
          </View>
        </View>
        {isAuthenticated && <TouchableOpacity
          style={styles.containerTrash}
          onPress={handleDeleteComment}
          disabled={loading}
        >
          <FontAwesome
            style={styles.trashIcon}
            type="font-awesome"
            name="trash"
          />
        </TouchableOpacity>}
      </View>
    </View>
  );
};

export default ListItem;

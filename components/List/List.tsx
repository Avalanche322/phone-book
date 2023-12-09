import { useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import { COLORS, BORDER_RADIUS } from "../../constants/theme";

type Props = {
  count?: number;
  items: Array<any>;
  header?: Array<string>;
  renderItem: ListRenderItem<any>;
  keyExtractor: (item: any, index: number) => string;
  setPage: (val: number) => void;
  page: number;
  totalPage: number;
  loading: boolean;
  clearData: any;
};

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
  },

  listHeaderWrapper: {
    flexDirection: "row",
    padding: 15,
  },

  listHeaderTitles: {
    flex: 50,
    fontWeight: "600",
  },

  listContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    borderRadius: BORDER_RADIUS.large,
  },

  count: {
    fontWeight: "600",
    padding: 15,
  },

  noData: {
    marginTop: 20,
    alignItems: "center",
  },

  footer: {
    marginTop: 20,
    alignItems: "center",
  },
});

const renderEmpty = ({
  loading,
  lengthItems,
}: {
  loading: boolean;
  lengthItems: number}) => (
  <>
    {!loading && !lengthItems && (
      <View style={styles.noData}>
        <Text style={{ color: COLORS.secondary }}>Нема даних :(</Text>
      </View>
    )}
  </>
);

const renderFooter = ({
  loading,
  page,
  totalPage,
}: {
  loading: boolean;
  page: number;
  totalPage: number;
}) => (
  <View style={styles.footer}>
    {loading && <ActivityIndicator color={COLORS.secondary} size="large" />}
    {page === totalPage && (
      <Text style={{ color: COLORS.secondary }}>Всі данні завантажені</Text>
    )}
  </View>
);

const List = ({
  items,
  count,
  header = [],
  keyExtractor,
  renderItem,
  setPage,
  page,
  totalPage,
  loading,
  clearData
}: Props) => {
  const fetchMoreData = () => {
    if (page + 1 <= totalPage) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    return () => {
      clearData();
    };
  }, []);

  return (
    <View style={styles.listWrapper}>
      {Boolean(header.length) && (
        <View style={styles.listHeaderWrapper}>
          {header.map((text) => (
            <Text key={text} style={styles.listHeaderTitles}>
              {text}
            </Text>
          ))}
        </View>
      )}
      <View style={styles.listContainer}>
        <FlatList
          data={items}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreData}
          ListEmptyComponent={() =>
            renderEmpty({ loading, lengthItems: items.length })
          }
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListFooterComponent={() =>
            renderFooter({
              page,
              totalPage,
              loading,
            })
          }
        />
        {typeof count === "number" && (
          <Text style={styles.count}>Кількість: {count}</Text>
        )}
      </View>
    </View>
  );
};
 
export default List;
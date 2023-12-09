import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Title from "../../../../components/Title";
import { COLORS, BORDER_RADIUS } from "../../../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { historyNumbersScreen, favoriteNumbersNumbersScreen, historyCommentsScreen } from "../../../../constants/screens";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: BORDER_RADIUS.xLarge,
    marginBottom: 20,
  },

  link: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.gray,
    paddingBottom: 15,
    marginTop: 15,
  },

  linkFirts: {
    marginTop: 0,
  },

  linkLast: {
    borderColor: "transparent",
    paddingBottom: 0,
  },

  linkIcon: {
    fontSize: 20,
    color: COLORS.primary,
  },
});

const MainLinks = () => {
	const navigation = useNavigation();

	const handleGoToPage = (page: string) => {
      navigation.navigate(page as never);
    };


	return (
    <>
      <Title text="Головне" />
      <View style={[styles.container, { marginTop: 10 }]}>
        <TouchableOpacity
          onPress={() => handleGoToPage(favoriteNumbersNumbersScreen)}
          style={[styles.link, styles.linkFirts]}
        >
          <FontAwesome
            type="font-awesome"
            name="save"
            style={styles.linkIcon}
          />
          <Text>Список збереженних номерів</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleGoToPage(historyNumbersScreen)}
          style={styles.link}
        >
          <FontAwesome
            type="font-awesome"
            name="history"
            style={styles.linkIcon}
          />
          <Text>Історія переглядів номерів</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleGoToPage(historyCommentsScreen)}
          style={[styles.link, styles.linkLast]}
        >
          <FontAwesome
            type="font-awesome"
            name="commenting"
            style={styles.linkIcon}
          />
          <Text>Історія коментарів</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
 
export default MainLinks;
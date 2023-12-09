import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Title from "../../../../components/Title";
import { BORDER_RADIUS, COLORS } from "../../../../constants/theme";
import { gitHubProfile, linkedInProfile } from "../../../../constants/links";

const styles = StyleSheet.create({
  link: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.gray,
    paddingBottom: 15,
    marginTop: 15,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: BORDER_RADIUS.xLarge,
    marginBottom: 20,
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

const FollowLinks = () => {

  const handleGoToLink = async (link: string) => {
    await Linking.openURL(link);
  };
  
	return (
    <>
      <Title text="Корисні посилання" />
      <View style={[styles.container, { marginTop: 10 }]}>
        <TouchableOpacity
          style={[styles.link, styles.linkFirts]}
          onPress={() => handleGoToLink(linkedInProfile)}
        >
          <FontAwesome
            type="font-awesome"
            name="linkedin"
            style={styles.linkIcon}
          />
          <Text>LinkedIn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.link, styles.linkLast]}
          onPress={() => handleGoToLink(gitHubProfile)}
        >
          <FontAwesome
            type="font-awesome"
            name="github"
            style={styles.linkIcon}
          />
          <Text>GitHub</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
 
export default FollowLinks;
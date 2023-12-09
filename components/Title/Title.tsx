import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS } from "../../constants/theme";

type Props = {
  text: string;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },

  icon: {
    fontSize: 15,
    color: COLORS.primary,
  },
});

const Title = ({text}: Props) => {
	return (
    <View style={styles.titleContainer}>
      <FontAwesome type="font-awesome" name="circle" style={styles.icon} />
      <Text style={styles.title}>{text}</Text>
    </View>
  );
}
 
export default Title;
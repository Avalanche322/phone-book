import { View, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "../../constants/theme";
import Chart from "./components/Chart";
import FavoriteList from "./components/FavoriteList";
import ViwedList from "./components/ViwedList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Home = () => {
	return (
    <ScrollView style={{ padding: 20, backgroundColor: COLORS.lightWhite }}>
      <View style={styles.container}>
        <FavoriteList />
        <ViwedList />
        <Chart/>
      </View>
    </ScrollView>
  );
}
 
export default Home;
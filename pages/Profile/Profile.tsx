import { ScrollView, StyleSheet, View } from "react-native";

import { COLORS } from "../../constants/theme";
import UserInfo from "./components/UserInfo";
import MainLinks from "./components/MainLinks";
import FollowLinks from "./components/FollowLinks";
import { removeToken } from "../../services/storage";
import Button from "../../components/Button";
import { TypeButton } from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { homeScreen } from "../../constants/screens";



const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: COLORS.lightWhite,
  },
});

const Profile = () => {
	const navigation = useNavigation();

	const handleExit = async () => {
		await removeToken()
		navigation.navigate(homeScreen as never);
		
	}

  return (
    <ScrollView style={styles.wrapper}>
      <UserInfo />
      <MainLinks />
      <FollowLinks />
      <View style={{marginTop: 10, maxWidth: 200}}>
        <Button onPress={handleExit} text="Вихід з облікового запису" type={TypeButton.error} />
      </View>
    </ScrollView>
  );
};

export default Profile;

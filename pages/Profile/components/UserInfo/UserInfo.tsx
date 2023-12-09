import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";

import { COLORS, BORDER_RADIUS } from "../../../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { getUserInfo } from "../../../../store/thunk/userInfoThunk";
import { clearDataUser, clearErrorUser, selectUserInfoState } from "../../../../store/features/userInfoSlice";
import useShowError from "../../../../hooks/useShowError";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: BORDER_RADIUS.xLarge,
    marginBottom: 20,
  },

  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  initial: {
    fontSize: 20,
    color: "white",
  },

  profile: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },

  profileName: {
    fontSize: 16,
    fontWeight: "600",
  },

  profileEmail: {
    fontSize: 16,
  },

  profileInfo: {
    gap: 5,
  },
});

const UserInfo = () => {
	const { username, email, loading, error } =
    useAppSelector(selectUserInfoState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUserInfo());

		return () => {
			dispatch(clearDataUser());
		}
	}, [])
	

	useShowError({ error, clearError: clearErrorUser });

	return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.circle}>
          <Text style={styles.initial}>{username.substring(0, 1).toUpperCase()}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{username}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
        </View>
      </View>
    </View>
  );
}
 
export default UserInfo;
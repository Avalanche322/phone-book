import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { login } from "../../store/thunk/userInfoThunk";
import { homeScreen, registrationScreen } from "../../constants/screens";
import { COLORS, BORDER_RADIUS } from "../../constants/theme";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {
  clearErrorUser,
  selectUserInfoState,
} from "../../store/features/userInfoSlice";
import useShowError from "../../hooks/useShowError";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 20,
    width: "80%",
    borderRadius: BORDER_RADIUS.xLarge,
  },

  wrapper: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
  },

  link: {
    textAlign: "center",
    color: COLORS.secondary,
  },

  errorInput: {
    marginTop: 5,
    marginLeft: 10,
    color: COLORS.red,
  },

  buttonDisabled: {
    opacity: 0.5,
  },
});

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Неправильний формат електронної пошти";
  }
  return null;
};

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    return "Пароль повинен містити щонайменше 6 символів, одну велику літеру та одну цифру";
  }
  return null;
};

const Login = () => {
	const navigation = useNavigation();
	const dispatch = useAppDispatch();
	const { error, loading } = useAppSelector(selectUserInfoState);
	
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorInput, setErrorInput] = useState<{
    email: string | null;
    password: string | null;
  }>({ email: null, password: null });

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setErrorInput({
      ...errorInput,
      email: validateEmail(text),
    });
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setErrorInput({
      ...errorInput,
      password: validatePassword(text),
    });
  };

  const onSubmit = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrorInput({ email: emailError, password: passwordError });
    if (!emailError && !passwordError) {
      dispatch(login({ email, password }))
        .unwrap()
        .then(() => {
          navigation.navigate(homeScreen as never);
        })
		  .catch(() => {})
    }
  };

	const handleToRegistration = () => {
		navigation.navigate(registrationScreen as never);
	}

	useShowError({ error, clearError: clearErrorUser });

	return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Input
            placeholder="Пошта"
            onChangeText={handleEmailChange}
            value={email}
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          {errorInput.email && (
            <Text style={styles.errorInput}>{errorInput.email}</Text>
          )}
        </View>
        <View>
          <Input
            placeholder="Пароль"
            onChangeText={handlePasswordChange}
            value={password}
            autoCapitalize="none"
            secureTextEntry={true}
          />
          {errorInput.password && (
            <Text style={styles.errorInput}>{errorInput.password}</Text>
          )}
        </View>
        <View
          style={{
            marginVertical: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: 150 }}>
            <Button
              text="Вхід"
              onPress={onSubmit}
              disabled={
                Boolean(validateEmail(email)) ||
                Boolean(validatePassword(password))
              }
            />
          </View>
        </View>
        <TouchableOpacity onPress={handleToRegistration}>
          <Text style={styles.link}>Немаєте облікового запису?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
 
export default Login;
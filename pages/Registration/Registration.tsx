import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { register } from "../../store/thunk/userInfoThunk";
import { homeScreen, loginScreen } from "../../constants/screens";
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
    backgroundColor: COLORS.lightWhite,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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

const validateRepeatPassword = (repeatPassword: string, password: string) => {
  if (!password.trim().length) {
    return "Будь ласка, повторіть свій пароль";
  }
  if (repeatPassword !== password) {
    return "Паролі не збігаються";
  }
  return null;
};

const validateUsername = (username: string) => {
  if (!username.trim().length) {
    return "Будь ласка, введіть ім'я користувача";
  }
  return null;
};

const Registration = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector(selectUserInfoState);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [errorInput, setErrorInput] = useState<{
    email: string | null;
    password: string | null;
    username: string | null;
    passwordRepeat: string | null;
  }>({ email: null, password: null, username: null, passwordRepeat: null });

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

  const handlePasswordAgainChange = (text: string) => {
    setPasswordRepeat(text);
    setErrorInput({
      ...errorInput,
      passwordRepeat: validateRepeatPassword(text, password),
    });
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    setErrorInput({
      ...errorInput,
      username: validateUsername(text),
    });
  };

  const onSubmit = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const passwordRepeatError = validateRepeatPassword(
      password,
      passwordRepeat
    );
    const usernameError = validateUsername(username);
    setErrorInput({
      email: emailError,
      password: passwordError,
      username: usernameError,
      passwordRepeat: passwordRepeatError,
    });
    if (
      !emailError &&
      !passwordError &&
      !passwordRepeatError &&
      !usernameError
    ) {
      dispatch(register({ email, password, username }))
        .unwrap()
        .then(() => {
          navigation.navigate(homeScreen as never);
        })
        .catch(() => {});
    }
  };

  const handleToLogin = () => {
    navigation.navigate(loginScreen as never);
  };

  useShowError({ error, clearError: clearErrorUser });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={{ marginBottom: 20 }}>
            <Input
              placeholder="Ім'я"
              onChangeText={handleUsernameChange}
              value={username}
              autoCapitalize="none"
            />
            {errorInput.username && (
              <Text style={styles.errorInput}>{errorInput.username}</Text>
            )}
          </View>
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
          <View style={{ marginBottom: 20 }}>
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
          <View>
            <Input
              placeholder="Повторити пароль"
              onChangeText={handlePasswordAgainChange}
              value={passwordRepeat}
              autoCapitalize="none"
              secureTextEntry={true}
            />
            {errorInput.passwordRepeat && (
              <Text style={styles.errorInput}>{errorInput.passwordRepeat}</Text>
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
                text="Реєстрація"
                onPress={onSubmit}
                disabled={
                  Boolean(validateEmail(email)) ||
                  Boolean(validatePassword(password)) ||
                  Boolean(validateUsername(username)) ||
                  Boolean(validateRepeatPassword(password, passwordRepeat))
                }
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleToLogin}>
            <Text style={styles.link}>Вже маєте обліковий запис?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Registration;

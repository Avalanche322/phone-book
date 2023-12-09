import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { BORDER_RADIUS, COLORS } from "../../constants/theme";

const styles = StyleSheet.create({

  input: {
    borderRadius: BORDER_RADIUS.xLarge,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: COLORS.lightWhite,
  },
});

const Input = (props: TextInputProps) => {
  return <TextInput {...props} style={[styles.input, props.style]} />;
};

export default Input;

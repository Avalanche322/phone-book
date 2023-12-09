import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, TouchableOpacityProps } from "react-native";
import { BORDER_RADIUS, COLORS } from "../../constants/theme";

export enum TypeButton {
  primary = "primary",
  secondary = "secondary",
  error = "error",
}

type Props = {
  type?: TypeButton;
  text: string;
  onPress: (event: GestureResponderEvent) => void;
};

const styles = StyleSheet.create({
  buttton: {
    borderRadius: BORDER_RADIUS.xLarge,
    padding: 10,
  },

  primary: {
    backgroundColor: COLORS.primary,
  },

  secondary: {
    backgroundColor: COLORS.secondary,
  },

  error: {
    backgroundColor: COLORS.red,
  },

  text: {
    color: COLORS.white,
    textAlign: "center",
  },

  disabledBtn: {
	opacity: 0.6
  }
});

const Button = ({
  type = TypeButton.primary,
  text,
  ...props
}: Props & TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      style={[
        styles[type],
        styles.buttton,
        props.disabled && styles.disabledBtn,
      ]}
      {...props}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
 
export default Button;
const COLORS = {
  primary: "#e91e63",
  secondary: "#ff9100",

  green: "#4caf50",
  red: "#c62828",
  blue: "#2196f3",

  gray: "#e0e0e0",
  white: "#f5f5f5",
  lightWhite: "#FAFAFC",

  yellow: "#ffeb3b"
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

const BORDER_RADIUS = {
	xSmall: 2,
	small: 4,
	medium: 8,
	large: 16,
	xLarge: 20,
}

export { COLORS, SIZES, SHADOWS, BORDER_RADIUS };

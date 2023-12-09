import { phonePageScreen } from './../constants/screens';
import { RouteProp, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  PhonePage: { number: string };
  // other screens...
};

export type PhonePageRouteProp = RouteProp<RootStackParamList, phonePageScreens>;
export type PhonePageNavigationProp = NavigationProp<RootStackParamList, phonePageScreen>;

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Provider } from "react-redux";


import Home from "./pages/Home";
import PhoneCodes from "./pages/PhoneCodes";
import Profile from "./pages/Profile";
import AllNumbers from "./pages/AllNumbers";
import { store } from "./store";
import PhonePage from "./pages/PhonePage";
import { COLORS } from "./constants/theme";
import HistoryNumbers from "./pages/HistoryNumbers";
import FavoriteNumbers from "./pages/FavoriteNumbers";
import { useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import { getToken } from "./services/storage";
import Registration from "./pages/Registration";
import { homeScreen, phoneCodesScreen, allNumbersScreen, profileScreen, loginScreen, registrationScreen, phonePageScreen, historyNumbersScreen, favoriteNumbersNumbersScreen, requestDeleteComment, historyCommentsScreen, searchScreen } from "./constants/screens";
import { LogBox } from "react-native";
import RequestDeleteComment from "./pages/RequestDeleteComment";
import MyComments from "./pages/MyComments";
import Search from "./pages/Search";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PagesTab() {
	const navigation = useNavigation();

  const redirectUserProfile = async (e: any) => {
		e.preventDefault();
		const token = await getToken();
		if (token) {
			navigation.navigate(profileScreen as never);
		} else {
			navigation.navigate(loginScreen as never);
		}
  }

	return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        headerTintColor: COLORS.primary,
        headerTitleAlign: "center",
        tabBarStyle: {
          height: 60,
        },
        tabBarItemStyle: {
          margin: 5,
        },
      }}
    >
      <Tab.Screen
        name={homeScreen}
        component={Home}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name={phoneCodesScreen}
        component={PhoneCodes}
        options={{
          headerTitle: "Телефоні коди",
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="phone" color={color} />,
        }}
      />
      <Tab.Screen
        name={searchScreen}
        component={Search}
        options={{
          unmountOnBlur: true,
          headerTitle: searchScreen,
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tab.Screen
        name={allNumbersScreen}
        component={AllNumbers}
        options={{
          unmountOnBlur: true,
          headerTitle: "Телефоні номери",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <Tab.Screen
        name={profileScreen}
        component={Profile}
        listeners={() => ({
          tabPress: redirectUserProfile,
        })}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-circle" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const bootstrapAsync = async () => {
    const token = await getToken();

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer onStateChange={bootstrapAsync}>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            headerTintColor: COLORS.primary,
          }}
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="PagesTab"
            component={PagesTab}
          />
          {isAuthenticated ? (
            <>
              <Stack.Screen name={profileScreen} component={Profile} />
            </>
          ) : (
            <>
              <Stack.Screen name={loginScreen} component={Login} />
              <Stack.Screen
                name={registrationScreen}
                component={Registration}
              />
            </>
          )}
          <Stack.Screen
            name={phonePageScreen}
            options={({ route }) => ({
              // @ts-ignore */
              title: route.params?.number,
            })}
            /* 
					// @ts-ignore */
            component={PhonePage}
          />
          <Stack.Screen
            name={historyNumbersScreen}
            component={HistoryNumbers}
            options={() => ({
              title: "Історія переглядів номерів",
            })}
          />
          <Stack.Screen
            name={favoriteNumbersNumbersScreen}
            component={FavoriteNumbers}
            options={() => ({
              title: "Збереженні номера",
            })}
          />
          <Stack.Screen
            name={requestDeleteComment}
            component={RequestDeleteComment}
            options={({ route }) => ({
              // @ts-ignore */
              title: route.params?.number,
            })}
          />
          <Stack.Screen
            name={historyCommentsScreen}
            component={MyComments}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

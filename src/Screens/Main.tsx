import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./Auth/SignIn";
import Signup from "./Auth/Signup";
import i18n from "../Constants/i18n";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Main/Home";
import Search from "./Main/Search";
import YourLibrary from "./Main/YourLibrary";
import Login from "./Auth/Login";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
import Profile from "./Profile/Profile";
import EditProfile from "./Profile/EditProfile";

export default function Main() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen
          name="SignUp"
          component={Signup}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#121212" },
            title: i18n.t("createAccount"),
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            headerTitleStyle: { fontSize: 16 },
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#121212" },
            title: "",
            headerTitleAlign: "center",
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen name="HomeTabs" component={BottomTabs} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: "#121212" }} />
        ),
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          borderTopWidth: 0,
        },
        title: i18n.t(route.name),
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "YourLibrary") {
            iconName = focused ? "bookmarks" : "bookmarks-outline";
          }

          //@ts-ignore
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#999999",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="YourLibrary" component={YourLibrary} />
    </Tab.Navigator>
  );
}

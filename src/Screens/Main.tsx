import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./Auth/SignIn";
import Signup from "./Auth/Signup";
import i18n from "../constants/i18n";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Main/Home";
import Search from "./Main/Search";
import YourLibrary from "./Main/YourLibrary";
import Login from "./Auth/Login";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Main() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={Signup} options={{headerShown: true, headerStyle: {backgroundColor: "#000000",}, title: i18n.t("createAccount"), headerTitleAlign: "center", headerTintColor: "#fff", headerTitleStyle: { fontSize: 16 }}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: true, headerStyle: {backgroundColor: "#000000",}, title: "", headerTitleAlign: "center", headerTintColor: "#fff"}}/>
        <Stack.Screen name="Home" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (  
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if(route.name === "Home"){
            iconName = focused ? "home" : "home-outline"
          } else if(route.name === "Search"){
            iconName = focused ? "search" : "search-outline";
          } else if(route.name === "YourLibrary"){
            iconName = focused ? "Bookmarks" : "Bookmarks-outline"
          }

        //@ts-ignore
        return <Ionicons name={iconName} size={size} color={color}/>;
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#999999",
      })}
      

      
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search}  />
      <Tab.Screen name="YourLibrary" component={YourLibrary}  />
    </Tab.Navigator>
  );
}

import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";
import { height, width } from "../../Constants/measures";
import { useNavigation } from "@react-navigation/native";
import i18n from "../../Constants/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserLogin = async () => {
      const user = await AsyncStorage.getItem("@user_login");
      if (user) {
        navigation.navigate("HomeTabs");
      } else {
        setIsLoading(false);
      }
    };

    checkUserLogin();
  }, [navigation]);

  if (isLoading) {
    return (
      <LinearGradient
        colors={["#121212", "#121212", "#121212", "#121212"]}
        style={styles.container}
      />
    );
  }

  return (
    <LinearGradient
      colors={["#4A4A4A", "#2E2E2E", "#1A1A1A", "#121212"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.35 }}
    >
      <View style={styles.logoView}>
        <Image
          style={styles.logo}
          source={require("../../Assets/spotify-white-icon.jpg")}
        />
        <Text style={styles.text}>Millions of songs. Free on Spotify.</Text>
      </View>

      <View style={styles.buttonView}>
        <Button
          contentStyle={styles.button}
          mode="contained"
          buttonColor="#1DB954"
          textColor="#000000"
          onPress={() => navigation.navigate("SignUp")}
        >
          {i18n.t("signUp")}
        </Button>
        <Button
          icon="cellphone"
          contentStyle={styles.button}
          labelStyle={styles.labelButton}
          mode="outlined"
          textColor="#fff"
          onPress={() => console.log("Pressed")}
        >
          {i18n.t("continueWithPhone")}
        </Button>
        <Button
          icon="google"
          contentStyle={styles.button}
          labelStyle={styles.labelButton}
          mode="outlined"
          textColor="#fff"
          onPress={() => console.log("Pressed")}
        >
          {i18n.t("continueWithGoogle")}
        </Button>
        <Button
          icon="facebook"
          contentStyle={styles.button}
          labelStyle={styles.labelButton}
          mode="outlined"
          textColor="#fff"
          onPress={() => console.log("Pressed")}
        >
          {i18n.t("continueWithFacebook")}
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate("Login")}
          textColor="#ffffff"
          style={styles.loginButton}
          rippleColor="transparent"
        >
          {i18n.t("logIn")}
        </Button>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoView: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.65,
    gap: 25,
  },
  logo: {
    width: 75,
    height: 75,
  },
  buttonView: {
    alignContent: "center",
    justifyContent: "center",
    marginBottom: height * -0.16,
    gap: 15,
  },
  button: {
    height: height * 0.05,
    width: width * 0.8,
  },
  labelButton: {
    fontSize: 17,
  },
  loginButton: {
    padding: 0,
    backgroundColor: "transparent",
    elevation: 0,
  },
});

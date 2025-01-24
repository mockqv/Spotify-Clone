import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";
import { height, width } from "../../Constants/measures";
import { useNavigation } from "@react-navigation/native";
import i18n from "../../Constants/i18n";

export default function SignIn() {
  const navigation = useNavigation();

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
          //@ts-ignore
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
          //@ts-ignore
          onPress={() => navigation.navigate("Login")}
          textColor="#ffffff"
        >
          {i18n.t("logIn")}
        </Button>
      </View>

      <StatusBar style="dark" />
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
});

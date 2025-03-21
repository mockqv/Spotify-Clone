import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import i18n from "../../Constants/i18n";
import { height, width } from "../../Constants/measures";
import { useNavigation } from "@react-navigation/native";
import signInWithEmail from "../../../http/Auth/signInEmail";

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const navigation = useNavigation();

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isButtonDisabled = user.email.trim() === "" || user.password.trim() === "";

  const tryLogin = async (user: User) => {
    try{
        const response = await signInWithEmail(user);
        if (response) {
          //@ts-ignore
          navigation.navigate("HomeTabs");
          return;
        }
        return;
    } catch (err) {
        //Do nothing
    }
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputView}>
        <Text style={styles.text} children={i18n.t("EmailOrUser")} />
        <TextInput
          value={user.email}
          onChangeText={(value) =>
            setUser((prevState) => ({ ...prevState, email: value }))
          }
          mode="flat"
          style={styles.input}
          textColor="#FFFFFF"
          cursorColor="#FFFFFF"
          placeholderTextColor="#AAAAAA"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.text} children={i18n.t("Password")} />
        <TextInput
          value={user.password}
          onChangeText={(value) =>
            setUser((prevState) => ({ ...prevState, password: value }))
          }
          mode="flat"
          style={styles.input}
          textColor="#FFFFFF"
          cursorColor="#FFFFFF"
          placeholderTextColor="#AAAAAA"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
              color="#FFFFFF"
            />
          }
        />
        <View style={styles.buttonView}>
          <Button
            buttonColor={isButtonDisabled ? "#AAAAAA" : "#1DB954"}
            textColor={isButtonDisabled ? "transparent" : "#FFFFFF"}
            mode="contained"
            children={i18n.t("submit")}
            disabled={isButtonDisabled}
            onPress={() => tryLogin(user)}
            style={styles.button}
          />
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#121212",
    gap: width * 0.2,
    marginTop: height * -0.03,
  },
  inputView: {
    width: width * 0.9,
    gap: 7,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    backgroundColor: "#333333",
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 10,
    height: 50,
  },
  buttonView: {
    marginTop: height * 0.01,
    alignItems: "center",
  },
  button: {
    width: width * 0.25,
  },
});

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Text, TextInput, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import i18n from "../../Constants/i18n";
import { height, width } from "../../Constants/measures";
import signUpWithEmail from "../../../http/Auth/signUpEmail";
import { useNavigation } from "@react-navigation/native";

interface User {
  email: string;
  password: string;
}

export default function Signup() {
  const navigation = useNavigation();

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isEmailStepDisabled = user.email.trim() === "";
  const isPasswordStepDisabled = user.password.trim() === "";

  const tryRegister = async (user: User) => {
    try{
      const response = await signUpWithEmail(user);
      if (response) {
        //@ts-ignore
        navigation.navigate("SignIn");
        return;
      }
    } catch (err){
      console.log(err);
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      {step === 1 ? (
        <View style={styles.inputView}>
          <Text style={styles.text} children={i18n.t("whatEmail")} />
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
          <Text style={styles.subText} children={i18n.t("confirmEmail")} />
          <View style={styles.buttonView}>
            <Button
              buttonColor={isEmailStepDisabled ? "#AAAAAA" : "#1DB954"}
              textColor={isEmailStepDisabled ? "transparent" : "#FFFFFF"}
              mode="contained"
              children={i18n.t("next")}
              disabled={isEmailStepDisabled}
              onPress={() => setStep(2)}
              style={styles.button}
            />
          </View>
        </View>
      ) : (
        <View style={styles.inputView}>
          <Text style={styles.text} children={i18n.t("createPassword")} />
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
          <Text style={styles.subText} children={i18n.t("useAtLeast")} />
          <View style={styles.buttonView}>
            <Button
              buttonColor={isPasswordStepDisabled ? "#AAAAAA" : "#1DB954"}
              textColor={isPasswordStepDisabled ? "transparent" : "#FFFFFF"}
              mode="contained"
              children={i18n.t("submit")}
              disabled={isPasswordStepDisabled}
              onPress={() => tryRegister(user)}
              style={styles.button}
            />
          </View>
        </View>
      )}
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
  subText: {
    fontSize: 14,
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

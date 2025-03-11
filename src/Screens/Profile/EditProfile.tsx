import React, { useEffect, useState } from "react";
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import i18n from "../../Constants/i18n";
import { width } from "../../Constants/measures";
import updateUser from "../../../http/auth/updateUser";

export default function EditProfile() {
    const navigation = useNavigation();
    const [user, setUser] = useState({ id: "", name: "", photo: "" });
    const [originalUser, setOriginalUser] = useState({ id: "", name: "", photo: "" });

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await AsyncStorage.getItem("@user_data");
            if (userData) {
                const parsedData = JSON.parse(userData);
                setUser(parsedData);
                setOriginalUser(parsedData);
            }
        };
        fetchUserData();
    }, []);

    const hasChanges = JSON.stringify(user) !== JSON.stringify(originalUser);

    const handleChange = (key: keyof typeof user, value: string) => {
        setUser(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        if (!hasChanges) return;
        //@ts-ignore
        const success = await updateUser(user);
        if (success) {
            setOriginalUser(user);
            await AsyncStorage.setItem("@user_data", JSON.stringify(user));
            navigation.navigate("Profile" as never);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                    onPress={handleSave} 
                    disabled={!hasChanges}
                    style={[styles.headerButton, !hasChanges && styles.disabledButton]}
                >
                    <Text style={!hasChanges ? styles.headerButtonDisabledText : styles.headerButtonText}>{i18n.t("Save")}</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, hasChanges, user]);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {user.photo ? (
                    <Image source={{ uri: user.photo }} style={styles.profileImage} />
                ) : (
                    <View style={styles.profilePlaceholder} />
                )}
                <TouchableOpacity style={styles.editButton}>
                    <MaterialIcons name="edit" size={20} color="#000000" />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>{i18n.t("Name")}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={i18n.t("YourName")}
                    value={user.name}
                    onChangeText={(text) => handleChange("name", text)}
                    placeholderTextColor="#888"
                />
                {user.name.length > 0 && (
                    <TouchableOpacity onPress={() => handleChange("name", "")}>
                        <MaterialIcons name="close" size={20} color="#888" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        alignItems: "center",
        paddingTop: 50,
    },
    imageContainer: {
        position: "relative",
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    profilePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#333",
    },
    editButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        width: width * 0.9,
    },
    label: {
        color: "#fff",
        fontWeight: "bold",
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: "#fff",
        fontWeight: "bold",
    },
    headerButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "transparent",
        borderRadius: 5,
    },
    headerButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    headerButtonDisabledText: {
        color: "#a8a8a8",
        fontSize: 16,
        fontWeight: "bold",
    },
    disabledButton: {
        backgroundColor: "transparent",
    },
});

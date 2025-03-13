import React, { useEffect, useState } from "react";
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import i18n from "../../Constants/i18n";
import { width } from "../../Constants/measures";
import updateUser from "../../../http/auth/updateUser";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

type RootStackParamList = {
    Profile: undefined;
    EditProfile: undefined;
    HomeTabs: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, "EditProfile">;

export default function EditProfile() {
    const navigation = useNavigation<NavigationProps>();
    const [user, setUser] = useState({ id: "", name: "", photo: "", photoUri: "" });
    const [originalUser, setOriginalUser] = useState({ id: "", name: "", photo: "", photoUri: "" });

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await AsyncStorage.getItem("@user_data");
            if (userData) {
                const parsedData = JSON.parse(userData);
                setUser({ ...parsedData, photoUri: parsedData.photo });
                setOriginalUser({ ...parsedData, photoUri: parsedData.photo });
            }
        };
        fetchUserData();
    }, []);

    const hasChanges = JSON.stringify(user) !== JSON.stringify(originalUser);

    const handleChange = (key: keyof typeof user, value: string) => {
        setUser((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        if (!hasChanges) return;
        const success = await updateUser(user);
        if (success) {
            setOriginalUser(user);
            await AsyncStorage.setItem("@user_data", JSON.stringify(user));
            navigation.replace("HomeTabs");
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
                    <Text style={!hasChanges ? styles.headerButtonDisabledText : styles.headerButtonText}>
                        {i18n.t("Save")}
                    </Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, hasChanges, user]);

    const handlePickImage = async () => {
        Alert.alert(
            i18n.t("ChooseAnOption"),
            i18n.t("WouldYouLikeToPickAnImageFromTheCameraOrGallery"),
            [
                { text: i18n.t("Camera"), onPress: () => pickImageFromCamera() },
                { text: i18n.t("Gallery"), onPress: () => pickImageFromGallery() },
                { text: i18n.t("Cancel"), style: "cancel" },
            ]
        );
    };

    const convertImageToBase64 = async (uri: string) => {
        try {
            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
            return `data:image/png;base64,${base64}`;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const handleImageSelection = async (result: ImagePicker.ImagePickerResult) => {
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            const base64Image = await convertImageToBase64(uri);

            if (base64Image) {
                setUser((prev) => ({
                    ...prev,
                    photo: base64Image,
                    photoUri: uri,
                }));
            }
        }
    };

    const pickImageFromGallery = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert(i18n.t("YouNeedPermissionToAccessTheGallery"));
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        await handleImageSelection(result);
    };

    const pickImageFromCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            alert(i18n.t("YouNeedPermissionToAccessTheCamera"));
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        await handleImageSelection(result);
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {user.photoUri ? (
                    <Image source={{ uri: user.photoUri }} style={styles.profileImage} />
                ) : (
                    <View style={styles.profilePlaceholder} />
                )}
                <TouchableOpacity style={styles.editButton} onPress={handlePickImage}>
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

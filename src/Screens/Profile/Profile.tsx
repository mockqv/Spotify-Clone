import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { height, width } from '../../Constants/measures';
import ProfileButton from '../../components/Profile/ProfileButton';
import i18n from '../../Constants/i18n';
import getPlaylists from '../../../http/playlist/getPlaylists';

interface Profile {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    photo: string;
}

interface Playlist {
    id: string;
    name: string;
    owner: string;
    image: string;
}

export default function Profile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('@user_data');
                if (userData) {
                    const parsedData = JSON.parse(userData);
                    setProfile(parsedData);
                    fetchUserPlaylists(parsedData.id);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchUserPlaylists = async (userId: string) => {
            try {
                const allPlaylists = await getPlaylists();
                if (allPlaylists) {
                    //@ts-ignore
                    const userPlaylists = allPlaylists.filter(playlist => playlist.owner === userId);
                    //@ts-ignore
                    setPlaylists(userPlaylists);
                }
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };

        getUserData();
    }, []);

    const handlePress = () => {
        navigation.navigate('EditProfile' as never);
    };

    return (
        <LinearGradient
            colors={['#1ac67a', '#121212', '#121212', '#121212']}
            style={styles.container}
        >
            <SafeAreaView>
                <View style={styles.sectionProfileInfo}>
                    <ProfileButton
                        image={profile?.photo || ''}
                        onPress={handlePress}
                        style={styles.profileButton}
                    />
                    <Text style={styles.profileName} numberOfLines={1}>
                        {profile?.name && profile.name.length < 18
                            ? profile.name
                            : profile?.name?.substring(0, 15) + '...'}
                    </Text>
                </View>
            </SafeAreaView>

            <View>
                <Text style={styles.sectionTitle}>{i18n.t("Playlists")}</Text>
                <FlatList
                    data={playlists}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.playlistItem}>
                            <Image source={{ uri: item.image }} style={styles.playlistImage} />
                            <Text style={styles.playlistName}>{item.name}</Text>
                        </View>
                    )}
                    ListEmptyComponent={<Text style={styles.emptyText}>{i18n.t("NoPlaylistsFound")}</Text>}
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        flex: 1,
        paddingHorizontal: 16,
        gap: height * 0.1
    },
    profileButton: {
        width: 140,
        height: 140,
        borderRadius: 70,
        alignSelf: 'center',
        marginTop: 30,
    },
    sectionProfileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    profileName: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    playlistItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 12,
        marginVertical: 5,
    },
    playlistImage: {
        width: 50,
        height: 50,
        borderRadius: 0,
        marginRight: 10,
    },
    playlistName: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    emptyText: {
        color: '#888',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
});

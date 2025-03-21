import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { height, width } from '../../Constants/measures';
import ProfileButton from '../../components/Profile/ProfileButton';
import i18n from '../../Constants/i18n';
import Artist from '../../Interfaces/Artist';
import Song from '../../Interfaces/Song';
import SearchItemsByAuthor from '../../../http/Search/searchItemsbyAuthor';

export default function ArtistPage() {
    const [artist, setArtist] = useState<Artist | null>(null);
    const [songs, setSongs] = useState<Song[]>([]);
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        const artistData = route.params;

        if (artistData) {
            setArtist(artistData as Artist);
        }
    }, [route.params]);

    useEffect(() => {
        if (artist?.name) {
            const fetchSongs = async () => {
                try {

                    const artistData = await SearchItemsByAuthor(artist.name);

                    if (artistData) {
                        setSongs(artistData);
                    } else {
                        console.log('No songs found for this artist');
                    }
                } catch (error) {
                    console.error('Error fetching artist data:', error);
                }
            };

            fetchSongs();
        }
    }, [artist]);
    return (
        <LinearGradient
            colors={['#1ac67a', '#121212', '#121212', '#121212']}
            style={styles.container}
        >
            <SafeAreaView>
                <View style={styles.sectionProfileInfo}>
                    <ProfileButton
                        image={artist?.image || ''}
                        onPress={() => {}}
                        style={styles.profileButton}
                    />
                    {artist?.name && (
                        <Text style={styles.profileName} numberOfLines={1}>
                            {artist.name.length < 18 ? artist.name : artist.name.substring(0, 15) + '...'}
                        </Text>
                    )}
                </View>
            </SafeAreaView>

            <View>
                <Text style={styles.sectionTitle}>{i18n.t('Songs')}</Text>
                <FlatList
                    data={songs}
                    keyExtractor={(item) => item.id || ''}
                    renderItem={({ item }) => (
                        <View style={styles.songItem}>
                            <Image source={{ uri: item.image }} style={styles.songImage} />
                            <Text style={styles.songTitle}>{item.name}</Text>
                        </View>
                    )}
                    ListEmptyComponent={<Text style={styles.emptyText}>{i18n.t('NoSongsFound')}</Text>}
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
        gap: height * 0.1,
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
    songItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 12,
        marginVertical: 5,
    },
    songImage: {
        width: 50,
        height: 50,
        borderRadius: 0,
        marginRight: 10,
    },
    songTitle: {
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

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Animated,
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { NavigationHelpersContext, useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { height, width } from "../../Constants/measures";
import { SafeAreaView } from "react-native-safe-area-context";
import i18n from "../../Constants/i18n";
import WorkRender from "../../components/Home/WorkRender"; 
import ArtistRender from "../../components/Home/ArtistRender";
import Artist from "../../Interfaces/Artist";
import Song from "../../Interfaces/Song";
import Playlist from "../../Interfaces/Playlist";
import getArtists from "../../../http/Artist/getArtists";
import getSongs from "../../../http/Song/getSongs";
import getPlaylists from "../../../http/Playlist/getPlaylists";
import ProfileButton from "../../components/Profile/ProfileButton";

export default function Home({ navigation = useNavigation()}) {
  const [artists, setArtists] = useState<Artist[] | null>([]);
  const [works, setWorks] = useState<Song[] | null>([]);
  const [playlists, setPlaylists] = useState<Playlist[] | null>([]);
  const [profilePhoto, setProfilePhoto] = useState<String>("");

  const scrollY = useRef(new Animated.Value(0)).current;

  const profileTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [30, 20],
    extrapolate: "clamp",
  });

  const fetchProfilePhoto = async () => {
    try {
      const response = await AsyncStorage.getItem("@user_data");
  
      if (response) {
        const userData = JSON.parse(response);
        if (userData?.photo && userData.photo.trim() !== "") {
          setProfilePhoto(userData.photo);
          return;
        }
      }
  
      return;
    } catch (err) {
      throw console.log(err);
    }
  };

  useEffect(() => {
    fetchProfilePhoto()
    const fetchData = async () => {
      try {
        const artistsData = await getArtists();
        const worksData = await getSongs();
        const playlistsData = await getPlaylists();

        //@ts-ignore
        setArtists(artistsData.response);
        //@ts-ignore
        setWorks(worksData.data);
        setPlaylists(playlistsData);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };

    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      let backPressCount = 0;
      let backPressTimer: NodeJS.Timeout | null = null;

      const handleBackPress = async () => {
        const userLogin = await AsyncStorage.getItem("@user_login");

        if (userLogin) {
          if (backPressCount === 1) {
            BackHandler.exitApp();
            return true;
          }

          backPressCount += 1;

          if (backPressTimer) {
            clearTimeout(backPressTimer);
          }

          backPressTimer = setTimeout(() => {
            backPressCount = 0;
          }, 2000);

          return true;
        }

        return false;
      };

      //@ts-ignore
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);

      return () => {
        //@ts-ignore
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
        if (backPressTimer) clearTimeout(backPressTimer);
      };
    }, [])
  );

  const goToProfile = () => {
    //@ts-ignore
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.profileView,
          { transform: [{ translateY: profileTranslateY }] },
        ]}
      >
        <ProfileButton
          onPress={goToProfile}
          image={profilePhoto}
          style={styles.profileImage}
        />
        
      </Animated.View>

      <View style={{ marginTop: 30 }}>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{i18n.t("ArtistYouFollow")}</Text>
            <FlatList
              data={artists}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ArtistRender
                  artistContainerStyle={styles.artistContainer}
                  artistImageStyle={styles.artistImage}
                  artistNameStyle={styles.artistName}
                  item={{
                    image: item.image,
                    name: item.name,
                    id: item.id,
                  }}
                  type="artist"
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{i18n.t("RecommendedWorks")}</Text>
            <FlatList
              data={works}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <WorkRender
                  workContainerStyle={styles.workContainer}
                  workImageStyle={styles.workImage}
                  workNameStyle={styles.workName}
                  workAuthorStyle={styles.workAuthor}
                  imageSource={item.image}
                  item={item}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{i18n.t("YourPlaylists")}</Text>
            <FlatList
              data={playlists}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ArtistRender
                  artistContainerStyle={styles.artistContainer}
                  artistImageStyle={styles.playlistImage}
                  artistNameStyle={styles.playlistName}
                  item={item}
                  type="playlist"
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{ height: 50 }} />
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
  },
  profileView: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: "#121212",
  },
  profileImage: {
    width: width * 0.1,
    height: height * 0.045,
    resizeMode: "stretch",
    borderRadius: 100,
  },
  section: {
    marginVertical: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  artistContainer: {
    alignItems: "center",
    marginRight: 16,
  },
  artistImage: {
    width: width * 0.4,
    height: height * 0.19,
    borderRadius: 100,
    marginBottom: 8,
    resizeMode: "stretch",
  },
  artistName: {
    color: "#FFFFFF",
    fontSize: 14,
    width: "100%",
    textAlign: "auto",
    fontWeight: "bold",
  },
  workContainer: {
    marginRight: 16,
    alignItems: "center",
  },
  workImage: {
    width: width * 0.3,
    height: height * 0.15,
    marginBottom: 8,
    resizeMode: "stretch",
  },
  workName: {
    color: "#FFFFFF",
    fontSize: 14,
    width: "100%",
    textAlign: "auto",
  },
  workAuthor: {
    color: "#BBBBBB",
    fontSize: 12,
    width: "100%",
    textAlign: "auto",
  },
  playlistName: {
    color: "#FFFFFF",
    fontSize: 14,
    width: "100%",
    textAlign: "auto",
    fontWeight: "bold",
  },
  playlistImage: {
    width: width * 0.4,
    height: height * 0.19,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: "stretch",
  },
});

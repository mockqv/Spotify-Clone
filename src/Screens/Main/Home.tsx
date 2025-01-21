import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { height, width } from "../../constants/measures";
import { SafeAreaView } from "react-native-safe-area-context";
import i18n from "../../constants/i18n";
import WorkRender from "../../components/HomeComponents/WorkRender";
import ArtistRender from "../../components/HomeComponents/ArtistRender";

// Mock Data
const artists = [
  { id: "1", name: "Artist 1", image: "https://cataas.com/cat" },
  { id: "2", name: "Artist 2", image: "https://cataas.com/cat" },
  { id: "3", name: "Artist 3", image: "https://cataas.com/cat" },
];

const works = [
  {
    id: "1",
    name: "Album 1",
    author: "Artist 1",
    image: "https://cataas.com/cat",
  },
  {
    id: "2",
    name: "Single 1",
    author: "Artist 2",
    image: "https://cataas.com/cat",
  },
  {
    id: "3",
    name: "Album 2",
    author: "Artist 3",
    image: "https://cataas.com/cat",
  },
];

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
                item={item}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
  },
  section: {
    marginVertical: 20,
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
    textAlign: "center",
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
    textAlign: "center",
  },
  workAuthor: {
    color: "#BBBBBB",
    fontSize: 12,
    textAlign: "center",
  },
});

import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  ArtistPage: { name: string; image?: string, id: string };
  PlaylistPage: { name: string; image?: string, id: string };
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

interface Props {
  artistContainerStyle: object;
  artistImageStyle: object;
  artistNameStyle: object;
  item: {
    image?: string;
    name: string;
    id: string;
  };
  type: "artist" | "playlist";
}

const ArtistRender: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
    if (props.type === "artist") {
      navigation.navigate("ArtistPage", { name: props.item.name, image: props.item.image, id: props.item.id });
    } else {
      navigation.navigate("PlaylistPage", { name: props.item.name, image: props.item.image, id: props.item.id });
    }
  };

  return (
    <Pressable onPress={handlePress} style={props.artistContainerStyle}>
      <Image source={{ uri: props.item.image }} style={props.artistImageStyle} />
      <Text style={props.artistNameStyle}>{props.item.name}</Text>
    </Pressable>
  );
};

export default ArtistRender;

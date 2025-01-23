import React from "react";
import { View, Text, Image, StyleSheet, ImageStyle, ViewStyle, TextStyle } from "react-native";

interface Props {
  artistContainerStyle: ViewStyle;
  artistImageStyle: ImageStyle;
  artistNameStyle: TextStyle;
  item: {
    image: string;
    name: string;
  };
}

/**
* A component used for render the Artists or Playlists
* @param { Props } props - the component data
*/

const ArtistRender: React.FC<Props> = (props: Props) => {
  return (
    <View style={props.artistContainerStyle}>
      <Image source={{ uri: props.item.image }} style={props.artistImageStyle} />
      <Text style={props.artistNameStyle}>{props.item.name}</Text>
    </View>
  );
};

export default ArtistRender;

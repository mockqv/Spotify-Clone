import React from "react";
import { Image, TouchableOpacity } from "react-native";

interface Props {
  image: String;
  style: Object;
  onPress: () => void;
}

export default function ProfileButton(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Image
        //@ts-ignore
        source={{
          uri:
            props.image != ""
              ? props.image
              : "https://images.dog.ceo/breeds/collie-border/n02106166_5047.jpg",
        }}
        style={props.style}
      />
    </TouchableOpacity>
  );
};

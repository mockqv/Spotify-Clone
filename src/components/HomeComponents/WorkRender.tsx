import React from "react";
import { View, Image, Text, StyleSheet, StyleProp, ViewStyle, ImageStyle, TextStyle } from "react-native";

interface Item {
  name: string;
  author: string;
}

interface Props {
  workContainerStyle: StyleProp<ViewStyle>;
  workImageStyle: StyleProp<ImageStyle>;
  workNameStyle?: StyleProp<TextStyle>;
  workAuthorStyle?: StyleProp<TextStyle>;
  imageSource: string;
  item: Item;
}


/**
* A component used for render the Albums or Singles
* @param { Props } props - the component data
*/

const WorkRender: React.FC<Props> = (props: Props) => {
  const { workContainerStyle, workImageStyle, workNameStyle, workAuthorStyle, imageSource, item } = props;

  return (
    <View style={workContainerStyle}>
      <Image source={{ uri: imageSource }} style={workImageStyle} />
      <Text style={[styles.workName, workNameStyle]}>{item.name}</Text>
      <Text style={[styles.workAuthor, workAuthorStyle]}>{item.author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  workName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  workAuthor: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default WorkRender;

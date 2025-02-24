import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { height, width } from '../../Constants/measures';


export default function Profile(){
    return (
        <SafeAreaView style={styles.container}>
            
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
});
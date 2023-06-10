import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Share } from 'react-native';
import { getAllRestaurants } from '../util/http';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Calendar from 'expo-calendar';
import { Colours } from '../variables/colours.js';
import { Video } from 'expo-av';
import {app,storage} from '../util/firebase.tsx';
import { getStorage,ref, getDownloadURL } from 'firebase/storage';



const VideoPresentationScreen = ({ route }) => {

  const [videoUrl, setVideoUrl] = useState(null);

  const videoRef = ref(storage, '/restaurant_1.mp4');

  useEffect(() => {
    // Replace 'videos/myVideo.mp4' with the path to your video in Firebase Storage
    getDownloadURL(videoRef)
      .then((url) => {
        // You now have the download URL for your video
        setVideoUrl(url);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, []);

  const {restaurantId} = route.params;

return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Video presentation for {restaurantId}</Text>
        <Video
        source={{ uri: videoUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        useNativeControls
        style={{ width: 300, height: 300 }}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 20,
    backgroundColor: Colours.primaryColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colours.secondaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default VideoPresentationScreen;

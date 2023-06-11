import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Alert } from 'react-native';
import { Colours } from '../variables/colours.js';
import { Video,  } from 'expo-av';
import {storage} from '../util/firebase';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { ref, getDownloadURL,StorageReference } from 'firebase/storage';

type VideoPresentationScreenRouteProp = RouteProp<RootStackParamList, 'VideoPresentation'>;

const VideoPresentationScreen = ({ route }: { route: VideoPresentationScreenRouteProp }): JSX.Element => {

  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const videoRef: StorageReference = ref(storage, '/restaurant_1.mp4');

  useEffect(() => {
    getDownloadURL(videoRef)
      .then((url : string) => {
        setVideoUrl(url);
      })
      .catch((error: any) => {
        console.error(error);
        Alert.alert('Error', 'Could not load video presentation');
      });
  }, []);

  const { restaurantId } = route.params ?? { restaurantId: '' };

return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Video presentation for {restaurantId}</Text>
        {videoUrl && (<Video
        source={{ uri: videoUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        shouldPlay
        useNativeControls
        style={{ width: 300, height: 300 }}
      />)}
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

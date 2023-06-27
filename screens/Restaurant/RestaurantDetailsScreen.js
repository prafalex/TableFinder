import React, { useState, useRef,useContext,useEffect, useLayoutEffect } from 'react';
import { Animated, TouchableOpacity, ScrollView, StyleSheet, Image, View, Text } from 'react-native';
import { Colours } from '../../variables/colours';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/favorite';
import { AuthContext } from '../../context/auth-context';
import { RestaurantContext } from '../../context/restaurant-context';
import IconButton from '../../components/utils/IconButton';
import Button from '../../components/utils/Button';
import { Ionicons } from '@expo/vector-icons';
import call from 'react-native-phone-call';

function RestaurantDetailsScreen({ route, navigation }) {
  const authContext = useContext(AuthContext);
  const favoriteRestaurants = useSelector(
    state => state.favoriteRestaurants[authContext.email] || []
  );

  const restaurantIsFavorite = favoriteRestaurants.includes(
    route.params.restaurantId
  );
  const dispatch = useDispatch();

  const scores = useSelector(
    state => state.restaurantScore[route.params.restaurantId] || []
  );
  const value = 0;
  const restaurantScore =
    scores.reduce((acc, currentValue) => acc + currentValue, value) /
    scores.length;

  function favoriteToggler() {
    if (restaurantIsFavorite) {
      dispatch(
        removeFavorite({
          email: authContext.email,
          restaurantId: route.params.restaurantId,
        })
      );
    } else {
      dispatch(
        addFavorite({
          email: authContext.email,
          restaurantId: route.params.restaurantId,
        })
      );
    }
  }

  const restaurantId = route.params.restaurantId;
  const restaurantContext = useContext(RestaurantContext);
  const selectedRestaurant = restaurantContext.getRestaurant(restaurantId);

  function triggerCall() {
    if (selectedRestaurant.phone_number?.length != 10) {
      alert('The number is incorect!');
      return;
    }

    const args = {
      number: selectedRestaurant.phone_number,
      prompt: true,
    };
    call(args).catch(console.error);
  }

  useEffect(() => {
    navigation.setOptions({ title: selectedRestaurant.name });
  }, [selectedRestaurant, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.buttonContainer}>
            <IconButton
              icon="videocam"
              color={Colours.textSecondaryColor}
              onPress={() =>
                navigation.navigate('VideoPresentation', {
                  restaurantId: selectedRestaurant.id,
                })
              }
            ></IconButton>
            <IconButton
              icon="star"
              color={
                restaurantIsFavorite
                  ? Colours.favoriteColor
                  : Colours.textSecondaryColor
              }
              onPress={favoriteToggler}
            ></IconButton>
          </View>
        );
      },
    });
  }, [navigation, favoriteToggler]);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: selectedRestaurant.restaurant_img }}
          style={styles.image}
        ></Image>
        <View style={styles.header}>
          <Text style={styles.title}>{selectedRestaurant.name}</Text>
          <IconButton
            icon="star"
            color={Colours.favoriteColor}
            text={restaurantScore || 'No reviews'}
            onPress={() =>
              navigation.navigate('Reviews', {
                restaurantId: selectedRestaurant.id,
              })
            }
          ></IconButton>
        </View>
        <View>
          <Text style={styles.description}>
            {selectedRestaurant.description}
          </Text>
          <Text style={styles.text}>
            Category: {selectedRestaurant.category}
          </Text>
          <Text style={styles.text}>Program: {selectedRestaurant.program}</Text>
          <Text style={styles.text}>Address: {selectedRestaurant.address}</Text>
        </View>
        <View>
          <View style={styles.menuContainer}>
            <Text style={styles.title}>Menu</Text>
          </View>
          {selectedRestaurant.menu_items?.map(item => (
            <Text key={item} style={styles.menuItem}>
              {item}
            </Text>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon="restaurant-outline"
            style={{ button: styles.button, buttonText: styles.buttonText }}
            onPress={() =>
              navigation.navigate('BookingPage', {
                restaurantId: selectedRestaurant.id,
              })
            }
          >
            Book a Table
          </Button>
          <Button
            icon="create-outline"
            style={{ button: styles.button, buttonText: styles.buttonText }}
            onPress={() =>
              navigation.navigate('UpsertReviewScreen', {
                restaurantId: selectedRestaurant.id,
              })
            }
          >
            Write a review
          </Button>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          icon="call"
          style={{
            button: styles.footerButton,
            buttonText: styles.phoneButtonText,
          }}
          onPress={triggerCall}
        >
          {selectedRestaurant.phone_number}
        </Button>
        <Button
          icon="location"
          style={{
            button: styles.footerButton,
            buttonText: styles.addressButtonText,
          }}
          onPress={()=>{}}
        >
          {selectedRestaurant.address}
        </Button>
      </View>
    </View>
  );
}

export default RestaurantDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '92%',
    height: 200,
    borderRadius: 8,
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    backgroundColor: 'rgba(139,85,97, 0.5)',
    padding: 10,
  },
  footerButton: {
    backgroundColor: 'transparent',
    elevation: 0,
    width: 150,
  },
  phoneButtonText: {
    color: '#298E4E',
  },
  addressButtonText: {
    color: '#4B6CBE',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'row',
    fontSize: 24,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    margin: 8,
  },
  menuItem: {
    marginHorizontal: 16,
    marginVertical: 6,
    fontSize: 20,
  },
  menuContainer: {
    borderBottomWidth: 4,
    margin: 16,
  },
  text: {
    color: Colours.textColor,
    marginLeft: 8,
    fontSize: 18,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colours.primaryColor,
    width: 160,
  },
  buttonText: {
    color: Colours.textSecondaryColor,
    marginHorizontal: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

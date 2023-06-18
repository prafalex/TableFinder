import { useContext, useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Colours } from '../../variables/colours';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/storeRedux';
import { AuthContext } from '../../context/auth-context';
import { Ionicons } from '@expo/vector-icons';
import { RestaurantContext } from '../../context/restaurant-context';
import IconButton from '../../components/utils/IconButton';
import Button from '../../components/utils/Button';

function RestaurantDetailsScreen({ route, navigation }) {
  const authContext = useContext(AuthContext);

  const favoriteRestaurants = useSelector(
    state => state.favoriteRestaurants[authContext.email] || []
  );

  const restaurantIsFavorite = favoriteRestaurants.includes(
    route.params.restaurantId
  );

  const dispatch = useDispatch();

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

  function calculateScore() {}
  const restaurantId = route.params.restaurantId;
  const restaurantContext = useContext(RestaurantContext);
  const selectedRestaurant = restaurantContext.getRestaurant(restaurantId);

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
          text="Score"
          onPress={() =>
            navigation.navigate('Reviews', {
              restaurantId: selectedRestaurant.id,
            })
          }
        ></IconButton>
      </View>
      <View>
        <Text style={styles.description}>{selectedRestaurant.description}</Text>
        <Text style={styles.text}>Category: {selectedRestaurant.category}</Text>
        <Text style={styles.text}>Program: {selectedRestaurant.program}</Text>
        <Text style={styles.text}>Address: {selectedRestaurant.address}</Text>
        <Text style={styles.text}>
          PhoneNumber: {selectedRestaurant.phone_number}
        </Text>
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
          icon='restaurant-outline'
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
          icon='create-outline'
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

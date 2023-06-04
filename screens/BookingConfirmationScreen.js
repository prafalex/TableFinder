import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Share } from 'react-native';
import { getAllRestaurants } from '../util/http';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Calendar from 'expo-calendar';
import { Colours } from '../variables/colours.js';

const BookingConfirmationScreen = ({ route }) => {
  const navigation = useNavigation();
  const bookingInfo = route.params.bookingInfo;
  const [restaurant, setRestaurant] = useState({});
  const [isAddedToCalendar, setIsAddedToCalendar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const restaurants = await getAllRestaurants();
      const selectedRestaurant = restaurants.find(
        (restaurant) => restaurant.id === bookingInfo.restaurantId
      );
      setRestaurant(selectedRestaurant);
    };
    fetchData();
  }, []);

  const addEventToCalendar = async (title, date, time) => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();

    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const calendar = calendars.find((cal) => cal.isPrimary) || calendars[0];

      const bookingDate = new Date(date);
      const bookingTime = time.split(':').map((part) => parseInt(part));
      const startDate = new Date(bookingDate);
      startDate.setHours(bookingTime[0], bookingTime[1], 0, 0);
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 2, startDate.getMinutes(), 0, 0);

      const event = {
        title,
        startDate,
        endDate,
        timeZone: 'GMT',
        location: 'My Location',
        notes: 'Some notes',
        allDay: false,
      };

      await Calendar.createEventAsync(calendar.id, event);
      setIsAddedToCalendar(true);
      Alert.alert('Calendar saved!', 'Booking successfully added to calendar!', [{ text: 'OK' }]);
    }
  };

  const shareWithExpoSharing = async () => {
    try {
      await Share.share({
        message: `I have booked a table at ${restaurant.name} on ${bookingInfo.date} at ${bookingInfo.time} for ${bookingInfo.people} people.`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>You have successfully booked a table at {restaurant.name}</Text>
        <Text style={styles.text}>Date: {bookingInfo.date}</Text>
        <Text style={styles.text}>Time: {bookingInfo.time}</Text>
        <Text style={styles.text}>Number of people: {bookingInfo.people}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={isAddedToCalendar ? null : () =>
            addEventToCalendar(restaurant.name, bookingInfo.date, bookingInfo.time)
          }>
          <Ionicons name="calendar-outline" size={24} color="white" />
          <Text style={styles.buttonText}>
            {isAddedToCalendar ? 'Booking added to Calendar' : 'Add to Calendar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={shareWithExpoSharing}>
          <Ionicons name="share-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
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

export default BookingConfirmationScreen;

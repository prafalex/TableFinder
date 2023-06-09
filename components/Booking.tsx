import { View, Text, StyleSheet, Alert, Share } from 'react-native';
import { Colours } from '../variables/colours';
import { useContext, useState } from 'react';
import * as Calendar from 'expo-calendar';
import { RestaurantContext } from '../context/restaurant-context';
import Button from './utils/Button';

interface BookingProps {
  restaurantId: string;
  people: number;
  date: string;
  time: string;
}

interface Restaurant {
  name: string;
}

interface CalendarEvent {
  title: string;
  startDate: Date;
  endDate: Date;
  timeZone: string;
  location: string;
  notes: string;
  allDay: boolean;
}

const Booking: React.FC<BookingProps> = ({
  restaurantId,
  people,
  date,
  time,
}) => {
  const restaurantContext = useContext(RestaurantContext);
  const restaurant: Restaurant | undefined =
    restaurantContext.getRestaurant(restaurantId);
  const [isAddedToCalendar, setIsAddedToCalendar] = useState<boolean>(false);

  const addEventToCalendar = async (
    title: string,
    date: string,
    time: string
  ) => {
    const { status }: Calendar.PermissionResponse =
      await Calendar.requestCalendarPermissionsAsync();

    if (status === 'granted') {
      const calendars: Calendar.Calendar[] = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );
      const calendar: Calendar.Calendar =
        calendars.find(cal => cal.isPrimary) || calendars[0];

      const bookingDate: Date = new Date(date);
      const bookingTime: number[] = time.split(':').map(part => parseInt(part));
      const startDate: Date = new Date(bookingDate);
      startDate.setHours(bookingTime[0], bookingTime[1], 0, 0);
      const endDate: Date = new Date(startDate);
      endDate.setHours(startDate.getHours() + 2, startDate.getMinutes(), 0, 0);

      const event: CalendarEvent = {
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
      Alert.alert(
        'Calendar saved!',
        'Booking successfully added to calendar!',
        [{ text: 'OK' }]
      );
    }
  };

  const shareWithExpoSharing = async () => {
    try {
      await Share.share({
        message: `I have booked a table at ${restaurant?.name} on ${date} at ${time} for ${people} people.`,
      });
    } catch (error: any) {
      //console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>
          You have successfully booked a table at {restaurant?.name}
        </Text>
        <Text style={styles.text}>Date: {date}</Text>
        <Text style={styles.text}>Time: {time}</Text>
        <Text style={styles.text}>Number of people: {people}</Text>
        <Button
          icon="calendar-outline"
          style={{ button: styles.button, buttonText: styles.buttonText }}
          onPress={
            isAddedToCalendar
              ? () => {}
              : () => {
                  addEventToCalendar(restaurant?.name || '', date, time);
                }
          }
        >
          {isAddedToCalendar ? 'Booking added to Calendar' : 'Add to Calendar'}
        </Button>
        <Button
          icon="share-outline"
          style={{ button: styles.button, buttonText: styles.buttonText }}
          onPress={shareWithExpoSharing}
        >
          Share
        </Button>
      </View>
    </View>
  );
};

export default Booking;

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
    backgroundColor: Colours.secondaryColor,
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
    color: Colours.textColor,
  },
  button: {
    backgroundColor: Colours.primaryColor,
  },
  buttonText: {
    color: Colours.textSecondaryColor,
    marginHorizontal: 6,
  },
});

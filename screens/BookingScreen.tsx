import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import { Colours } from '../variables/colours';
import axios,{AxiosResponse} from 'axios';
import { AuthContext } from '../context/auth-context';
import { RootStackParamList } from '../App'
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



interface BookingScreenProps {
  route: RouteProp<RootStackParamList, 'BookingPage'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'BookingPage'>;
}

interface BookingInfo {
  restaurantId: string;
  date: string;
  time: string;
  people: number;
  email: string;
}

const BookingScreen: React.FC<BookingScreenProps> = ({ route, navigation }) => {
  const authContext = useContext(AuthContext);

  const { restaurantId } = route.params;

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedPeople, setSelectedPeople] = useState<number>(1); 
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState<boolean>(false);
  const [isPeoplePickerModalVisible, setPeoplePickerModalVisible] = useState<boolean>(false);
  const [tempPeopleInput, setTempPeopleInput] = useState<string>('');

  const handlePeopleCancel: () => void = () => {
    setPeoplePickerModalVisible(false);
  };

  const handleIconPress: (type: 'date' | 'time') => void = (type) => {
    if (type === 'date') {
      setDatePickerVisible(true);
    } else if (type === 'time') {
      setTimePickerVisible(true);
    }
  };
  

  const handleDateConfirm: (date: Date) => void = (date) => {
    setSelectedDate(date.toDateString());
    setDatePickerVisible(false);
  };
  
  const handleTimeConfirm: (time: Date) => void = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setSelectedTime(formattedTime);
    setTimePickerVisible(false);
  };
  
  const handleSelection: (value: string) => void = (value) => {
    if (value !== '') {
      const parsedValue = parseInt(value);
      if (!isNaN(parsedValue) && parsedValue >= 1) {
        setSelectedPeople(parsedValue);
      }
    }
  };
  
  const incrementPeople: () => void = () => {
    setSelectedPeople(selectedPeople + 1);
  };
  
  const decrementPeople: () => void = () => {
    if (selectedPeople > 1) {
      setSelectedPeople(selectedPeople - 1);
    }
  };
  
  const handlePeopleIconPress: () => void = () => {
    setTempPeopleInput(selectedPeople.toString());
    setPeoplePickerModalVisible(true);
  };
  
  const handlePeopleConfirm: () => void = () => {
    handleSelection(tempPeopleInput);
    setPeoplePickerModalVisible(false);
  };
  

  const handleConfirmBooking = async () : Promise<void> => {
    if (!selectedDate || !selectedTime || !selectedPeople) {
      Alert.alert(
        'Booking Error!',
        'Please select a date, time, and number of people.',
        [{ text: 'OK' }]
      );
      return;
    }


    
    const bookingInfo: BookingInfo = {
      restaurantId,
      date: selectedDate,
      time: selectedTime,
      people: selectedPeople,
      email: authContext.email,
    };

  try {
  const response: AxiosResponse = await axios.get(
    `https://tablefinder-c5b4a-default-rtdb.europe-west1.firebasedatabase.app/bookings.json?orderBy="restaurantId"&equalTo="${restaurantId}"`
  );

  let existingReservations: Record<string, BookingInfo> = response.data;
  let reservationCount: number = 0;

  for (let key in existingReservations) {
    if (
      existingReservations[key].date === selectedDate &&
      existingReservations[key].time === selectedTime
    ) {
      reservationCount++;
    }
  }

  if (reservationCount >= 15) {
    Alert.alert(
      'Booking Error!',
      'The restaurant is fully booked at this time. Please select another time.',
      [{ text: 'OK' }]
    );
    return;
  }

  await axios.post(
    'https://tablefinder-c5b4a-default-rtdb.europe-west1.firebasedatabase.app/bookings.json',
    bookingInfo
  );

  Alert.alert(
    'Booking Confirmed!',
    'Your table has been booked successfully.',
    [
      {
        text: 'OK',
        onPress: () =>
          navigation.replace('BookingConfirmation', { bookingInfo }),
      },
    ]
  );
} catch (err: any) {
  console.log(err);
  Alert.alert(
    'Booking Error!',
    'Your table has not been booked successfully.',
    [{ text: 'OK' }]
  );
}
};

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book a Table</Text>

      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={styles.selectionItem}
          onPress={() => handleIconPress('date')}
        >
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={styles.selectionLabel}>
            {selectedDate || 'Select Date'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectionItem}
          onPress={() => handleIconPress('time')}
        >
          <Ionicons name="time-outline" size={24} color="black" />
          <Text style={styles.selectionLabel}>
            {selectedTime || 'Select Time'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectionItem}
          onPress={handlePeopleIconPress}
        >
          <Ionicons name="person-outline" size={24} color="black" />
          <View style={styles.personPicker}>
            <TouchableOpacity onPress={decrementPeople}>
              <Ionicons name="remove-circle-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.personCountText}>{selectedPeople}</Text>
            <TouchableOpacity onPress={incrementPeople}>
              <Ionicons name="add-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
        minimumDate={new Date()}
        display="inline"
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisible(false)}
        minimumDate={new Date()}
        minuteInterval={30}
      />

      <Modal isVisible={isPeoplePickerModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Number of People</Text>
          <TextInput
            style={styles.modalInput}
            keyboardType="numeric"
            value={tempPeopleInput}
            onChangeText={setTempPeopleInput}
            placeholder="Number of people"
          />
          <View style={styles.modalButtons}>
            <Button title="Cancel" onPress={handlePeopleCancel} color="#888" />
            <Button title="Confirm" onPress={handlePeopleConfirm} />
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmBooking}
      >
        <Ionicons name="checkmark-circle-outline" size={24} color="white" />
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  selectionItem: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  selectionLabel: {
    marginTop: 10,
  },
  personPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  personCountText: {
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
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
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});

export {BookingScreenProps, BookingInfo};
export default BookingScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';

const BookingPage = ({route}) => {

  const {restaurantId} = route.params;

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPeople, setSelectedPeople] = useState(1); // Default value is 1 person
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isPeoplePickerModalVisible, setPeoplePickerModalVisible] = useState(false);
  const [tempPeopleInput, setTempPeopleInput] = useState('');


  const handlePeopleCancel = () => {
    setPeoplePickerModalVisible(false);
  };
  
  const handleIconPress = (type) => {
    if (type === 'date') {
      setDatePickerVisible(true);
    } else if (type === 'time') {
      setTimePickerVisible(true);
    }
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date.toDateString());
    setDatePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSelectedTime(formattedTime);
    setTimePickerVisible(false);
  };

  const handleSelection = (value) => {
    if (value !== '') {
      const parsedValue = parseInt(value);
      if (!isNaN(parsedValue) && parsedValue >= 1) {
        setSelectedPeople(parsedValue);
      }
    }
  };

  const incrementPeople = () => {
    setSelectedPeople(selectedPeople + 1);
  };

  const decrementPeople = () => {
    if (selectedPeople > 1) {
      setSelectedPeople(selectedPeople - 1);
    }
  };

  const handlePeopleIconPress = () => {
    setTempPeopleInput(selectedPeople.toString());
    setPeoplePickerModalVisible(true);
  };

  const handlePeopleConfirm = () => {
    handleSelection(tempPeopleInput);
    setPeoplePickerModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book a Table {restaurantId} </Text>
      
      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={styles.selectionItem}
          onPress={() => handleIconPress('date')}
        >
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={styles.selectionLabel}>{selectedDate || 'Select Date'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectionItem}
          onPress={() => handleIconPress('time')}
        >
          <Ionicons name="time-outline" size={24} color="black" />
          <Text style={styles.selectionLabel}>{selectedTime || 'Select Time'}</Text>
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
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisible(false)}
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
  },
  modalInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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
});

export default BookingPage;

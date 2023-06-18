import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  useColorScheme,
} from 'react-native';
import { Colours } from '../../variables/colours';
import Modal from 'react-native-modal';
import Button from '../utils/Button';
function EditModal({ navigation, isVisible, type, set, setNew, value, newValue, handleChange, setVisible}) {
  const colorScheme = useColorScheme();

  const getModalStyle = () => {
    return colorScheme === 'dark' ? styles.darkModal : styles.lightModal;
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={getModalStyle()}>
        <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>
          New {type}
        </Text>
        <TextInput
          style={colorScheme === 'dark' ? styles.inputDark : styles.inputLight}
          onChangeText={setNew}
          value={newValue}
          secureTextEntry
        />
        <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>
          Current Password:
        </Text>
        <TextInput
          style={colorScheme === 'dark' ? styles.inputDark : styles.inputLight}
          onChangeText={set}
          value={value}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={handleChange}
            style={{ button: styles.button, buttonText: styles.buttonText }}
          >
            Confirm
          </Button>
          <Button
            onPress={() => setVisible(false)}
            style={{ button: styles.button, buttonText: styles.buttonText }}
          >
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
}

export default EditModal;

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colours.primaryColor,
        width: 120
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
    inputLight: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        color: 'black',
      },
      inputDark: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        color: 'white',
      },
      lightModal: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      darkModal: {
        backgroundColor: 'black',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
});

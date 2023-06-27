import { Text, View, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  icon?: string;
  style: {
    buttonContainer?: ViewStyle;
    button?: ViewStyle;
    buttonText: TextStyle;
  }
}

const Button: React.FC<ButtonProps> = ({ children, onPress, icon, style }) => {
  return (
    <View style={[styles.buttonContainer, style.buttonContainer]}>
      <TouchableOpacity onPress={onPress} style={[styles.button, style.button]}>
        {icon && <Ionicons name={icon as any} size={24} color={style.buttonText.color} />}
        <Text style={[styles.buttonText, style.buttonText]}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 50,
    borderRadius: 10,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    alignSelf: 'center',
    paddingVertical: 10,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});

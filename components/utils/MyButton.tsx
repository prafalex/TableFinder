import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';

interface MyButtonProps {
  icon: string;
  color: string;
  size: number;
  onPress: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ icon, color, size, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon as any} color={color} size={size} />
    </Pressable>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
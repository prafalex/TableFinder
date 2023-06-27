import { Text, StyleSheet, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

interface IconButtonProps {
  icon: string;
  color: string;
  text: string;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({icon, color, text, onPress}) => {
    return(
      <TouchableOpacity onPress={onPress} style={styles.container}>
          <Ionicons name={icon as any} size={24} color={color} />
          <Text style={[styles.text, {color}]}>{text}</Text>
      </TouchableOpacity>
    ); 
}

export default IconButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10
    },
    text: {
        alignSelf: 'center',
        fontWeight: "bold",
        margin: 2
    }
});

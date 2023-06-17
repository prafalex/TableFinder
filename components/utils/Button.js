import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Colours } from "../../variables/colours.js";
function Button({ children, onPress, style}) {
  return (
    <View style={[styles.buttonContainer, style.buttonContainer]}>
      <TouchableOpacity
        onPress={onPress}
      >
        <View style={[styles.button, style.button]}>
          <Text style={[styles.buttonText, style.buttonText]}>{children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 50,
    borderRadius: 10,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
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
    justifyContent: 'center'
  },
});

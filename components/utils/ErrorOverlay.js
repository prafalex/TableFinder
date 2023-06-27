import { Text, View, StyleSheet } from 'react-native';
import { Colours } from '../../variables/colours';
function ErrorOverlay({ message}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={[styles.text, styles.message]}>{message}</Text>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colours.secondaryColor,
  },
  text: {
    color: Colours.errorMain,
    textAlign: "center",
    marginBottom: 8
  },
  title: {
    fontSize: 25,
    fontWeight: "bold"
  },
  message: {
    fontSize: 20,
  }
});

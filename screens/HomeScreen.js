import { StyleSheet, Text, View } from 'react-native';

function WelcomeScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Home page...</Text>
      <Text>Currently testing!</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 6,
  },
});
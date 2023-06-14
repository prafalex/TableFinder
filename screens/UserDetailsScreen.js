import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  Keyboard,
  useColorScheme 
} from "react-native";
import { Colours } from "../variables/colours.js";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { UserLogin } from "../util/firebaseAuth.tsx";

function UserDetailsScreen() {
  const authContext = useContext(AuthContext);
  const [isChangeEmailModalVisible, setChangeEmailModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState(""); 

  const colorScheme = useColorScheme();

  const getModalStyle = () => {
    return colorScheme === 'dark' ? styles.darkModal : styles.lightModal;
  }

  const handleChangeEmail = async () => {
      try{
        await UserLogin(authContext.email,password);
        await authContext.changeEmail(newEmail);
      }catch(error){
        Alert.alert('Failed to change email, maybe check your current password or email already exists!');
        console.log(error);
      }  
      setNewEmail("");
      setPassword(""); 

      setChangeEmailModalVisible(false);
  };

  const  handleChangePassword = async () => {
    try{
      await UserLogin(authContext.email,password);
      await authContext.changePassword(newPassword);
    }catch(error){
      Alert.alert('Failed to change password, maybe check your current password!');
      console.log(error);
    }  
    setPassword(""); 
    setNewPassword("");

    setChangePasswordModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Email: {authContext.email}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setChangeEmailModalVisible(true)}
        >
          <Ionicons name="mail-outline" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Change Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setChangePasswordModalVisible(true)}
        >
          <Ionicons name="lock-closed-outline" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={authContext.logout}>
          <View style={styles.iconContainer}>
            <Ionicons name="log-out-outline" size={24} color="#FFF" />
          </View>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isChangeEmailModalVisible} onBackdropPress={() => {
          Keyboard.dismiss();
      }}>
        <View style={getModalStyle()}>
          <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>New Email:</Text>
          <TextInput
            style={colorScheme === 'dark' ? styles.inputDark : styles.inputLight}
            onChangeText={setNewEmail}
            value={newEmail}
          />
          <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>Password:</Text>
          <TextInput
            style={colorScheme === 'dark' ? styles.inputDark : styles.inputLight}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        <View>
        <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setChangeEmailModalVisible(false)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
        </View>
      </Modal>
      <Modal isVisible={isChangePasswordModalVisible}  onBackdropPress= {() => {
          Keyboard.dismiss();
      }}>
        <View style={getModalStyle()}>
          <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>New Password:</Text>
          <TextInput
            style={colorScheme === 'dark' ? styles.inputDark : styles.inputLight}
            onChangeText={setNewPassword}
            value={newPassword}
            secureTextEntry
          />
          <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }} >Current Password:</Text>
          <TextInput
            style={colorScheme === 'dark' ? styles.inputDark : styles.inputLight}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
         <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setChangePasswordModalVisible(false)}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
        </View>
      </Modal>
    </View>
  );
}

export default UserDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 20,
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: Colours.primaryColor,
    shadowColor: "#000",
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
    textAlign: "center",
    marginBottom: 10,
    color: "white",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colours.backgroundColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: Dimensions.get("window").width * 0.6,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputLight: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    color:"black"
  },
  inputDark: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    color:"white"
  },
  lightModal: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  darkModal: {
    backgroundColor: "black",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
});

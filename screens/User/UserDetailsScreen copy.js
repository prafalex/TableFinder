import React, { useState,useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput
} from "react-native";
import { Colours } from "../../variables/colours";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import {UserLogin} from "../../util/firebaseAuth";

function UserDetailsScreen() {
    const authContext = useContext(AuthContext);
    const [isChangeEmailModalVisible, setChangeEmailModalVisible] = useState(false);
    const [isChangePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isTokenExpired, setTokenExpired] = useState(false);

    
    const handleChangeEmail = async () => {
        try {
            await authContext.changeEmail(newEmail);
            setNewEmail('');
            setChangeEmailModalVisible(false);
        } catch (error) {
            //handle relogin
            setChangeEmailModalVisible(false);
            setTokenExpired(true);
        }
    }

    const handleChangePassword = () => {
        authContext.changePassword(newPassword);
        setNewPassword('');
        setChangePasswordModalVisible(false);
    }

    const handleRelogin = async () => {
        try {
          const token = await UserLogin(authContext.email, authContext.password);
          authContext.setToken(token);
          setTokenExpired(false);
        } catch (error) {
          console.error(error);
          // Handle re-login error if needed
        }
      };


    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.text}>Email: {authContext.email}</Text>
                <TouchableOpacity style={styles.iconButton} onPress={() => setChangeEmailModalVisible(true)}>
                    <Ionicons name="mail-outline" size={24} color="#FFF" />
                    <Text style={styles.iconButtonText}>Change Email</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => setChangePasswordModalVisible(true)}>
                    <Ionicons name="lock-closed-outline" size={24} color="#FFF" />
                    <Text style={styles.iconButtonText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookingButton} onPress={authContext.logout}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="log-out-outline" size={24} color="#FFF" />
                    </View>
                    <Text style={styles.bookingButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
            <Modal isVisible={isChangeEmailModalVisible}>
                <View style={styles.modal}>
                    <Text>New Email:</Text>
                    <TextInput style={styles.input} onChangeText={setNewEmail} value={newEmail} />
                    <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
                        <Text>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal isVisible={isChangePasswordModalVisible}>
                <View style={styles.modal}>
                    <Text>New Password:</Text>
                    <TextInput style={styles.input} onChangeText={setNewPassword} value={newPassword} secureTextEntry />
                    <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                        <Text>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal isVisible={isTokenExpired  }>
                <View style={styles.modal}>
                    <Text>New Password:</Text>
                    <TextInput style={styles.input} onChangeText={setNewPassword} value={newPassword} secureTextEntry />
                    <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                        <Text>Confirm</Text>
                    </TouchableOpacity>
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
    bookingButton: {
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
    bookingButtonText: {
      color: "white",
      fontSize: 18,
      marginLeft: 10,
    },
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        width: '100%'
    },
    button: {
        backgroundColor: Colours.primaryColor,
        padding: 10,
        alignItems: 'center',
        marginTop: 10
    },
    iconButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        width: Dimensions.get("window").width * 0.6,
        alignSelf: "center",
    },
    iconButtonText: {
        color: "white",
        fontSize: 18,
        marginLeft: 10,
    },
  });
  
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { Colours } from '../../variables/colours';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import { UserLogin } from '../../util/firebaseAuth';
import Button from '../../components/utils/Button';
import EditModal from '../../components/utils/EditModal';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedStackParamList } from '../../util/StackParamList';

type UserDetailsScreenNavigationProp = StackNavigationProp<
  LoggedStackParamList,
  'UserDetailsScreen'
>;

interface UserDetailsScreenProps {
  navigation: UserDetailsScreenNavigationProp;
}

function UserDetailsScreen({ navigation }: UserDetailsScreenProps) {
  const authContext = useContext(AuthContext);
  const [isChangeEmailModalVisible, setChangeEmailModalVisible] =
    useState<boolean>(false);
  const [isChangePasswordModalVisible, setChangePasswordModalVisible] =
    useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChangeEmail = async () => {
    try {
      const token = await UserLogin(authContext.email, password);
      await authContext.changeEmail(token, newEmail);
      Alert.alert('Email changed successfully!');
    } catch (error) {
      Alert.alert(
        'Failed to change email, maybe check your current password or email already exists!'
      );
      //console.log(error);
    }
    setNewEmail('');
    setPassword('');

    setChangeEmailModalVisible(false);
  };

  const handleChangePassword = async () => {
    try {
      const token = await UserLogin(authContext.email, password);
      await authContext.changePassword(token, newPassword);
      Alert.alert('Password changed successfully!');
    } catch (error) {
      Alert.alert(
        'Failed to change password, maybe check your current password!'
      );
      //console.log(error);
    }
    setPassword('');
    setNewPassword('');

    setChangePasswordModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Email: {authContext.email}</Text>
        <Button
          icon="mail-outline"
          style={{ button: styles.button, buttonText: styles.buttonText }}
          onPress={() => setChangeEmailModalVisible(true)}
        >
          Change Email
        </Button>
        <Button
          icon="lock-closed-outline"
          style={{ button: styles.button, buttonText: styles.buttonText }}
          onPress={() => setChangePasswordModalVisible(true)}
        >
          Change Password
        </Button>
        <Button
          icon="log-out-outline"
          style={{ button: styles.button, buttonText: styles.buttonText }}
          onPress={authContext.logout}
        >
          Logout
        </Button>
      </View>
      {isChangePasswordModalVisible && (
        <EditModal
          navigation={navigation}
          isVisible={true}
          type="Password"
          set={setPassword}
          setNew={setNewPassword}
          value={password}
          newValue={newPassword}
          handleChange={handleChangePassword}
          setVisible={setChangePasswordModalVisible}
        ></EditModal>
      )}
      {isChangeEmailModalVisible && (
        <EditModal
          navigation={navigation}
          isVisible={true}
          type="Email"
          set={setPassword}
          setNew={setNewEmail}
          value={password}
          newValue={newEmail}
          handleChange={handleChangeEmail}
          setVisible={setChangeEmailModalVisible}
        ></EditModal>
      )}
    </View>
  );
}

export default UserDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 20,
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: Colours.secondaryColor,
    shadowColor: '#000',
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
    textAlign: 'center',
    marginBottom: 10,
    color: Colours.textColor,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colours.primaryColor,
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
});

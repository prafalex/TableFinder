import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateEmail, updatePassword } from '../util/firebaseAuth'; // import the new functions

export interface AuthContextType {
    token: string;
    email: string;
    auth: boolean;
    authenticate: (token: string, email: string) => void;
    logout: () => void;
    changeEmail: (token:string,email: string) => Promise<void>; // add the function type here
    changePassword: (token:string,password: string) => Promise<void>; // add the function type here
};

export const AuthContext = createContext<AuthContextType>({
    token: '' as string,
    email: '' as string,
    auth: false as boolean,
    authenticate: (token: string, email: string) => {},
    logout: () => {},
    changeEmail: async (token:string,email: string) => {}, // add the function here
    changePassword: async (token:string,password: string) => {}, // add the function here
});

interface Props {
    children?: React.ReactNode;
}

function AuthContextProvider({children}:Props){
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [authEmail, setAuthEmail] = useState<string | null>(null);

    function authenticate(token:string, email:string):void{
        setAuthToken(token);
        setAuthEmail(email);
        AsyncStorage.setItem('token',token);
        AsyncStorage.setItem('email',email);
    }

    function logout():void{
        setAuthToken(null);
        setAuthEmail(null);
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('email');
    }


    async function changeEmail(token:string,newEmail: string): Promise<void> {
        try {
            if (authToken) {
                await updateEmail(token, newEmail);
                setAuthToken(token);
                setAuthEmail(newEmail);
                AsyncStorage.setItem('email', newEmail);
                AsyncStorage.setItem('token', authToken);
            }
        } catch (error) {
            // Handle the error here (e.g., display an error message or log the error)
            throw error;
        }
    }



    async function changePassword(token:string,newPassword: string): Promise<void> {
        try {
            if (authToken) {
                await updatePassword(token, newPassword);
                AsyncStorage.setItem('token', token);
                setAuthToken(token);
            }
        } catch (error) {
            // Handle the error here (e.g., display an error message or log the error)
            throw error;
        }
    }

    const value = {
        token: authToken as string,
        email: authEmail as string,
        auth: !!authToken, 
        authenticate,
        logout,
        changeEmail, 
        changePassword, 
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export default AuthContextProvider;

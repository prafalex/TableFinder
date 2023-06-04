import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const AuthContext = createContext({
    token:'' as string,
    email:'' as string,
    auth:false as boolean,
    authenticate: (token:string,email:string) => {},
    logout: ()  => {},
});

interface Props{
    children?: React.ReactNode;
}

function AuthContextProvider({children}:Props){
    const [authToken,setAuthToken] = useState<String | null>(null);
    const [authEmail,setAuthEmail] = useState<String | null>(null);

    function authenticate(token:string,email:string):void{
        setAuthToken(token);
        setAuthEmail(email);
        AsyncStorage.setItem('token',token);
        AsyncStorage.setItem('email',email);
    }

    function logout():void{
        setAuthToken('');
        setAuthEmail('');
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('email');
    }

    const value = {
        token:authToken as string,
        email:authEmail as string,
        auth:!!authToken as boolean, 
        authenticate,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContextProvider;
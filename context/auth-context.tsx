import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const AuthContext = createContext({
    token:'' as string,
    auth:false as boolean,
    authenticate: (token:string) => {},
    logout: ()  => {},
});

interface Props{
    children?: React.ReactNode;
}

function AuthContextProvider({children}:Props){
    const [authToken,setAuthToken] = useState<String | null>(null);

    function authenticate(token:string):void{
        setAuthToken(token);
        AsyncStorage.setItem('token',token);
    }

    function logout():void{
        setAuthToken('');
        AsyncStorage.removeItem('token');
    }

    const value = {
        token:authToken as string,
        auth:!!authToken as boolean, 
        authenticate,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContextProvider;
import { createContext, useState } from "react";
export const AuthContext = createContext({
    token:'',
    auth:false,
    authenticate: (token) => {},
    logout: (token)  => {},
});

function AuthContextProvider({children}){
    const [authToken,setAuthToken] = useState();

    function authenticate(token){
        setAuthToken(token);
    }

    function logout(){
        setAuthToken();
    }

    const value = {
        token: authToken,
        auth: !!authToken,
        authenticate: authenticate,
        logout: logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;
import axios from 'axios';

const API_KEY='AIzaSyAY9Y2wYuCXRC52CcxrQ5c7gWJX7XSqI68';

async function authFunc(mode, email, password){
    const url=`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(url,
        {
            email:email,
            password:password,
            returnSecureToken: true
        });
    
    const token = response.data.idToken; 

    return token; 
    //console.log(response.data);
}

export  function UserCreate(email,password){
    return authFunc('signUp',email,password);
}

export  function login(email,password){
    return authFunc('signInWithPassword',email,password);
}
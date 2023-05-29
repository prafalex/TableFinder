import axios from 'axios';

const API_KEY:string=***;


async function authFunc(mode:string, email:string, password:string):Promise<string>{
    const url=`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;


    // i need a const response in typescript that is a promise of type axios.post
    const response = await axios.post(url,{
        email:email,
        password:password,
        returnSecureToken: true
    });

    const token = response.data.idToken; 
    return token; 
}

export  function UserCreate(email: string,password: string):Promise<string>{
    return authFunc('signUp',email,password);
}

export function UserLogin(email: string,password: string):Promise<string>{
    return authFunc('signInWithPassword',email,password);
}


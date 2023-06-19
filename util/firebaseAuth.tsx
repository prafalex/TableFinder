import axios, { AxiosResponse } from 'axios';

const API_KEY: string = 'AIzaSyAY9Y2wYuCXRC52CcxrQ5c7gWJX7XSqI68';

interface AuthResponse {
  email: string;
  password: string;
  returnSecureToken: boolean;
  idToken: string;
}

async function authFunc(mode: string, email: string, password: string): Promise<string> {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response: AxiosResponse<AuthResponse> = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token: string = response.data.idToken;
  return token;
}

export function UserCreate(email: string, password: string): Promise<string> {
  return authFunc('signUp', email, password);
}

export function UserLogin(email: string, password: string): Promise<string> {
  return authFunc('signInWithPassword', email, password);
}

export async function updateEmail(token: string, newEmail: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
    try {
        const response: AxiosResponse<AuthResponse> = await axios.post(url, {
            idToken: token,
            email: newEmail,
            returnSecureToken: true,
        });
        return response.data.idToken;
    } catch (error : any) {
        throw error.response.data.error.message;
    }
}

export async function updatePassword(token: string, newPassword: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
    try {
        const response: AxiosResponse<AuthResponse> = await axios.post(url, {
            idToken: token,
            password: newPassword,
            returnSecureToken: true,
        });
        return response.data.idToken;
    } catch (error : any) {
        //console.error(error);
        throw error.response.data.error.message;
    }
}



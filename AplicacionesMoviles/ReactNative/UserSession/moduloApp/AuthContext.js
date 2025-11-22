import React, {createContext, useState, useContext, useEffect} from 'react';
import asyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [userToken, setUser] = useState(null);

  const login = async (token) => {
    setUser(token)
    await AsyncStorage.setItem('userToken', token);
  }
  const logout = async () => {
    setUser(null)
    await AsyncStorage.removeItem('userToken');
  }
  const checkToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) setUser(token);
  }

  useEffect(()=>{
    checkToken();
  },[]);
  return(
    <AuthContext.Provider value={{userToken, login, logout}}>
      {children}
    </AuthContext.Provider>)
}

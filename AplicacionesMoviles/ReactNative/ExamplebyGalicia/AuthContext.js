import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [userToken, setUserToken] = useState(null);
  const login = async (token) => {
    setUserToken(token);
    await AsyncStorage.setItem('userToken', token);
  }

  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem('userToken');
  }

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUserToken(token);
      }
    } catch (e) {
      console.error("Error al leer el token", e);
    }
  }

  useEffect(()=>{
    checkToken();
  },[]);

  return(
    <AuthContext.Provider value={{userToken, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}

import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const refreshAccessToken = async (accessToken) => {
    try {
      const res = await fetch(`${API_URL}/accessToken`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        setAccessToken("");
        setIsLoggedIn(false);
        return;
      }

      const resData = await res.json();

      setAccessToken(resData.data.accessToken);
      setIsLoggedIn(true)
      return resData.data.accessToken;
    } catch (err) {
      setIsLoggedIn(false);
      throw new Error(err.message);
    }
  };

  const getAccessToken = () => accessToken;

  useEffect(()=>{
    refreshAccessToken(accessToken);
  },[])

  return (
    <AuthContext.Provider
      value={{
        formData,
        setFormData,
        isLoggedIn,
        setIsLoggedIn,
        accessToken,
        setAccessToken,
        refreshAccessToken,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

export const userDataContext = createContext();
function UserContext({children}) {
  const serverUrl = "http://localhost:8000"
  const [userData,setUserData] = useState(null);
const [frontendImage,setFrontendImage] = useState(null);
  const [backendImage , setBackendImage] = useState(null);
const [selectedImage,setSelectedImage] = useState(null);

  const handleCurrentUser = async()=>{
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
      setUserData(result.data);
      // console.log("Current user data:", result.data);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
    }
  };

  const getGeminiResponse = async(command) => {
    try {
      const result= await axios.post(`${serverUrl}/api/user/asktoassistant`, { command }, { withCredentials: true });
      // console.log("Gemini response data:", result.data);
      const response = result.data;
      return response;
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      throw error;
    }
  };  

  useEffect(() => {
    handleCurrentUser();
  }, []);
  const value = {
    serverUrl,
    userData,
    setUserData,
    handleCurrentUser,
    frontendImage,setFrontendImage,
    backendImage,setBackendImage,
    selectedImage,setSelectedImage,
    getGeminiResponse
  }

  return (
    
    <div>
      <userDataContext.Provider value={value}>
        {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext

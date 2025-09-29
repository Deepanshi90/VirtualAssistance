import React, { use, useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdKeyboardBackspace } from "react-icons/md";


function Customize2() {
  const {userData,backendImage,selectedImage,serverUrl,setUserData} = useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(userData?.assistantName || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const handleUpdateAssistant = async () => {
  //   try {
  //     let formData = new FormData();
  //     formData.append("assistantName", assistantName);
  //     if (backendImage) {
  //       formData.append("assistantImage", backendImage);
  //     }else{
  //       formData.append("assistantImage", selectedImage);
  //     }
  //     const result = await axios.post(`${serverUrl}/api/user/update`, formData,{withCredentials: true}, {
  //       headers: {
  //         "Content-Type": "multipart/form-data"
  //       }
  //     });
  //     console.log(result.data);
  //     setUserData(result.data.user);
  //   } catch (error) {
  //     console.error("Error updating assistant:", error);
  //   }
    
  // };
  
  const handleUpdateAssistant = async () => {
  try {
    setLoading(true);
    let formData = new FormData();
    formData.append("assistantName", assistantName);
    if (backendImage) {
      formData.append("assistantImage", backendImage); // file upload
    } else {
      formData.append("imageUrl", selectedImage); // string for default image
    }
    const result = await axios.post(
      `${serverUrl}/api/user/update`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    setLoading(false);
    // console.log(result.data);
    setUserData(result.data.user);
    navigate("/");
  } catch (error) {
    setLoading(false);
    console.error("Error updating assistant:", error);
  }
};

  return (
    <div className='w-full h-[100vh] flex items-center justify-center flex-col p-[20px] bg-gradient-to-t from-[black] to-[#030353] relative'>

      <MdKeyboardBackspace className='absolute text-white text-[30px] top-[30px] left-[30px] w-[25px] h-[25px] cursor-pointer ' onClick={() => navigate("/customize")}/>

        <h1 className='text-white text-[30px] text-center mb-[40px]'>Enter your <span className='text-blue-500'>Assistant Name</span></h1>

       <input type="text" placeholder="eg. Jarvis" className='w-full max-w-[600px] h-[60px] rounded-full px-[20px] py-[10px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 text-[18px]' required onChange={(e) => setAssistantName(e.target.value)} value={assistantName}/>
{
  assistantName && <button  className='min-w-[250px] mt-[20px] h-[60px] rounded-full bg-white text-black font-semibold text-[18px] cursor-pointer' disabled={loading} onClick={() => {
    navigate("/customize2")
    handleUpdateAssistant()
    }}>{ !loading? "Create Your Assistant" : "Loading..."}</button>
}
     

    </div>
  )
}

export default Customize2

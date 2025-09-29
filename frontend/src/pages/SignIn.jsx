import React, { use, useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import {IoEye, IoEyeOff} from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext';
import axios from 'axios';

 function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const {serverUrl,userData,setUserData} = useContext(userDataContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading,setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    // Handle sign in logic here
    try {
//      let result = await axios.post(`${serverUrl}/api/auth/signup`, {name, email, password}, {withCredentials: true},{
//   headers: { 'Content-Type': 'application/json' }
// });
// ...existing code...
 let result = await axios.post(
    `${serverUrl}/api/auth/signin`,
    { email, password },
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    }
  );
  // console.log(result);
  // alert(result.data);

  //  console.log("✅ User details:", result); 
   setUserData(result.data); // Update userData in context
   setLoading(false);
   navigate('/');
  // alert(`Welcome ${result.data.user.name}!`);
    } catch (error) {
      console.error("❌ Error during sign up:", error);
      setLoading(false);
      setUserData(null);
      setErr( error.response.data.message);
    }
  }

  return (
    <div className='w-full h-[100vh] flex items-center justify-center' style={{ backgroundImage: `url(${bg})` , backgroundSize: 'cover' }}>
      <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black rounded-lg p-8 flex flex-col items-center justify-center gap-[20px]  px-[20px]' onSubmit={handleSignIn}>
        <h1 className='text-[30px] font-semibold text-white text-center mb-[30px]'>
            Welcome to <span className='text-blue-400'>Virtual Assistance</span>
        </h1>

        <input type="email" placeholder="Enter your email" className='w-full h-[60px] rounded-full px-[20px] py-[10px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 text-[18px]' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
       <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
         <input type={showPassword ? "text" : "password"} placeholder="Enter your password" className='w-full h-full rounded-full px-[20px] py-[10px] outline-none bg-transparent text-white placeholder-gray-300 text-[18px]' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
         {!showPassword ? (
           <IoEyeOff className='absolute right-[20px] top-[18px] w-[25px] h-[25px] text-white  cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
         ) : (
           <IoEye className='absolute right-[20px] top-[18px] w-[25px] h-[25px] text-white  cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
         )}
       </div>
        {err.length > 0 && <p className='text-red-500 text-[17px]'>*{err}</p>}
       <button type="submit" className='w-full mt-[20px] h-[60px] rounded-full bg-blue-500 text-white font-semibold text-[18px] cursor-pointer' disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
       <p className='text-white text-[18px]' >Want to create a new account? <span className='text-blue-400 cursor-pointer' onClick={() => navigate('/signup')}>Sign Up</span></p>
      </form>
    </div>
  )
}

export default SignIn

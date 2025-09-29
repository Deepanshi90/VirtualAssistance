import React, { use, useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import {IoEye, IoEyeOff} from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/userContext';
import axios from 'axios';


 function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const {serverUrl,setUserData,userData} = useContext(userDataContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false); 
  const [err, setErr] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    // Handle sign up logic here
    try {
//      let result = await axios.post(`${serverUrl}/api/auth/signup`, {name, email, password}, {withCredentials: true},{
//   headers: { 'Content-Type': 'application/json' }
// });
// ...existing code...
 let result = await axios.post(
    `${serverUrl}/api/auth/signup`,
    { name, email, password },
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    }
  );
  setUserData(result.data.user); // Update userData in context  
  // console.log(result);
  // alert(result.data);
  //  console.log("✅ User details:", result.data.user); 
  // console.log("✅ Token:", result.data.token); // optional
setLoading(false);
navigate('/customize');
  // alert(`Welcome ${result.data.user.name}!`);
    } catch (error) {
      console.error("❌ Error during sign up:", error);
      setErr( error.response.data.message);
      setUserData(null);
      setLoading(false);
    }
  }

  return (
    <div className='w-full h-[100vh] flex items-center justify-center' style={{ backgroundImage: `url(${bg})` , backgroundSize: 'cover' }}>
      <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black rounded-lg p-8 flex flex-col items-center justify-center gap-[20px]  px-[20px]' onSubmit={handleSignUp}>
        <h1 className='text-[30px] font-semibold text-white text-center mb-[30px]'>
            Welcome to <span className='text-blue-400'>Virtual Assistance</span>
        </h1>
        <input type="text" placeholder="Enter your name" className='w-full h-[60px] rounded-full px-[20px] py-[10px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 text-[18px]' required onChange={(e)=>setName(e.target.value)} value={name}/>
        <input type="email" placeholder="Enter your email" className='w-full h-[60px] rounded-full px-[20px] py-[10px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 text-[18px]' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
       <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
         <input type={showPassword ? "text" : "password"} placeholder="Enter your password" className='w-full h-full rounded-full px-[20px] py-[10px] outline-none bg-transparent text-white placeholder-gray-300 text-[18px]' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
         {!showPassword ? (
           <IoEyeOff className='absolute right-[20px] top-[18px] w-[25px] h-[25px] text-white  cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
         ) : (
           <IoEye className='absolute right-[20px] top-[18px] w-[25px] h-[25px] text-white  cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
         )}
       </div>
        {err.length > 0 && <p className='text-red-500 text-[18px]'>*{err}</p>}
       <button type="submit" className='w-full mt-[20px] h-[60px] rounded-full bg-blue-500 text-white font-semibold text-[18px] cursor-pointer' disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
       <p className='text-white text-[18px]' >Already have an account? <span className='text-blue-400 cursor-pointer' onClick={() => navigate('/signin')}>Sign In</span></p>
      </form>
    </div>
  )
}

export default SignUp


// import React, { useState, useContext } from 'react';
// import bg from "../assets/authBg.png";
// import { IoEye, IoEyeOff } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
// import { userDataContext } from '../context/userContext';
// import axios from 'axios';

// function SignUp() {
//   const [showPassword, setShowPassword] = useState(false);
//   const { serverUrl, setUserData } = useContext(userDataContext);
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");
//   const [step, setStep] = useState(1); // 1: signup, 2: otp verification

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setErr("");
//     setLoading(true);
//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/auth/signup`,
//         { name, email, password },
//         { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
//       );
//       setLoading(false);
//       // Move to OTP step
//       setStep(2);
//     } catch (error) {
//       console.error("❌ Error during sign up:", error);
//       setErr(error.response?.data?.message || "Something went wrong");
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setErr("");
//     setLoading(true);
//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/auth/verifyEmail`,
//         { email, otp },
//         { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
//       );

//       setUserData(result.data.user); // store user in context
//       setLoading(false);
//       navigate('/home'); // navigate to home page after verification
//     } catch (error) {
//       console.error("❌ OTP verification error:", error);
//       setErr(error.response?.data?.message || "Invalid OTP");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='w-full h-[100vh] flex items-center justify-center' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
//       {step === 1 && (
//         <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black rounded-lg p-8 flex flex-col items-center justify-center gap-[20px] px-[20px]' onSubmit={handleSignUp}>
//           <h1 className='text-[30px] font-semibold text-white text-center mb-[30px]'>
//             Welcome to <span className='text-blue-400'>Virtual Assistance</span>
//           </h1>
//           <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)}
//             className='w-full h-[60px] rounded-full px-[20px] py-[10px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 text-[18px]' required />
//           <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
//             className='w-full h-[60px] rounded-full px-[20px] py-[10px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 text-[18px]' required />
//           <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
//             <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}
//               className='w-full h-full rounded-full px-[20px] py-[10px] outline-none bg-transparent text-white placeholder-gray-300 text-[18px]' required />
//             {!showPassword ? (
//               <IoEyeOff className='absolute right-[20px] top-[18px] w-[25px] h-[25px] text-white cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
//             ) : (
//               <IoEye className='absolute right-[20px] top-[18px] w-[25px] h-[25px] text-white cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
//             )}
//           </div>
//           {err && <p className='text-red-500 text-[18px]'>*{err}</p>}
//           <button type="submit" className='w-full mt-[20px] h-[60px] rounded-full bg-blue-500 text-white font-semibold text-[18px] cursor-pointer' disabled={loading}>
//             {loading ? "Loading..." : "Sign Up"}
//           </button>
//           <p className='text-white text-[18px]'>Already have an account? <span className='text-blue-400 cursor-pointer' onClick={() => navigate('/signin')}>Sign In</span></p>
//         </form>
//       )}

//       {step === 2 && (
//         <form className='w-[90%] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black rounded-lg p-8 flex flex-col items-center justify-center gap-[20px] px-[20px]' onSubmit={handleVerifyOtp}>
//           <h1 className='text-[30px] font-semibold text-white text-center mb-[30px]'>Enter OTP</h1>
//           <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)}
//             className='w-full h-[60px] rounded-full px-[20px] py-[10px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 text-[18px]' required />
//           {err && <p className='text-red-500 text-[18px]'>*{err}</p>}
//           <button type="submit" className='w-full mt-[20px] h-[60px] rounded-full bg-blue-500 text-white font-semibold text-[18px] cursor-pointer' disabled={loading}>
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>
//       )}
//     </div>
//   )
// }

// export default SignUp;

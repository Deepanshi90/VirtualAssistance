import React, { useContext, useEffect, useState } from 'react';
import OtpBox from '../../components/OtpBox';
import { Button } from '@mui/material';
import { postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const history = useNavigate();
  const context = useContext(MyContext);

  // useEffect(() => {
  //   const email = localStorage.getItem("userEmail");
  //   if (email) {
  //     setUserEmail(email);
  //   }
  // }, []);


  const handleOtpChange = (value) => {
    setOtp(value);
  };

  // const verifyOTP = (e) => {
  //   e.preventDefault();

  //   const actionType = localStorage.getItem("actionType");

  //   if(actionType !== "forgot-password"){
  //     postData("/api/user/verifyEmail", {
  //       // email: userEmail,
  //       email: localStorage.getItem("userEmail"),
  //       otp: otp
  //     }).then((res) => {
  //       if (res?.error === false) {
  //         context.alertBox("success", res?.message);
  //         localStorage.removeItem("userEmail");
  //         history("/login");
  //       } else {
  //         context.alertBox("error", res?.message);
  //       }
  //     });
  //   }
  //   else{
  //     postData("/api/user/verify-forgot-password-otp", {
  //       // email: userEmail,
  //       email: localStorage.getItem("userEmail"),
  //       otp: otp
  //     }).then((res) => {
  //       if (res?.error === false) {
  //         context.alertBox("success", res?.message);
  //         history("/forget-password");
  //       } else {
  //         context.alertBox("error", res?.message);
  //       }})
  //   }

    
  // };

// const actionType = localStorage.getItem("actionType");
// alert(actionType)
//   const verifyOTP = (e) =>{
//     e.preventDefault();

    
// // alert(actionType);
//     if(actionType !== "forget-password"){
//       postData("/api/user/verifyEmail",{
//         email: localStorage.getItem("userEmail"),otp: otp
//       }).then((res) =>{
//         console.log(res);
//         if(res?.error === false){
//           context.alertBox("success",res?.message);
//           localStorage.removeItem("userEmail");
//           history("/forgot-password");
//         }
//         else{
//           context.alertBox("error",res?.message);
//         }
        
//       })
//     }
//     else{
//       postData("/api/user/forgot-password",{
//         email: localStorage.getItem("userEmail")
//       }).then((res) =>{
//         console.log(res);
//         if(res?.error === false){
//           context.alertBox("success",res?.message);
//           localStorage.removeItem("userEmail");
//           history("/login");
//         }
//         else{
//           context.alertBox("error",res?.message);
//         }
        
//       })
//     }

    
//   }

  const verifyOTP = (e) =>{
    e.preventDefault();
    const actionType = localStorage.getItem("actionType");

    if(actionType !== "forgot-password"){
      postData("/api/auth/verifyEmail",{
        email: localStorage.getItem("userEmail"),
        otp: otp
      }).then((res) =>{
        if(res?.error === false){
          context.alertBox("success",res.message);
          localStorage.removeItem("userEmail")
          history("/login");
        }
        else{
          context.alertBox("error",res?.message);
        }
      })
    }else{
      postData("/api/user/verify-forgot-password-otp",{
        email: localStorage.getItem("userEmail"),
        otp: otp
      }).then((res) =>{
        if(res?.error === false){
          context.alertBox("success",res.message);
          history("/forget-password");
        }
        else{
          context.alertBox("error",res?.message);
        }
      })
    }
   
  }

return (
    <section className="section py-5 lg:py-10">
      <div className="container">
        <div className="card shadow-md w-full sm:w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <div className="text-center flex items-center justify-center">
            <img src="/verify2.png" alt="" width="80" />
          </div>
          <h3 className='text-center text-[18px] mt-4 text-black mb-1'>Verify OTP</h3>

          <p className='text-center mt-0 mb-4'>
            OTP sent to <span className='text-[#ff5252] font-bold'>{localStorage.getItem("userEmail") || "your email"}</span>
          </p>

          <form onSubmit={verifyOTP}>
            <OtpBox length={6} onChange={handleOtpChange} />

            <div className="flex items-center justify-center mt-5 px-3">
              <Button type="submit" className='btn-org btn-lg w-full'>Verify OTP</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Verify;
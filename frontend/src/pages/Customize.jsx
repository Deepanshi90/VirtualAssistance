import React, { use, useRef, useState } from 'react'
import Card from '../components/Card'
import { useContext } from 'react'
import { userDataContext } from '../context/userContext';
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/authBg.png'
import image4 from '../assets/image4.png'
import image5 from '../assets/image5.png'
import image6 from '../assets/image6.jpeg'
import image7 from '../assets/image7.jpeg'
import { RiImageAddLine } from "react-icons/ri";
import { Navigate, useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";

function Customize() {
  const { frontendImage, setFrontendImage, backendImage, setBackendImage, selectedImage, setSelectedImage } = useContext(userDataContext);
  const inputImage = useRef();
  //   const { userData } = useContext(userDataContext);
const navigate = useNavigate();
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));

  };
  return (
    <div className='w-full h-[100vh] flex items-center justify-center flex-col p-[20px] bg-gradient-to-t from-[black] to-[#030353] relative'>
       <MdKeyboardBackspace className='absolute text-white text-[30px] top-[30px] left-[30px] w-[25px] h-[25px] cursor-pointer ' onClick={() => navigate("/")}/>

      <h1 className='text-white text-[30px] text-center mb-[40px]'>Select your <span className='text-blue-500'>Assistant Image</span></h1>
        <div className='w-full max-w-[900px] flex justify-center items-center gap-[15px] flex-wrap'>
          <Card image={image1} />
           <Card image={image2} />
            <Card image={image3} />
             <Card image={image4} />
              <Card image={image5} />
               <Card image={image6} /> <Card image={image7} />

                 <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff66]  rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer transition-all duration-300 hover:border-2 hover:border-white flex items-center justify-center  ${selectedImage === "input" ? 'border-2 border-white shadow-2xl shadow-blue-950 ' : 'null'}`} onClick={()=>
                 { inputImage.current.click()
                  setSelectedImage("input")
                 }}>
                  {!frontendImage &&    <RiImageAddLine className='text-white w-[25px] h-[25px] '/>}
                  {frontendImage && <img src={frontendImage} alt="Uploaded" className='w-full h-full object-cover items-center flex justify-center' />}
                </div>
 <input type="file" accept='image/*' ref={inputImage}  hidden onChange={handleImage}/>
        </div>
        {selectedImage &&  <button  className='min-w-[150px] mt-[20px] h-[60px] rounded-full bg-white text-black font-semibold text-[18px] cursor-pointer' onClick={() => {navigate("/customize2")}}>Next</button>}
    </div>
  )
}

export default Customize

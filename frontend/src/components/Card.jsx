import React, { useContext } from 'react'
import { userDataContext } from '../context/userContext';

function Card({image}) {
    const { frontendImage, setFrontendImage, backendImage, setBackendImage, selectedImage, setSelectedImage } = useContext(userDataContext);
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff66]  rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer transition-all duration-300 hover:border-2 hover:border-white ${selectedImage === image ? 'border-2 border-white shadow-2xl shadow-blue-950 ' : 'null'}`} onClick={() => {setSelectedImage(image)
      setBackendImage(null)
      setFrontendImage(null)
    }}>
        <img src={image} alt="Card Image" className=' h-full object-cover rounded-2xl' />
    </div>
  )
}

export default Card

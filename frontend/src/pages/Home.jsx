// import React, { useContext } from 'react'
// import { userDataContext } from '../context/userContext';
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { useRef } from 'react';
// import aiImg from '../assets/ai.gif'
// import userImg from '../assets/user.gif'
// import { use } from 'react';


// function Home() {
//     const {userData,serverUrl,setUserData,getGeminiResponse} = useContext(userDataContext);
// const navigate = useNavigate();
// const [listening, setListening] = useState(false);
// const [userText, setUserText] = useState("");
// const [aiText, setAiText] = useState("");
// const isSpeakingRef = useRef(false);

// const recognitionRef = useRef(null);
// const synth =  window.speechSynthesis

//     const handleLogout = async() => {
//       try {
//         const result = await axios.get(`${serverUrl}/api/auth/logout`, {
//           withCredentials: true
//         });
        
//           setUserData(null);
//           navigate("/signin");
//       } catch (error) {
//         setUserData(null);
//         console.log(error);
//       }
      
//     }

//     // const speak = (text) => {
//     //   const utterance = new SpeechSynthesisUtterance(text);
//     //   utterance.lang = 'en-US';
//     //   window.speechSynthesis.speak(utterance);
//     // }

//     //   useEffect(() => {
//     //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     //     const recognition = new SpeechRecognition();
//     //     recognition.continuous = true;
//     //     recognition.lang = 'en-US';
        
//     //     recognition.onresult = async (e) => {
//     //       const transcript = e.results[e.results.length - 1][0].transcript.trim();
//     //       console.log("Transcript:", transcript);
        
//     //        if(transcript.toLowerCase().includes(userData?.assistantName.toLowerCase())){
//     //         const data = await getGeminiResponse(transcript)
//     //         console.log(data);
//     //        speak(data.response); 
//     //       }
//     //     }
//     //     recognition.start();


//     //   },[])

//     const startRecognition = () => {
//       try {
//         recognitionRef.current?.start();
//         console.log("Recognization Start");
//         setListening(true);
        
//       } catch (error) {
//         if(!error.message.includes("start")){
//           console.error(" Recognition State error",error);
//         }
//       }
//     }

// const speak = (text, recognition) => {
//  synth.cancel(); // clear old queue
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = 'en-US';

//   utterance.lang = 'hi-IN';
//   const voices = synth.getVoices();
//   const hindiVoice = voices.find(v => v.lang === 'hi-IN');
//   if (hindiVoice) {
//     utterance.voice = hindiVoice;
//   }


//   isSpeakingRef.current= true;
//   // Resume listening only after speech is finished
//   // utterance.onend = () => {
//   //   setAiText("");
//   //   setUserText("");
//   //   isSpeakingRef.current= false;
//   //   // recognition.start();
//   //   startRecognition();
//   // };
//   utterance.onend = () => {
//   setAiText("");
//   setUserText("");
//   // setAiImg("");  // 👈 reset AI image so userImg shows again
//   isSpeakingRef.current = false;
//   startRecognition();
// };


//   synth.speak(utterance);
// };

// const handleCommand = (data, recognition) => {
//   const { type, userInput, response } = data;
//   console.log(`Type: ${type}, User Input: ${userInput}, Response: ${response}`);

//   switch(type) {
//     // Voice/time/date commands
//     case 'get-date':
//     case 'get-day':
//     case 'get-month':
//     case 'get-time':
//     case 'get-year':
//     case 'general':
//       // Just speak the response
//       speak(response, recognition);
//       break;

//     // Google search
//     case 'google-search':
//       window.open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`, '_blank');
//       speak(response, recognition);
//       break;

//     // YouTube search or play
//     case 'youtube-search':
//     case 'youtube-play':
//       window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`, '_blank');
//       speak(response, recognition);
//       break;

//     // Calculator
//     case 'calculator-open':
//       window.open('https://www.google.com/search?q=calculator', '_blank');
//       speak(response, recognition);
//       break;

//     // Social media
//     case 'instagram-open':
//       window.open('https://www.instagram.com', '_blank');
//       speak(response, recognition);
//       break;
//     case 'facebook-open':
//       window.open('https://www.facebook.com', '_blank');
//       speak(response, recognition);
//       break;
//     case 'whatsapp-open':
//       window.open(`https://web.whatsapp.com/send?phone=<phone_number>&text=<message>`, '_blank');
//       speak(response, recognition);
//       break;

//     // Weather
//     case 'weather-show':
//       window.open('https://www.google.com/search?q=weather', '_blank');
//       speak(response, recognition);
//       break;

//     // Default fallback
//     default:
//       speak(response, recognition);
//       break;
//   }
// };

// useEffect(() => {
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();
//   recognition.continuous = true;
//   recognition.lang = 'en-US';
//   recognitionRef.current = recognition

//   const isRecognizingRef = {current: false}

//   const safeRecognization = () =>{
//     if(!isSpeakingRef.current && !isRecognizingRef.current){
//       try {
//         recognition.start();
//         console.log("Recognization Start");
        
//       } catch (error) {
//         if(error.name !== "InvalidStateError"){
//           console.error("State error",error);
          
//         }
//       }
//     }
//   }

//   recognition.onstart = () =>{
//     console.log("Recognization Started");
//     isRecognizingRef.current = true;
//     setListening(true);
    
//   }
//   recognition.onend = () =>{
//     console.log("Recognization End");
//     isRecognizingRef.current = false;
//     setListening(false);
    
//   }
//   if(!isSpeakingRef.current){
//     setTimeout(() =>{
//       safeRecognization();

//     },1000)
//   }

//   recognition.onerror = (event)=>{
//     console.warn("Recognition Error:", event.error);
//     isRecognizingRef.current = false;
//     setListening(false)
//     if(event.error !== "aborted" && !isRecognizingRef.current){
//       setTimeout(()=>{
//         safeRecognization();
//       },1000)
//     }

//   }

//   // recognition.onresult = async (e) => {
//   //   const transcript = e.results[e.results.length - 1][0].transcript.trim();
//   //   console.log("Transcript:", transcript);

//   //   if (transcript.toLowerCase().includes(userData?.assistantName.toLowerCase())) {
//   //     setAiText("");
//   //     setUserText(transcript);

//   //     recognition.stop(); // pause listening while processing
//   //     isRecognizingRef.current = false;
//   //     setListening(false);
//   //     const data = await getGeminiResponse(transcript);
//   //     console.log("Assistant:", data);

//   //     handleCommand(data, recognition); // pass recognition here
//   //     setUserText("");
//   //     setAiText(data.response);
//   //   }
//   // };

//   recognition.onresult = async (e) => {
//   const transcript = e.results[e.results.length - 1][0].transcript.trim();
//   console.log("Transcript:", transcript);

//   if (transcript.toLowerCase().includes(userData?.assistantName.toLowerCase())) {
//     setAiText("");               // clear old AI response
//     setUserText(transcript);     // show user message + image

//     recognition.stop();
//     isRecognizingRef.current = false;
//     setListening(false);

//     const data = await getGeminiResponse(transcript);
//     console.log("Assistant:", data);

//     handleCommand(data, recognition);

//     // ❌ Don't clear userText immediately
//     // ✅ Instead, just set AI response
//     setUserText("");
//     setAiText(data.response);
//   }
// };


//   // recognition.start();
// const fallback = setInterval(() =>{
//   if(!isSpeakingRef.current && !isRecognizingRef.current){
//     safeRecognization();

//   }
// },10000)
//   return () => {
//     recognition.stop();
//     setListening(false);
//     isRecognizingRef.current = false;
//     clearInterval(fallback);
//     synth.cancel();
//   };
// }, []);

    

// //     const speak = (text, recognition) => {
// //   window.speechSynthesis.cancel(); // clear old queue
// //   const utterance = new SpeechSynthesisUtterance(text);
// //   utterance.lang = 'en-US';

// //   // Resume listening only after speech is finished
// //   utterance.onend = () => {
// //     recognition.start();
// //   };

// //   window.speechSynthesis.speak(utterance);
// // };

// // const handleCommand = async (data) => {
// //    const {type,userInput,response} = data;
// //    // Handle different types of commands here if needed
// //    console.log(`Type: ${type}, User Input: ${userInput}, Response: ${response}`); 
// //    speak(response);

// //   //  if(type === 'get-date' || type === 'get-day' || type === 'get-month' || type === 'get-time' || type === 'get-year'){
// //   //   // Just speak the response
// //   //   speak(response);
// //   //  }
// //   //   else
// //    if(type === 'google-search'){
// //       const query = encodeURIComponent(userInput);
// //        window.open(`https://www.google.com/search?q=${query}`, '_blank');
// //    }
// //     else if(type === 'youtube-search'){
// //       const query = encodeURIComponent(userInput);
// //        window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
// //    }
// //     else if(type === 'youtube-play'){
// //       const query = encodeURIComponent(userInput);
// //        window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
// //    }
// //     else if(type === 'calculator-open'){
// //        window.open(`https://www.google.com/search?q=calculator`, '_blank');
// //    }
// //     else if(type === 'instagram-open'){
// //        window.open(`https://www.instagram.com`, '_blank');
// //    }
// //     else if(type === 'facebook-open'){
// //        window.open(`https://www.facebook.com`, '_blank');
// //    }
// //    else if(type === 'weather-show'){
// //        window.open(`https://www.google.com/search?q=weather`, '_blank');
// //    }
// //     // else if(type === 'general'){
// //     //     // Just speak the response
// //     //     speak(response);
// //     // }
// //     // else{
// //     //     // Default action
// //     //     speak(response);
// //     // }
// // }

// // useEffect(() => {
// //   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// //   const recognition = new SpeechRecognition();
// //   recognition.continuous = true;
// //   recognition.lang = 'en-US';

// //   recognition.onresult = async (e) => {
// //     const transcript = e.results[e.results.length - 1][0].transcript.trim();
// //     console.log("Transcript:", transcript);

// //     if (transcript.toLowerCase().includes(userData?.assistantName.toLowerCase())) {
// //       recognition.stop(); // pause listening while processing

// //       const data = await getGeminiResponse(transcript);
// //       console.log("Assistant:", data);

// //       // speak(data.response, recognition);
// //       handleCommand(data);
// //     }
// //   };

// //   recognition.start();

// //   return () => {
// //     recognition.stop(); // cleanup on unmount
// //     window.speechSynthesis.cancel();
// //   };
// // }, []);
    

//   return (
//         <div className='w-full h-[100vh] flex items-center justify-center flex-col bg-gradient-to-t from-[black] to-[#02023d] gap-[15px] relative'>

//           <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold absolute top-[20px] right-[20px] bg-white rounded-full text-[19px] cursor-pointer' onClick={handleLogout} >Log Out</button>

//            <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold absolute top-[20px] right-[192px] bg-white rounded-full text-[19px] px-[20px] cursor-pointer' onClick={() => navigate("/customize")} >Customize your assistant</button>

//           <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg' >

//             <img src={userData?.assistantImage} alt="Assistant Image" className='h-full object-cover'/>

//           </div>
//           <h1 className='text-white text-[18px] text-center mb-[40px] font-semibold'>I'm {userData?.assistantName}</h1>

//         {/* {userData?.assistantName && <div className='w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300' onClick={listening ? () => {
//           recognitionRef.current?.stop();
//           setListening(false);
//         } : startRecognition}>
//             <div className={`w-[50px] h-[50px] rounded-full bg-gradient-to-tr from-[#f12711] to-[#f5af19] flex items-center justify-center ${listening ? "animate-pulse" : ""}`}>
//               <div className='w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center'>  
//                 <div className={`w-[15px] h-[15px] rounded-full bg-gradient-to-tr from-[#f12711] to-[#f5af19] ${listening ? "animate-pulse" : ""}`}></div>
//               </div>
//             </div>
//           </div>} */}
//           {/* <img src={userImg} alt="User" className='w-[200px] ' /> */}


//       {/* Show user image while speaking */}
// {userText && !aiText && (
//   <img src={userImg} alt="User" className="w-[200px]" />
// )}

// {/* Show AI image when assistant responds */}
// {aiText && (
//   <img src={aiImg} alt="AI" className="w-[200px]" />
// )}

// {aiImg && <img src={userImg} alt="AI" className="w-[200px]" />}
// {/* {!aiImg && <img src={aiImg} alt="AI" className="w-[200px]" />} */}


//     </div>
//   )
// }

// export default Home


import React, { useContext, useEffect, useRef, useState } from 'react';
import { userDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import aiImg from '../assets/ai.gif';
import userImg from '../assets/user.gif';
import { CgMenuRight } from "react-icons/cg";
import {RxCross1} from "react-icons/rx";
import moment from "moment";


function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();

  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [currentImg, setCurrentImg] = useState(userImg); // <--- single image state
  const [ham,setHam] = useState(false);
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);
  const synth = window.speechSynthesis;

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      // console.log(error);
    }
  };

  const startRecognition = () => {
    try {
      recognitionRef.current?.start();
      // console.log("Recognition Start");
      setListening(true);
    } catch (error) {
      if (!error.message.includes("start")) console.error("Recognition State error", error);
    }
  };

  const speak = (text, recognition) => {
    synth.cancel(); // clear old queue

    // show AI image when assistant starts speaking
    setCurrentImg(aiImg);
    isSpeakingRef.current = true;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN'; // or 'en-US' as you need

    // try to pick a voice if available
    const voices = synth.getVoices();
    const hindiVoice = voices.find(v => v.lang === 'hi-IN');
    if (hindiVoice) utterance.voice = hindiVoice;

    utterance.onend = () => {
      // reset state after speech ends
      setAiText("");
      setUserText("");
      setCurrentImg(userImg); // switch back to user image
      isSpeakingRef.current = false;
      startRecognition();
    };

    synth.speak(utterance);
  };

  const handleCommand = (data, recognition) => {
    const { type, userInput, response } = data;
    // console.log(`Type: ${type}, User Input: ${userInput}, Response: ${response}`);

    switch (type) {
      case 'google-search':
        window.open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`, '_blank');
        speak(response, recognition);
        break;
      case 'youtube-search':
      case 'youtube-play':
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`, '_blank');
        speak(response, recognition);
        break;
      case 'instagram-open':
        window.open('https://www.instagram.com', '_blank');
        speak(response, recognition);
        break;
      case 'facebook-open':
        window.open('https://www.facebook.com', '_blank');
        speak(response, recognition);
        break;
      case 'weather-show':
        window.open('https://www.google.com/search?q=weather', '_blank');
        speak(response, recognition);
        break;
        case 'calculator-open':
      window.open('https://www.google.com/search?q=calculator', '_blank');
      speak(response, recognition);
      break;
      case 'whatsapp-open':
      window.open(`https://web.whatsapp.com`, '_blank');
      speak(response, recognition);
      break;
    //     case "location":
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const { latitude, longitude } = position.coords;
    //       speak(`Your current location is latitude ${latitude} and longitude ${longitude}`, recognition);
    //       window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, "_blank");
    //     },
    //     (error) => {
    //       speak("Sorry, I could not get your location.", recognition);
    //     }
    //   );
    // } else {
    //   speak("Geolocation is not supported by your browser.", recognition);
    // }
    // break;
  case 'news':
      // News response comes from backend
      // assistant.response already contains top 10 headlines
      // console.log("News headlines:", response);

      // Speak the headlines
      speak(response, recognition);

      // Optional: show in UI if you have a text area or chat window
      // setNews(response);
      break;

      case 'news-detail':
        // console.log("News detail:", response );
        speak(response, recognition);
        break;
        

    case "location":
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Use OpenStreetMap Reverse Geocoding
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        
        const address = data.address;
        const city = address.city || address.town || address.village;
        const state = address.state;
        const country = address.country;
        const area = address.suburb || address.neighbourhood;
        
        const fullLocation = `${area || ""}, ${city}, ${state}, ${country}`;
        
        speak(`Your current location is ${fullLocation}`, recognition);
      },
      (error) => {
        speak("Sorry, I could not get your location.", recognition);
      }
    );
  } else {
    speak("Geolocation is not supported by your browser.", recognition);
  }
  break;

      case 'get-date':
        speak(`Current date is ${moment().format('YYYY-MM-DD')}`, recognition);
      case 'get-day':
        speak(`Current day is ${moment().format('dddd')}`, recognition);
      case 'get-month':
        speak(`Current month is ${moment().format('MMMM')}`, recognition);
      case 'get-time':
        speak(`Current time is ${moment().format('h:mm:ss a')}`, recognition);
      case 'get-year':
        speak(`Current year is ${moment().format('YYYY')}`, recognition);
      default:
        speak(response, recognition);
        break;
    }
  };

  const speakGreeting = () => {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  const greeting = new SpeechSynthesisUtterance(
    `Hello! ${userData.name}, I am your assistant. How can I help you today?`
  );
  greeting.lang = "hi-IN";
  greeting.voice = voices.find(v => v.lang === "hi-IN") || voices[0];

  // When greeting ends, start recognition safely
  greeting.onend = () => {
    startTimeout(() => {
      if (recognitionRef.current && !isSpeakingRef.current) {
        isRecognizingRef.current = true;
        // recognitionRef.current.start();
      }
    }, 1000);
  };

  synth.speak(greeting);
};
  const startTimeout = (callback, delay) => {
    const timeoutId = setTimeout(() => {
      callback();
      clearTimeout(timeoutId);
    }, delay);
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return console.warn("SpeechRecognition not supported in this browser");

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    const isRecognizingRef = { current: false };

    const safeRecognization = () => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start();
          // console.log("Recognition Start");
        } catch (error) {
          if (error.name !== "InvalidStateError") console.error("State error", error);
        }
      }
    };

    recognition.onstart = () => {
      // console.log("Recognition Started");
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      // console.log("Recognition End");
      isRecognizingRef.current = false;
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.warn("Recognition Error:", event.error);
      isRecognizingRef.current = false;
      setListening(false);
      if (event.error !== "aborted" && !isRecognizingRef.current) {
        setTimeout(safeRecognization, 1000);
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      // console.log("Transcript:", transcript);

      if (transcript.toLowerCase().includes(userData?.assistantName?.toLowerCase())) {
        // show the user image when user speaks
        setCurrentImg(userImg);
        setUserText(transcript);

        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);

        const data = await getGeminiResponse(transcript); // assume returns {type, userInput, response}
        // console.log("Assistant:", data);

        // let handleCommand/speak manage switching to aiImg (speak sets it)
        handleCommand(data, recognition);

        setUserText("");
        setAiText(data.response); // this will not cause image duplication
      }
    };

    // start recognition safely
    setTimeout(safeRecognization, 500);

    const fallback = setInterval(() => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) safeRecognization();
    }, 10000);
    
    // window.speechSynthesis.onvoiceschanged = () => {
    //   // just to ensure voices are loaded
    //   console.log("Voices changed/loaded");
    //   const greeting = new SpeechSynthesisUtterance(`Hello! ${userData.name} I am your assistant. How can I help you today?`);
    //   greeting.lang = 'hi-IN';
    //   greeting.onend = () => {
    //     startTimeout(safeRecognization, 1000);
    //   }
    //   window.speechSynthesis.speak(greeting);
    // }

      // ---- ADD GREETING HERE ----
  if (window.speechSynthesis.getVoices().length > 0) {
    speakGreeting();
  } else {
    window.speechSynthesis.onvoiceschanged = speakGreeting;
  }
    // --------------------------
    return () => {
      recognition.stop();
      setListening(false);
      isRecognizingRef.current = false;
      clearInterval(fallback);
      synth.cancel();
    };
  }, [userData, getGeminiResponse]);

//   return (
//     <div className='w-full h-[100vh] flex items-center justify-center flex-col bg-gradient-to-t from-[black] to-[#02023d] gap-[15px]'>
//       <CgMenuRight className='lg:hidden text-white text-[24px] cursor-pointer absolute top-[20px] right-[20px] w-[25px] h-[25px]'  onClick={() => setHam(true)}/>
//       <div className={`w-[300px] h-[400px] p-[20px] bg-black bg-opacity-50 rounded-4xl shadow-lg flex flex-col gap-[20px] absolute top-[80px] right-0 z-50 ${ham ? "translate-x-0" : "translate-x-full"} lg:hidden`}>
//           <RxCross1 className='text-white text-[24px] cursor-pointer absolute top-[20px] right-[20px] w-[25px] h-[25px]'   onClick={() => setHam(false)}/>

//         <button
//         className='min-w-[150px] h-[60px] text-black font-semibold  bg-white rounded-full text-[19px] cursor-pointer'
//         onClick={handleLogout}
//       >
//         Log Out
//       </button>

//       <button
//         className='min-w-[150px] h-[60px] text-black font-semibold bg-white rounded-full text-[19px] px-[20px] cursor-pointer'
//         onClick={() => navigate("/customize")}
//       >
//         Customize your assistant
//       </button>

// <div className='w-full h-[2px] bg-gray-400'></div>
// <h1 className='text-white text-[24px] font-semibold'>History</h1>

// <div className='w-full h-[400px] gap-[20px] overflow-y-auto flex flex-col  '>
//   {/* {userData?.history?.length === 0 && <h1 className='text-white text-[18px]'>No history found</h1> }
//   {userData?.history?.map((item, index) => (
//     <div key={index} className='w-full p-[10px] bg-white bg-opacity-20 rounded-2xl flex flex-col gap-[10px] '>
//       <div className='flex gap-[10px]'> 
//         <img src={userImg} alt="User" className='w-[40px]' />
//         <p className='text-white text-[16px] break-words'>{item.command}</p>
//       </div>
//       <div className='flex gap-[10px]'>
//         <img src={aiImg} alt="AI" className='w-[40px]' />
//         <p className='text-white text-[16px] break-words'>{item.response}</p>
//       </div>
//     </div>
//   ))} */}
//   {/* {userData.history?.map((his, index) => (
//   <span key={index} className='text-white text-[16px] break-words'>
//     {his}
//   </span>
// ))} */}
// {userData.history?.map((his, index) => (
//     <span key={index} className='text-white text-[16px] break-words block mb-1'>
//       {his}
//     </span>
//   ))}

// </div>

//       </div>
//       <button
//         className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold absolute top-[20px] right-[20px] bg-white rounded-full text-[19px] cursor-pointer hidden lg:block'
//         onClick={handleLogout}
//       >
//         Log Out
//       </button>

//       <button
//         className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold absolute top-[20px] right-[192px] bg-white rounded-full text-[19px] px-[20px] cursor-pointer hidden lg:block'
//         onClick={() => navigate("/customize")}
//       >
//         Customize your assistant
//       </button>

//       <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
//         <img src={userData?.assistantImage} alt="Assistant" className='h-full object-cover' />
//       </div>

//       <h1 className='text-white text-[18px] text-center mb-[40px] font-semibold'>I'm {userData?.assistantName}</h1>

//       {/* ---------- single image controlled by state ---------- */}
//       <img src={currentImg} alt="Assistant/User" className="w-[200px]" />
//       <h1 className='text-white text-[18px] text-center mb-[40px] font-semibold'>{userText?userText: aiText?aiText:""}</h1>
//     </div>
//   );

return (
  <div className='w-full h-[100vh] flex items-center justify-center flex-col bg-gradient-to-t from-black to-[#02023d] gap-[15px] relative'>
    
    {/* Hamburger menu for mobile */}
    <CgMenuRight
      className='lg:hidden text-white text-[24px] cursor-pointer absolute top-[20px] right-[20px]'
      onClick={() => setHam(true)}
    />

    {/* Sidebar menu */}
    <div
      className={`
        fixed top-0 right-0 w-[300px] h-full p-[20px] bg-black bg-opacity-10 backdrop-blur-2xl rounded-l-4xl shadow-lg 
        flex flex-col gap-[20px] z-50 transform transition-transform duration-300 ease-in-out
        ${ham ? "translate-x-0" : "translate-x-full"} transition-transform
      `}
    >
      {/* Close button */}
      <RxCross1
        className='text-white text-[20px] cursor-pointer absolute top-[5px] right-[10px]'
        onClick={() => setHam(false)}
      />

      <button
        className='min-w-[150px] h-[60px] text-black font-semibold bg-white rounded-full text-[19px] cursor-pointer'
        onClick={handleLogout}
      >
        Log Out
      </button>

      <button
        className='min-w-[150px] h-[60px] text-black font-semibold bg-white rounded-full text-[19px] cursor-pointer'
        onClick={() => navigate("/customize")}
      >
        Customize your assistant
      </button>

      <div className='w-full h-[2px] bg-gray-400'></div>

      <h1 className='text-white text-[24px] font-semibold'>History</h1>

      {/* History container */}
      <div className='w-full h-[400px] flex flex-col gap-[10px] overflow-y-auto'>
        {userData.history?.length === 0 && (
          <h1 className='text-white text-[18px]'>No history found</h1>
        )}
        {userData.history?.map((his, index) => (
          <span key={index} className='text-white text-[16px] break-words block mb-1'>
            {his}
          </span>
        ))}
      </div>
    </div>

    {/* Desktop buttons */}
    <button
      className='hidden lg:block min-w-[150px] h-[60px] text-black font-semibold absolute top-[20px] right-[20px] bg-white rounded-full text-[19px] cursor-pointer'
      onClick={handleLogout}
    >
      Log Out
    </button>

    <button
      className='hidden lg:block min-w-[150px] h-[60px] text-black font-semibold absolute top-[20px] right-[192px] bg-white rounded-full text-[19px] cursor-pointer p-[10px]'
      onClick={() => navigate("/customize")}
    >
      Customize your assistant
    </button>

    {/* Assistant image */}
    <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
      <img
        src={userData?.assistantImage}
        alt='Assistant'
        className='h-full object-cover'
      />
    </div>

    <h1 className='text-white text-[18px] text-center mb-[40px] font-semibold'>
      I'm {userData?.assistantName}
    </h1>

    {/* Single image controlled by state */}
    <img src={currentImg} alt='Assistant/User' className='w-[200px]' />
    <h1 className='text-white text-[18px] text-center mb-[40px] font-semibold'>
      {userText ? userText : aiText ? aiText : ""}
    </h1>
  </div>
);

}

export default Home;

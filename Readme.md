# 🤖 AI Virtual Assistant – JARVIS-Style (MERN + Gemini + Voice AI)

A fully functional **AI Virtual Assistant** built with the **MERN Stack**, powered by **Gemini AI**, and enhanced with **real-time voice interaction** using the Web Speech API.  
This assistant can **talk, think, customize itself, authenticate users, and respond intelligently** — just like JARVIS.

---

## 🚀 Live Demo

🔗 Try the assistant here:  
👉 **https://virtualassistance-jht5.onrender.com/**

---

## 🌟 Features

### 🎤 **Voice Interaction**
- Real-time speech recognition  
- Natural text-to-speech response  
- Smooth JARVIS-style conversation  

### 🧠 **AI Intelligence (Gemini AI)**
- Smart replies  
- Dynamic prompt handling  
- Real conversational flow  

### 🔐 **Authentication System**
- Signup/Login system  
- JWT-based authentication  
- Password encryption using bcryptjs  

### 🎨 **Customization**
- Change assistant name  
- Upload custom assistant images  
- Personalized AI avatar  
- Cloud image hosting (Cloudinary)  

### 🌐 **Modern Full-Stack App**
- MERN (MongoDB, Express, React, Node.js)  
- Mobile responsive  
- Free deployment on Render  

---

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- Web Speech API  
- Axios  

### **Backend**
- Node.js  
- Express.js  
- MongoDB  
- JWT Authentication  
- bcryptjs  
- Multer (file uploads)  
- Cloudinary (image hosting)  

### **AI Engine**
- **Gemini AI API**

### **Deployment**
- Render (Free Hosting)

---

## 📦 Project Structure

/backend
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── server.js

/frontend
├── src/
├── components/
├── pages/
├── services/
├── utils/

🖥️ Backend Setup (Node.js + Express)
2️⃣ Install Backend Dependencies
cd backend
npm install

3️⃣ Create .env File
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_key

4️⃣ Start Backend
npm start

🌐 Frontend Setup (React)
5️⃣ Install Frontend Dependencies
cd ../frontend
npm install

6️⃣ Start Frontend
npm start
🌍 Deployment (Render)
Deployment Includes:

Auto-build frontend

Auto-deploy backend

Environment variables support

Free hosting

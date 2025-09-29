import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';


const geminiResponse = async (command, assistantName, userName) => {
    try {
        const apiUrl = process.env.GEMINI_API_URL;

//         const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}. 
//         You are not Google. You will now behave like a voice-enabled assistant. 
        
//         Your task is to understand the user's natural language input and respond with a JSON object in this format:
        
//         {
//   "type": "general" | "google-search" | "youtube-search" | "youtube-play" |
//            "get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" |
//            "instagram-open" | "facebook-open" | "weather-show",
//   "userInput": "<original user input> {only remove your name from userinput if exists} and agar kisi ne google ya youtube pe kuch search karne ko bola hai to userInput me only bo search baala text jaye,
//   "response": "<a short spoken response to read out loud to the user>"
// }

// Instructions:
// - "type": determine the intent of the user.
// - "userinput": original sentence the user spoke.
// - "response": A short voice-friendly reply, e.g., "Sure, playing it now", "Here's what I found", "Today is Tuesday", etc.

// Type meanings:
// - "general": if it's a factual or informational question.
// - "google-search": if user wants to search something on Google.
// - "youtube-search": if user wants to search something on YouTube.
// - "youtube-play": if user wants to directly play a video or song.
// - "calculator-open": if user wants to open a calculator.
// - "instagram-open": if user wants to open instagram.
// - "facebook-open": if user wants to open facebook.
// - "weather-show": if user wants to know weather
// - "get-time": if user asks for current time.
// - "get-date": if user asks for today's date.
// - "get-day": if user asks for today's day.
// - "get-month": if user asks for current month.

// Important:
// - Always respond in the specified JSON format.
// - Keep "response" concise and voice-friendly.
// - If unsure, default to "general" type with a polite response.
// - Here is the user input: "${command}"
// - Respond only with the JSON object, nothing else.
// - Use ${userName} as the creator of ${assistantName}.

// now your userInput is - ${command}

// `;

const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object in this format:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" |
           "get-time" | "get-date" | "get-day" | "get-month" | "get-year" | "calculator-open" |
           "instagram-open" | "facebook-open" | "weather-show" | "whatsapp-open" | "location" | "news" | "news-detail",
  "userInput": "<original user input, cleaned as per rules>. 
                If the user asks to search or open something, include only the exact search/app name.",
  "response": "<a short spoken response or factual explanation>"
}

Instructions:
- Determine the user's intent and classify it into one of the types above.
- "userInput": copy the original sentence the user spoke, removing your assistant name if present.
- "response": 
   - For "general" questions asking definitions, facts, or explanations (e.g., "What is JavaScript?"), provide a short, clear, helpful explanation.
   - For "general" casual conversation (e.g., "hello", "ok", "good morning"), provide a brief, voice-friendly reply like "Hello there!" or "Got it".
   - For other types, keep responses concise and voice-friendly (e.g., "Sure, playing it now", "Here's what I found", "Today is Tuesday").
- If the user says "open X" (like Google, YouTube, Instagram, Facebook, Calculator, Weather, WhatsApp):
    - "open Google" → "google-search", userInput: "Google"
    - "open YouTube" → "youtube-search", userInput: "YouTube"
    - "open Instagram" → "instagram-open", userInput: "Instagram"
    - "open Facebook" → "facebook-open", userInput: "Facebook"
    - "open calculator" → "calculator-open", userInput: "calculator"
    - "open weather" → "weather-show", userInput: "weather"
    - "open WhatsApp" → "whatsapp-open", userInput: "WhatsApp"
- Respond with a short, voice-friendly message like "Opening WhatsApp for you".

- If the user asks about current date, day, time, month, or year:
     - "What is today's date?" → "get-date"
     - "What day is it?" → "get-day"
     - "What time is it?" → "get-time"
     - "What month is it?" → "get-month"
     - "What year is it?" → "get-year"
     - Always use the correct type instead of "general".
     - Respond with a short voice-friendly answer; the backend will provide real-time values.
- Never classify commands that can open apps/websites or ask about current date/time/year as "general".
- Always respond in the specified JSON format.
- Never include extra text outside the JSON.
- If unsure, default to "general" for conversational or factual questions only.
- Here is the user input: "${command}"
- Respond only with the JSON object, nothing else.
- Use ${userName} as the creator of ${assistantName}.

Now your userInput is - ${command}`;


        if (!apiUrl) {
            throw new Error('GEMINI_API_URL is not defined in environment variables');
        }
        const result = await axios.post(apiUrl, {
             "contents": [      {
        "parts": [
          {
            "text": prompt
          }
        ]
      }
    ]
        });

        return result.data.candidates[0].content.parts[0].text || "No response from Gemini API";
    } catch (error) {
        console.error('Error generating Gemini response:', error);
        throw error;
    }
}

export default geminiResponse;
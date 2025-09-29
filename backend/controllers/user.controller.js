import User from "../models/user.model.js";
import upload from "../middlewares/multer.js";
import uploadOnCloudinary from "../config/cloudinary.js"
import { response } from "express";
import geminiResponse from "../gemini.js";
import moment from "moment";
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from "../util/verifyEmailTemplate.js";
import dotenv from "dotenv";
dotenv.config();

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("❌ Error fetching current user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const updateAssistant = async (req, res) => {
    try {
        const {assistantName, imageUrl} = req.body;
        let assistantImage;
        if(req.file){
            assistantImage = await uploadOnCloudinary(req.file.path);
        }
        else{
            assistantImage = imageUrl;
        }

        const user = await User.findByIdAndUpdate(req.userId, { assistantName, assistantImage }, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("❌ Error updating user assistant error :", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const askToAssistant = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { command } = req.body;
        user.history.push(command );
        user.save();
        const userName = user.name;
        const assistantName = user.assistantName;
        if (!command) {
            return res.status(400).json({ message: "Command is required" });
        }
        const result = await geminiResponse(command, assistantName, userName);
        const jsonMatch = result.match(/{[\s\S]*}/);
        if (!jsonMatch) {
            return res.status(500).json({ response: "Sorry, I couldn't process your request." });

        }
       const gemResult = JSON.parse(jsonMatch[0]);
       const type = gemResult.type;
       switch(type){
        case 'get-date':
            return res.status(200).json({
                type,
                userInput: gemResult.userInput,
                response: `Current date is ${moment().format('YYYY-MM-DD')}  `
             });
        case 'get-time':
            return res.status(200).json({ 
                type,
                userInput: gemResult.userInput,
                response: `Current time is ${moment().format('h:mm:ss a')}` });
        case 'get-day':
            return res.status(200).json({
                type,
                userInput: gemResult.userInput,
                response: `Current day is ${moment().format('dddd')}`
            });
        case 'get-month':
           return res.status(200).json({
                type,
                userInput: gemResult.userInput,
                response: `Current month is ${moment().format('MMMM')}`
            });
            case 'get-year':
                return res.status(200).json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current year is ${moment().format('YYYY')}`
                });
            case 'google-search':
            case 'youtube-search':
            case 'youtube-play':
                case 'general':
            case 'calculator-open':
            case 'instagram-open':
            case 'facebook-open':
            case 'weather-show':
                case 'whatsapp-open':
                return res.status(200).json({
                    type,
                    userInput: gemResult.userInput,
                    response: gemResult.response, 
                });
                case 'location':
    return res.status(200).json({
        type,
        userInput: gemResult.userInput,
        response: "Fetching your current location..."
    });
    // case 'news':
    // try {
    //     const API_NEWSPAPER = process.env.API_NEWSPAPER;
    //     // Use either country, category, or q
    //     const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${API_NEWSPAPER}`;

    //     const resNews = await fetch(url);
    //     const data = await resNews.json();

    //     console.log("News API response:", data); // Debugging

    //     let headlines = "";

    //     if (data.articles && data.articles.length > 0) {
    //         headlines = "Here are the top 10 headlines:\n";
    //         data.articles.forEach((a, i) => {
    //             headlines += `${i + 1}. ${a.title}\n`;
    //         });
    //     } else {
    //         headlines = "Sorry, no news available right now.";
    //     }

    //     return res.status(200).json({
    //         type,
    //         userInput: gemResult.userInput,
    //         response: headlines
    //     });

    // } catch (error) {
    //     console.error("❌ Error fetching news:", error);
    //     return res.status(500).json({
    //         type,
    //         userInput: gemResult.userInput,
    //         response: "There was an error fetching the news."
    //     });
    // }

    case 'news':
    try {
        const API_NEWSPAPER = process.env.API_NEWSPAPER;

        // Extract topic from user input using simple regex or NLP
        // Example: "Please tell me top technology news"
        let topic = "general"; // default
        const lowerInput = gemResult.userInput.toLowerCase();

        if (lowerInput.includes("technology")) topic = "technology";
        else if (lowerInput.includes("sports")) topic = "sports";
        else if (lowerInput.includes("business")) topic = "business";
        else if (lowerInput.includes("health")) topic = "health";
        else if (lowerInput.includes("entertainment")) topic = "entertainment";
        // You can add more topics...

        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${topic}&pageSize=10&apiKey=${API_NEWSPAPER}`;

        const resNews = await fetch(url);
        const data = await resNews.json();

        console.log("News API response:", data);

        let headlines = "";

        if (data.articles && data.articles.length > 0) {
            headlines = `Here are the top 10 ${topic} headlines:\n`;
            data.articles.forEach((a, i) => {
                headlines += `${i + 1}. ${a.title}\n`;
            });
        } else {
            headlines = `Sorry, no ${topic} news available right now.`;
        }

        // Save articles in user session or DB for later details
        // For example, user.session.newsArticles = data.articles;

        return res.status(200).json({
            type,
            userInput: gemResult.userInput,
            response: headlines,
            articles: data.articles // send full data for details if requested
        });

    } catch (error) {
        console.error("❌ Error fetching news:", error);
        return res.status(500).json({
            type,
            userInput: gemResult.userInput,
            response: "There was an error fetching the news."
        });
    }


    case 'news-detail':
    const index = parseInt(assistant.userInput.match(/\d+/)[0]) - 1; // extract 1-based index
    const article = assistant.articles[index];
    if (article) {
        const detail = `${article.title}\n${article.description || "No description available"}\nRead more: ${article.url}`;
        speak(detail, recognition);
    } else {
        speak("Sorry, I couldn't find that headline.", recognition);
    }
    break;



            default:
                return res.status(200).json({
                    type: 'general',
                    userInput: gemResult.userInput,
                    response: "I'm not sure how to help with that."
                });

       }
    } catch (error) {
        console.error("❌ Error asking assistant:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
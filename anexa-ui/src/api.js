import axios from 'axios';

// This matches the @RequestMapping("/api/chat") in your Java Controller
const API_URL = "http://localhost:8080/api/chat";

export const sendMessageToAI = async (message) => {
    try {
        // We send a POST request with the 'message' in the body
        const response = await axios.post(`${API_URL}/send`, { message: message });
        
        // Java returns a Map: { "aiResponse": "..." }
        return response.data.aiResponse;
    } catch (error) {
        console.error("Connection Error:", error);
        return "I'm having trouble connecting to the Anexa server. Please make sure your Spring Boot app is running on port 8080.";
    }
};
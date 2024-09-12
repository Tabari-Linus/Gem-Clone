/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
const apiKey = process.env.REACT_APP_GOOGLE_GEMINI_APIKEY;

if (!apiKey) {
  throw new Error("Missing API Key");
}
const genAI = new GoogleGenerativeAI(apiKey);



  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function runChat(prompt) {
    const model = await genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
  
    const chatSession = model.startChat({
      generationConfig,
      // Optionally configure safety settings
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [],
    });
  
    const result = await chatSession.sendMessage(prompt);
    const resultText = await result.response.text(); // Await the text to be fully resolved
    console.log(resultText);
  
    return resultText;
  }
  
  export default runChat;
  
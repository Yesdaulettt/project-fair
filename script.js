// Get the chat form and chat log elements
const chatForm = document.getElementById("chat-form");
const chatLog = document.getElementById("chat-log");

// OpenAI API Key (get this from OpenAI dashboard)
const OPENAI_API_KEY =
  "sk-Gi8QEdPu0vLlqujj8YDmp0FPYCRbKA0z3jJ0bRAkS6T3BlbkFJluEDazsc9ByHX1zVvUTB6k5l5D9icXP3k9UxFveYoA";

// Handle form submission
chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get the user's message from the input
  const userInput = document.getElementById("user-input").value;

  // Add the user's message to the chat log
  addMessageToChatLog(userInput, "user");

  // Clear the input field
  document.getElementById("user-input").value = "";

  // Send the user's message to ChatGPT and get the AI's response
  const aiResponse = await getAIResponse(userInput);

  // Add the AI's message to the chat log
  addMessageToChatLog(aiResponse, "ai");
});

// Function to add a message to the chat log
function addMessageToChatLog(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  messageDiv.classList.add(sender === "user" ? "user-message" : "ai-message");
  chatLog.appendChild(messageDiv);
  chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
}

// Function to get a response from the OpenAI API
async function getAIResponse(userInput) {
  const apiEndpoint = "https://api.openai.com/v1/chat/completions";

  // API request payload
  const requestBody = {
    model: "gpt-3.5-turbo", // Model to use (e.g., gpt-3.5-turbo)
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: userInput },
    ],
    max_tokens: 150,
  };

  // API request options
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(apiEndpoint, requestOptions);
    const data = await response.json();
    const aiMessage = data.choices[0].message.content.trim();
    return aiMessage;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, there was an error processing your request.";
  }
}

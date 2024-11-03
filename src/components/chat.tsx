import React, { useState } from "react";
import Input from "./ui/input"; // Import your Input component
import { Button } from "./ui/button"; // Import your Button component
import { ChevronRightIcon } from "@radix-ui/react-icons";
//final
interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

const ChatArea: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Send message to server and get response
  const sendToServer = async (userMessage: Message) => {
    const fetchUrl = 'https://f26b-106-219-145-56.ngrok-free.app/spam';
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userMessage.text }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Message sent:', data);

        // Assume server response contains a "text" field with the bot's reply
        const botMessage: Message = {
          id: userMessage.id + 1,
          sender: "bot",
          text: data.response || "Server did not return a response",
        };

        // Add bot's response to chat
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // User's message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: inputValue,
    };

    // Add user's message to the chat
    setMessages([...messages, userMessage]);
    setInputValue(""); // Clear input field

    // Send message to server and handle bot's response
    sendToServer(userMessage);
  };

  return (
    <div className="flex flex-col h-full w-full bg-black">
      {/* Chat Display Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-black-100 rounded-lg">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-md ${
              msg.sender === "user" ? "bg-blue-500 text-white self-end" : msg.text==="This message looks like spam."?"bg-red-500 self-start":"bg-gray-300 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Form for Sending Messages */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-center md:justify-end space-y-4 md:space-y-0 md:space-x-4 p-4">
        <Input
          className="text-white"
          inputSize="medium"
          inputWidth="w-full md:w-[65vw]"
          placeholder="Enter the text"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button variant="default" type="submit" size="icon" className="mt-4 md:mt-4">
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatArea;

import React, { useState, useEffect } from "react";
import "./style.css";

export const TypingChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  // Mock AI response - in real implementation, this would call your AI API
  const mockAIResponse = (userMessage) => {
    return `Mock AI Response to: ${userMessage}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const newMessages = [
      ...messages,
      { text: inputText, sender: "user", timestamp: new Date() },
    ];
    setMessages(newMessages);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = mockAIResponse(inputText);
      setMessages((prev) => [
        ...prev,
        { text: aiResponse, sender: "ai", timestamp: new Date() },
      ]);
    }, 1000);

    setInputText("");
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p>{message.text}</p>
            <small>{message.timestamp.toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

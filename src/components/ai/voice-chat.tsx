import React, { useState, useEffect } from "react";
import "./style.css";

export const VoiceChat = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const handleToggleListening = () => {
    setIsListening(!isListening);
  };

  const handleSubmitVoice = () => {
    if (!transcript.trim()) return;

    // Add user's voice message
    setMessages((prev) => [
      ...prev,
      { text: transcript, sender: "user", timestamp: new Date() },
    ]);

    // Mock AI response
    setTimeout(() => {
      const aiResponse = `Mock AI Response to voice: ${transcript}`;
      setMessages((prev) => [
        ...prev,
        { text: aiResponse, sender: "ai", timestamp: new Date() },
      ]);
    }, 1000);

    setTranscript("");
  };

  return (
    <div className="voice-chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p>{message.text}</p>
            <small>{message.timestamp.toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      <div className="voice-controls">
        <button
          onClick={handleToggleListening}
          className={isListening ? "recording" : ""}>
          {isListening ? "Stop Recording" : "Start Recording"}
        </button>
        <p>Transcript: {transcript}</p>
        <button onClick={handleSubmitVoice} disabled={!transcript}>
          Send Voice Message
        </button>
      </div>
    </div>
  );
};

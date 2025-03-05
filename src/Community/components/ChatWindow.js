import React from "react";
import MessageInput from "./MessageInput";
import "./styles/chatWindow.css";
const ChatWindow = ({ messages }) => {
  return (
    <div className="flex flex-col h-full border rounded-lg p-4">
      <div className="flex-1 overflow-auto">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 border-b">
            <strong>{msg.user}</strong>: {msg.text}
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatWindow;

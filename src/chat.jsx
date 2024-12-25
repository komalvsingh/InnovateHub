import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Connect to WebSocket server
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    // Listen for user list
    newSocket.on("userList", (userList) => {
      setUsers(userList);
    });

    // Listen for messages
    newSocket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => newSocket.close();
  }, []);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      sender: "You",
      content: message,
      to: selectedUser,
      timestamp: new Date().toISOString(),
    };

    // Send message via socket
    socket.emit("sendMessage", newMessage);

    // Update local message list
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  };

  return (
    <ChatContainer>
      <Sidebar>
        <SidebarTitle>Users</SidebarTitle>
        <UserList>
          {users.map((user, index) => (
            <UserItem
              key={index}
              onClick={() => setSelectedUser(user)}
              isSelected={selectedUser === user}
            >
              {user}
            </UserItem>
          ))}
        </UserList>
      </Sidebar>
      <ChatWindow>
        {selectedUser ? (
          <>
            <ChatHeader>Chat with {selectedUser}</ChatHeader>
            <MessageList>
              {messages
                .filter(
                  (msg) =>
                    msg.to === selectedUser || msg.sender === selectedUser
                )
                .map((msg, index) => (
                  <Message
                    key={index}
                    isOwnMessage={msg.sender === "You"}
                  >
                    <strong>{msg.sender}:</strong> {msg.content}
                  </Message>
                ))}
            </MessageList>
            <MessageInputContainer>
              <MessageInput
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <SendButton onClick={handleSendMessage}>Send</SendButton>
            </MessageInputContainer>
          </>
        ) : (
          <NoChatSelected>Select a user to start chatting.</NoChatSelected>
        )}
      </ChatWindow>
    </ChatContainer>
  );
};


export const ChatContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f5f5f5;
`;

export const Sidebar = styled.div`
  width: 250px;
  background: #007bff;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const SidebarTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export const UserList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const UserItem = styled.div`
  padding: 10px 15px;
  background: ${(props) => (props.isSelected ? "#0056b3" : "transparent")};
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export const ChatWindow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
`;

export const ChatHeader = styled.div`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 20px;
`;

export const Message = styled.div`
  margin-bottom: 10px;
  text-align: ${(props) => (props.isOwnMessage ? "right" : "left")};
  color: ${(props) => (props.isOwnMessage ? "#007bff" : "#333")};
`;

export const MessageInputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const MessageInput = styled.textarea`
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
`;

export const SendButton = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export const NoChatSelected = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: #777;
`;


export default Chat;

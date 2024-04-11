import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import ActionCable from "actioncable";

const DirectChat = ({ agent, currentAgentId }) => {
  const [text, setText] = useState("");
  const [apiMessages, setApiMessages] = useState([]);

  
  useEffect(() => {
    console.log("Current agent ID:", currentAgentId);
    const endpoint = `api/v1/direct_chats?sender_id=${agent.id}&receiver_id=${currentAgentId}`;
    // Replace with your API endpoint
    axios
      .get(endpoint)
      .then((response) => {
        const formattedMessages = response.data.map((message) => ({
          ...message,
          sender: message.sender_id === agent.id ? "me" : "other",
        }));
        setApiMessages(formattedMessages);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

    const subscription = cable.subscriptions.create("DirectChatChannel", {
      connected: () => {
        console.log("Connected to the WebSocket!");
      },
      received: (response) => {
        console.log("Received a message:", response);
        const formattedMessage = {
          message: response.message,
          sender: response.sender_id === agent.id ? "me" : "other",
        };
        setApiMessages((prevMessages) => [...prevMessages, formattedMessage]);
      },
    });

    return () => {
      // Disconnect from the WebSocket when the component unmounts
      cable.subscriptions.remove(subscription);
    };
  }, [currentAgentId, agent.id]);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleSendMessage = () => {
    if (text.trim() !== "") {
      axios
        .post("api/v1/direct_chats", {
          sender_id: currentAgentId,
          receiver_id: agent.id,
          message: text,
        })
        .then((response) => {
          console.log(response.data); // This will log the created message to the console
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });

      setText("");
    }
  };
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-gray-100 p-4 rounded-lg">
      {/* Message list */}
      {apiMessages.map((message, index) => (
        <div
          key={index}
          className={`flex items-center mb-3 ${
            message.sender === "me" ? "justify-end" : "justify-start"
          }`}
        >
          {/* User avatar (optional) */}
          {message.sender !== "me" && (
            <img
              src={message.avatar}
              alt="User avatar"
              className="w-8 h-8 rounded-full mr-3"
            />
          )}

          {/* Message bubble */}
          <div
            className={`px-4 py-2 rounded-lg shadow-sm ${
              message.sender === "me"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {message.message}
          </div>
        </div>
      ))}

      {/* Input field */}
      <div className="flex mt-auto">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
          value={text}
          onChange={handleInputChange}
        />
        <button
          className="ml-3 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default DirectChat;

DirectChat.propTypes = {
  agent: PropTypes.shape({
    full_name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  currentAgentId: PropTypes.string.isRequired,
};

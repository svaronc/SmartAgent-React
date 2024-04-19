import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdChatboxes } from "react-icons/io";
import { MdMarkChatUnread } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import DirectChat from "../DirectChat/DirectChat";
import { useAppContext } from "../../context/AppContext";
import { useChatData } from "../../hooks/useChatData";

const Agents = () => {
  useChatData();

  const [agents, setAgents] = useState([]); // State variable to store the list of agents
  const [selecAgent, setSelecAgent] = useState(null); // State variable to store the selected agent
  const [currentAgentId, setCurrentAgentId] = useState(null); // State variable to store the current agent's ID
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    axios
      .get("/api/v1/agents") // Fetches the list of agents from the API
      .then((data) => {
        setAgents(data.data);
      }) // Updates the state variable with the fetched agents
      .catch((error) => {
        console.error("There was an error!", error);
      });
    const storedAgentId = localStorage.getItem("agent_id"); // Retrieves the agent ID from local storage
    if (storedAgentId) {
      setCurrentAgentId(storedAgentId); // Updates the state variable with the stored agent IDa
    }
  }, []);

  const handleChatClick = (agent) => {
    axios
      .put(`/api/v1/direct_chats/mark_as_read/${agent.id}`)
      .then((response) => {
        console.log("unreadMessages>>>>>", response.data);
        dispatch({
          type: "UPDATE_UNREAD",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    setSelecAgent(agent);
  };

  const sortedAgents = [...agents].sort((a, b) => {
    const aUnreadMessages = state.unreadMessages.some(
      (chat) => Number(chat.sender_id) === Number(a.id) && chat.read === false
    );
    const bUnreadMessages = state.unreadMessages.some(
      (chat) => Number(chat.sender_id) === Number(b.id) && chat.read === false
    );
  
    if (aUnreadMessages && !bUnreadMessages) {
      return -1;
    } else if (!aUnreadMessages && bUnreadMessages) {
      return 1;
    } else {
      return a.full_name.localeCompare(b.full_name);
    }
  });
  
  return (
    <div className="flex h-screen">
      <div className="flex h-screen flex-col bg-base-200 border-r-4 border-double w-[600px]">
        <div className="text-center mt-10">
          <h1 className="text-2xl">Agents</h1>
        </div>
        {sortedAgents.map((agent) => {
          const unreadMessagesFromAgent = state.unreadMessages.filter(
            (chat) =>
              Number(chat.sender_id) === Number(agent.id) && chat.read === false
          );
          return (
            agent.id !== Number(currentAgentId) && agent.full_name 
            !== 'Triage' && ( // Renders the agent card only if the agent ID is not equal to the current agent's ID
              <div
                key={agent.id}
                className="m-4 bg-white shadow-lg rounded-lg overflow-hidden flex items-center cursor-pointer"
                onClick={() => handleChatClick(agent)}
              >
                <div
                  data-tooltip-id={agent.email}
                  data-tooltip-content={agent.email}
                  className="flex justify-center items-center h-8 w-8 bg-gray-200 text-gray-700 rounded-full mx-3"
                >
                  <span className=" text-sm">{agent.full_name.charAt(0)}</span>
                  <ReactTooltip id={agent.email} effect="solid" />
                </div>
                <div className="p-4 flex-grow">
                {unreadMessagesFromAgent.some(
                      (message) => message.read === false
                    ) ? (
                  <h2 className="font-bold text-lg">{agent.full_name}</h2>) : (<h2 className="text-lg">{agent.full_name}</h2>)}
                </div>
                <div className="flex justify-end mr-5">
                  <a
                    href="#"
                    className="tool tooltip tooltip-left"
                    data-tip="Chat"
                  >
                    {unreadMessagesFromAgent.some(
                      (message) => message.read === false
                    ) ? (
                      <MdMarkChatUnread
                        className="self-end w-5 h-5 text-green-600"
                        data-tip="Chat"
                      />
                    ) : (
                      <IoMdChatboxes
                        className="self-end w-5 h-5"
                        data-tip="Chat"
                      />
                    )}
                  </a>
                </div>
              </div>
            )
          );
        })}
      </div>
      {selecAgent && (
        <DirectChat
          agent={selecAgent}
          currentAgentId={currentAgentId}
          selecAgent={selecAgent}
        />
      )}
    </div>
  );
};

export default Agents;

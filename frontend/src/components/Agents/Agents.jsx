import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdChatboxes } from "react-icons/io";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import DirectChat from "../DirectChat/DirectChat";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [selecAgent, setSelecAgent] = useState(null);
  const [currentAgentId, setCurrentAgentId] = useState(null);

  useEffect(() => {
    axios
      .get("/api/v1/agents")
      .then((data) => setAgents(data.data))
      .catch((error) => {
        console.error("There was an error!", error);
      });
      const storedAgentId = localStorage.getItem("agent_id")
      if (storedAgentId) {
        setCurrentAgentId(storedAgentId)
      }
  }, []);

  const handleChatClick = (agent) => {
    setSelecAgent(agent);
  };
  return (
    <div className="flex h-screen">
      <div className="flex h-screen flex-col bg-base-200 border-r-4 border-double w-[600px]">
        <div className="text-center mt-10">
          <h1 className="text-2xl">Agents</h1>
        </div>
        {agents.map((agent) => (
          agent.id !== Number(currentAgentId) && (
          <div
            key={agent.id}
            className="m-4 bg-white shadow-lg rounded-lg overflow-hidden flex items-center"
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
              <h2 className="font-bold text-lg">{agent.full_name}</h2>
            </div>
            <div className="flex justify-end mr-5">
              <a
                href="#"
                className="tool tooltip tooltip-left"
                data-tip="Chat"
                onClick={() => handleChatClick(agent)}
              >
                <IoMdChatboxes className="self-end w-5 h-5" data-tip="Chat" />
              </a>
            </div>
          </div>
          )
        ))}
      </div>
      {selecAgent && <DirectChat agent={selecAgent} currentAgentId={currentAgentId} selecAgent={selecAgent}/>}
    </div>
  );
};

export default Agents;

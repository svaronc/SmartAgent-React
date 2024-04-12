import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import { BsFillEnvelopeCheckFill, BsEnvelopeOpenFill } from "react-icons/bs";
import { MdPending } from "react-icons/md";
import { useAppContext } from "../../context/AppContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const { state } = useAppContext();
  const agentsNames = state.agents.map((agent) => agent.full_name);
  const agentsIds = state.agents.map((agent) => agent.id);
  const agentId = localStorage.getItem("agent_id");
  const agentName = localStorage.getItem("full_name");

  useEffect(() => {
    axios
      .get("/api/v1/tickets")
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const agentTickets = tickets.filter(
    (ticket) => ticket.agent_id === Number(agentId)
  );
  const resolvedTickets = agentTickets.filter(
    (ticket) => ticket.status_id === 3
  ).length;
  const openTickets = agentTickets.filter(
    (ticket) => ticket.status_id === 1
  ).length;
  const pendingTickets = agentTickets.filter(
    (ticket) => ticket.status_id === 2
  ).length;
  const allResolvedTickets = tickets.filter((ticket) => ticket.status_id === 3);
  const resolvedTicketsPerAgent = agentsIds.map((agent) => {
    return allResolvedTickets.filter((ticket) => ticket.agent_id === agent)
      .length;
  });
  const loginAgent = state.agents.find((agent) => agent.id === Number(agentId));
  const data = {
    labels: [...agentsNames],
    datasets: [
      {
        label: "Resolved Tickets",
        data: resolvedTicketsPerAgent,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tickets per Agent",
      },
    },
  };
  const data2 = {
    labels: ["Open Tickets", "Pending Tickets", "Resolved Tickets"],
    datasets: [
      {
        data: [openTickets, pendingTickets, resolvedTickets],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="min-h-screen flex items-center pl-52">
      <div className="grid grid-cols-4 gap-4">
        <div className=" bg-white shadow-lg rounded-xl col-span-1 h-44 w-72 flex flex-col items-center justify-center">
          <div className="flex mt-3">
            <BsEnvelopeOpenFill className="w-5 h-5 mx-3 text-blue-600" />
            <p className="text-2xl text-blue-600">
              <span>{openTickets}</span>
            </p>
          </div>
          <h2 className="text-2xl">Open Tickets</h2>
        </div>
        <div className=" bg-white shadow-lg rounded-xl col-span-1 h-44 w-72 flex flex-col items-center justify-center">
          <div className="flex mt-3">
            <MdPending className="w-5 h-5 mx-3 text-blue-600" />
            <p className="text-2xl text-blue-600">
              <span>{pendingTickets}</span>
            </p>
          </div>
          <h2 className="text-2xl">Pending Tickets</h2>
        </div>
        <div className=" bg-white shadow-lg rounded-xl col-span-1 h-44 w-72 flex flex-col items-center justify-center">
          <div className="flex mt-3">
            <BsFillEnvelopeCheckFill className="w-5 h-5 mx-3 text-blue-600" />
            <p className="text-2xl text-blue-600">
              <span>{resolvedTickets}</span>
            </p>
          </div>
          <h2 className="text-2xl">Resolved Tickets</h2>
        </div>
        <div className=" bg-white shadow-lg rounded-xl col-span-1 row-span-3">
          <div className="flex flex-col justify-center mt-5 items-center">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <h2 className="text-2xl mt-3">{agentName}</h2>
            {loginAgent ? (
              <p className="text text-slate-400">{loginAgent.email}</p>
            ) : (
              <p></p>
            )}
            <div className="h-44 w-72 mt-16 flex flex-col items-center justify-center">
              <Doughnut data={data2} />
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl col-span-3 h-96 row-span-2">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

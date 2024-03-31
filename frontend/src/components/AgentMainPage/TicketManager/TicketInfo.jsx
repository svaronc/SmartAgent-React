import { useAppContext } from "../../../context/AppContext";
import axios from "axios";
import { useEffect, useState } from "react";

function TicketInfo () {
  const { state } = useAppContext();
  const request_id = state.viewTicketId;
  const [request, setRequest] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/requests/${request_id}`, {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        setRequest(response.data)
      })
      .catch(error => {
        console.error('Error fetching requests', error);
      });
  }, []);

  return (
    <section className="flex-column h-full m-4">
      <h1>Ticket Info view ticketID: {state.viewTicketId}</h1>
      <h1 className="text-4xl font-bold">{request.title}</h1>
      <p>{request.body}</p>

      <div className="justify-end relative bottom-0">
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
          <li><a>Reply</a></li>
          <li><a>Transfer</a></li>
          <li><a>Resolve</a></li>
          <li><a>Close</a></li>
          <li><a>Delete</a></li>
        </ul>
      </div>
    </section>
  )
};

export default TicketInfo;
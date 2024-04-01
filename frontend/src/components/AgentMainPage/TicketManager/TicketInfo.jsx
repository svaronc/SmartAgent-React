import { useAppContext } from "../../../context/AppContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import { CgCheckO } from "react-icons/cg";
import { FaReply } from "react-icons/fa6";

function TicketInfo() {
  const { state } = useAppContext();
  const request_id = state.viewTicketId;
  const [request, setRequest] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/requests/${request_id}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        setRequest(response.data);
      })
      .catch((error) => {
        console.error("Error fetching requests", error);
      });
  }, []);

  return (
    <section className="flex-column h-full m-4">
      <h1 className="text-4xl font-bold mb-4">{request.title}</h1>
      {/* <h1>Ticket Info view ticketID: {state.viewTicketId}</h1> */}
      <div className="flex-grow bg-base-100 border-2 border h-1/2 p-4">
        <p>{request.body}</p>
      </div>

      <div className="justify-end relative bottom-0">
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
          <li>
            <button className="flex items-center gap-2">
              <FaReply 
                size="1.5rem"
                onClick={() => console.log("reply")}
              />
              Reply
            </button>
          </li>
          <li>
            <button className="flex items-center gap-2">
              <LuArrowLeftRight
                size="1.5rem"
                onClick={() => console.log("transfer")}
              />
              Transfer
            </button>
          </li>
          <li>
            <button className="flex items-center gap-2">
              <CgCheckO 
                size="1.5rem" 
                onClick={() => console.log("resolve")} 
              />
              Resolve
            </button>
          </li>
          <li>
            <button className="flex items-center gap-2">
              <MdDelete 
                size="1.5rem" 
                onClick={() => console.log("delete")} 
              />
              Delete
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default TicketInfo;

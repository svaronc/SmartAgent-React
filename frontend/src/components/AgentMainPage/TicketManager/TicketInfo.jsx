import { useAppContext } from "../../../context/AppContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import { CgCheckO } from "react-icons/cg";
import { FaReply } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import DraftEditor from "./DraftEditor";

function TicketInfo() {
  const { state } = useAppContext();
  const request_id = state.viewTicketId;
  const [request, setRequest] = useState([]);
  const [replyIsVisible, setReplyIsVisible] = useState(false);

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
    <section className="flex-col h-full m-4 overflow-y-auto">
      <h1 className="text-4xl font-bold mb-4">{request.title}</h1>
      {/* <h1>Ticket Info view ticketID: {state.viewTicketId}</h1> */}
      <div className="flex-grow bg-base-100 border-2 border h-1/2 p-4 overflow-y-auto">
        <div className="mb-4 text-gray-500">
          <p>From: {`${request.customer_name} <${request.from_email}>`}</p>
          <p>To: smartagents3@gmail.com</p>
          <p>Subject: {request.title} </p>
          <div className="flex-grow border-t border-gray-400 mt-4"></div>
        </div>
        <p className="text-2xl">{request.body}</p>
      </div>

      <div className="justify-end relative bottom-0">
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
          <li>
            <button
              className="flex items-center gap-2"
              onClick={() => setReplyIsVisible(!replyIsVisible)}
            >
              <FaReply size="1.5rem" />
              Reply
            </button>
          </li>
          <li>
            <button
              className="flex items-center gap-2"
              onClick={() => console.log("transfer")}
            >
              <LuArrowLeftRight size="1.5rem" />
              Transfer
            </button>
          </li>
          <li>
            <button
              className="flex items-center gap-2"
              onClick={() => console.log("resolve")}
            >
              <CgCheckO size="1.5rem" />
              Resolve
            </button>
          </li>
          <li>
            <button
              className="flex items-center gap-2"
              onClick={() => console.log("delete")}
            >
              <MdDelete size="1.5rem" />
              Delete
            </button>
          </li>
        </ul>
      </div>
      {replyIsVisible && (
        <div className="overflow-y-auto">
          <DraftEditor />
          {/* <textarea className="flex-grow bg-base-100 border-2 h-1/3 w-full p-4" value={`Hi ${request.customer_name},`}></textarea> */}
          {/* <div> */}
            <div className="justify-end relative mt-5">
              <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                <li>
                  <button
                    className="flex items-center gap-2"
                    onClick={() => console.log("send reply")}
                  >
                    <IoSend size="1.5rem" />
                    Send
                  </button>
                </li>
              </ul>
            </div>
          {/* </div> */}
        </div>
      )}
    </section>
  );
}

export default TicketInfo;

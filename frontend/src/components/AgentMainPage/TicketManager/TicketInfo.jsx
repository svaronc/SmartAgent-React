import { useAppContext } from "../../../context/AppContext";
import { useEffect, useState } from "react";

// Icons
import { MdDelete } from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import { CgCheckO } from "react-icons/cg";
import { FaReply } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { IoIosMailOpen } from "react-icons/io";

// react-resizable-panels
import {
  getPanelElement,
  getPanelGroupElement,
  getResizeHandleElement,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

// Components
import DraftEditor from "./DraftEditor";
import Conversation from "./Conversation";

// Hooks
import useFetchTicketData from "../../../hooks/useFetchTicketData";
import useApplicationData from "../../../hooks/useApplicationData";

function TicketInfo() {
  const { state, dispatch } = useAppContext();
  const {
    deleteTicket,
    resolveTicket,
    transferTicket,
    openTicket,
    sendRespond,
  } = useApplicationData();
  const ticket_id = state.viewTicketId;
  const agents = state.agents;
  const [replyIsVisible, setReplyIsVisible] = useState(false);
  const [editorState, setEditorState] = useState();
  const [attachments, setAttachments] = useState([]);
  useFetchTicketData(`api/v1/tickets/${ticket_id}`, dispatch, ticket_id);
  const ticket = state.ticketData;

  return (
    <section className="flex-col h-full m-4 overflow-y-auto">
      <div
        id="ticket-info-header"
        className="flex flex-row justify-between items-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-700 dark:text-white">
          {ticket.title}
        </h1>

        <div className="flex flex-row items-center">
          <p className="font-bold text-gray-700 pb-2 dark:text-white">
            {ticket.agent &&
            Number(state.loggedInAgent.agent_id) === ticket.agent.id
              ? "Assigned to: Me"
              : ticket.agent
                ? `Assigned to: ${ticket.agent.full_name}`
                : ""}
          </p>
          <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
            <li>
              <details className="dropdown">
                <summary className="btn">
                  Transfer
                  <LuArrowLeftRight size="1.5rem" />
                </summary>
                <ul className="shadow menu dropdown-content rounded-box dark:text-gray-200">
                  {agents.map((agent) => (
                    <li
                      key={agent.id}
                      onClick={(event) => {
                        event.stopPropagation();
                        transferTicket(ticket.id, agent.id);
                      }}
                    >
                      <a>
                        {state.loggedInAgent.agent_id === agent.id
                          ? "Me"
                          : agent.full_name}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-base-100 border-2 h-1/2 p-4 overflow-y-auto">
        {ticket.conversations &&
          ticket.conversations.map((conversation) => (
            <Conversation
              key={conversation.id}
              customer_name={ticket.customer_name}
              customer_email={ticket.from_email}
              from_customer={conversation.from_customer}
              created_at={conversation.created_at}
              title={ticket.title}
              body={conversation.body}
              attachments_urls={conversation.attachments_urls}
            />
          ))}
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

          {ticket.status_id === 1 ? ( // Show the resolve ticket icon if the ticket is open
            <li>
              <button
                className="flex items-center gap-2"
                onClick={(event) => {
                  event.stopPropagation();
                  resolveTicket(ticket.id);
                  window.location.reload();
                }}
              >
                <CgCheckO size="1.5rem" /> Resolve
              </button>
            </li>
          ) : (
            // Show the open ticket icon if the ticket has been resolved
            <li>
              <button
                className="flex items-center gap-2"
                onClick={(event) => {
                  event.stopPropagation();
                  openTicket(ticket.id);
                  window.location.reload();
                }}
              >
                <IoIosMailOpen size="1.5rem" />
                Open
              </button>
            </li>
          )}
          <li>
            <button
              className="flex items-center gap-2"
              onClick={(event) => {
                event.stopPropagation();
                deleteTicket(ticket.id);
                window.location.reload();
              }}
            >
              <MdDelete size="1.5rem" />
              Delete
            </button>
          </li>
        </ul>
      </div>
      {replyIsVisible && (
        <div className="overflow-y-auto">
          <div className="reply-details mb-2">
            <div className="flex flex-row gap-5">
              <p>From: SmartAgent &lt;smartagents3@gmail.com&gt;</p>
              <p>|</p>
              <p>
                To: {ticket.customer_name} &lt;{ticket.from_email}&gt;
              </p>
            </div>
            <p>Re: {ticket.title}</p>
          </div>
          <DraftEditor
            customer_name={ticket?.customer_name ?? ""}
            editorState={editorState}
            setEditorState={setEditorState}
          />
          <div className="justify-end relative mt-5">
            <input
              type="file"
              multiple
              onChange={(event) => {
                setAttachments(event.target.files);
              }}
            />
            <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
              <li>
                <button
                  className="flex items-center gap-2"
                  onClick={() => {
                    sendRespond(ticket_id, editorState,attachments);
                    setReplyIsVisible(!replyIsVisible);
                  }}
                >
                  <IoSend size="1.5rem" />
                  Send
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

export default TicketInfo;

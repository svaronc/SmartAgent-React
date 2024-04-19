import { useAppContext } from "../../../context/AppContext";

// Icons
import { MdDelete } from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import { CgCheckO } from "react-icons/cg";
import { IoIosMailOpen } from "react-icons/io";
import { BsFillSendCheckFill } from "react-icons/bs";

// Date formatting
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
import ReactTimeAgo from "react-time-ago";

// Hooks
import useApplicationData from "../../../hooks/useApplicationData";
import useFetchInboxTickets from "../../../hooks/inbox/useFetchInboxTickets";

import { useState } from "react";
import axios from "axios";

function TicketInbox() {
  const {
    setTicketView,
    resolveTicket,
    transferTicket,
    openTicket,
    deleteTicket,
  } = useApplicationData();
  const { state } = useAppContext();
  const tickets = state.inboxTickets;
  const agents = state.agents;
  const [searchTerm, setSearchTerm] = useState("");
  const [transferToAgentId, setTransferToAgentId] = useState("");
  const [inputValue, setInputValue] = useState("");

  const closeModal = () => {
    setInputValue("");
    setNewNoteBody("");
    setSubmitNote(false);
    setAddNoteVisible(false);
    document.getElementById("modal-box")?.Modal.close();
  };

  // For Notes
  const [newNoteBody, setNewNoteBody] = useState("");
  const [submitNote, setSubmitNote] = useState(false);
  const [addNoteVisible, setAddNoteVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const createNote = (value, ticket_id) => {
    if (value.trim() === "") return;
    axios
      .post("api/v1/notes", {
        ticket_id: ticket_id,
        body: value,
        agent_id: state.loggedInAgent.agent_id,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  useFetchInboxTickets();

  const getTicketRowClassName = (ticket) => {
    switch (ticket.status?.description) {
      case "Open":
        return "bg-yellow-100 border-b dark:bg-gray-300 dark:border-gray-700 hover:bg-yellow-200  dark:hover:text-black dark:hover:bg-gray-100 rounded cursor-pointer dark:text-black";
      case "Answered":
        return "bg-white border-b dark:bg-gray-600 dark:border-gray-700 hover:bg-blue-50  dark:hover:text-black rounded cursor-pointer dark:text-gray-200";
      case "Resolved":
        return "bg-grey border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50  dark:hover:text-black rounded cursor-pointer text-gray-500";
      default:
        break;
    }
  };

  return (
    <section className="flex flex-col">
      <section className="flex bg-base-100 shadow-md pl-5">
        <div className="flex-col items-start mt-2">
          <h1 className="text-2xl font-bold mb-4">{state.ticketManagerView}</h1>
          <div className="mb-4">
            <input
              type="search"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder=" Search"
              className="bg-slate-100 rounded-lg dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 p-2 w-96 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-gray-500 dark:focus:ring-opacity-50"
            />
          </div>
        </div>
        {showToast && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>The ticket has been transferred.</span>
            </div>
          </div>
        )}
      </section>
      <div className="relative">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Request
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              <th scope="col" className="py-3">
                Ticket ID
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
              <th scope="col" className="px-6 py-3">
                Assigned To
              </th>
              <th scope="col" className="px-9 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets
              .filter(
                (ticket) =>
                  ticket.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  ticket.customer_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((ticket) => (
                <tr
                  key={ticket.id}
                  className={getTicketRowClassName(ticket)}
                  onClick={() => setTicketView(ticket.id)}
                >
                  {/* Request title */}
                  <th
                    scope="row"
                    className="px-6 py-4 font-bold whitespace-wrap"
                  >
                    {ticket.title}
                  </th>

                  {/* Customer name */}
                  <td className="px-6 py-4">{ticket.customer_name}</td>

                  {/* Ticket ID */}
                  <td className="px-2 py-4">{ticket.id}</td>

                  {/* Status */}
                  <td className="px-6 py-4">{ticket.status?.description}</td>

                  {/* Created At */}
                  <td className="px-6 py-4">
                    {ticket && !isNaN(Date.parse(ticket.created_at)) && (
                      <ReactTimeAgo
                        date={Date.parse(ticket.created_at)}
                        locale="en-US"
                      />
                    )}
                  </td>

                  {/* Assigned to agent */}
                  <td className="py-4">
                    {ticket.agent &&
                    state.loggedInAgent.agent_id === ticket.agent.id
                      ? "Me"
                      : ticket.agent
                        ? ticket.agent.full_name
                        : ""}
                  </td>

                  {/* Actions */}
                  <td className="px-6">
                    <div className="flex flex-row hover:ring-slate-300 items-center">
                      <div
                        className="flex flex-col justify-center px-3 py-4"
                        onClick={(event) => {
                          event.stopPropagation();
                          document
                            .getElementById(`transfer_modal_${ticket.id}`)
                            .showModal();
                        }}
                      >
                        <li
                          className="tooltip tooltip-right"
                          data-tip="Transfer"
                        >
                          <LuArrowLeftRight size="1.5rem" />
                          {/* Transfer Modal starts here */}
                          <dialog
                            id={`transfer_modal_${ticket.id}`}
                            className="modal text-black dark:text-white"
                          >
                            <div className="modal-box">
                              <div className="flex flex-col items-center">
                                <h3 className="text-4xl font-bold dark:text-white">
                                  Transfer Ticket
                                </h3>

                                <div>
                                  <p className="pt-6 text-2xl mb-2 dark:text-white flex flex-col items-center justify-center gap-2">
                                    Currently Assigned to:
                                    <p className="font-bold">
                                      {Number(state.loggedInAgent?.agent_id) ===
                                      ticket.agent?.id
                                        ? " Me"
                                        : ticket.agent?.full_name
                                          ? ` ${ticket.agent?.full_name}`
                                          : ""}
                                    </p>
                                    <LuArrowLeftRight />
                                    Transfer to:
                                  </p>

                                  <input
                                    value={inputValue}
                                    list="agents"
                                    placeholder="Transfer to..."
                                    className="input input-bordered dark:text-white"
                                    onFocus={() => setSubmitNote(false)}
                                    onChange={(event) => {
                                      setInputValue(event.target.value);
                                      const agent = agents.find(
                                        (agent) =>
                                          agent.full_name === event.target.value
                                      );
                                      if (agent) {
                                        setInputValue(event.target.value);
                                        setTransferToAgentId(agent.id);
                                        setAddNoteVisible(true);
                                      }
                                    }}
                                  />
                                  <datalist id="agents">
                                    <option key="empty" value=" " />
                                    {agents.map((agent) => (
                                      <option
                                        key={agent.id}
                                        value={agent.full_name}
                                      >
                                        {state.loggedInAgent.agent_id ===
                                        agent.id
                                          ? "Me"
                                          : agent.full_name}
                                      </option>
                                    ))}
                                  </datalist>
                                  <button
                                    className="btn btn-neutral ml-2"
                                    onClick={() => {
                                      setInputValue("");
                                      setAddNoteVisible(false);
                                    }}
                                  >
                                    Clear
                                  </button>
                                </div>
                              </div>
                              <div>
                                {addNoteVisible && (
                                  <textarea
                                    id="note"
                                    name="note"
                                    value={newNoteBody}
                                    onChange={(e) => {
                                      setNewNoteBody(e.target.value);
                                      setSubmitNote(false);
                                    }}
                                    placeholder="Add a note"
                                    className="textarea textarea-bordered textarea-lg mt-4 w-full max-w-xs dark:text-white"
                                    component="textarea"
                                    rows="2"
                                  />
                                )}

                                <div
                                  className={`mt-5 ${
                                    submitNote ? "visible" : "invisible"
                                  }`}
                                >
                                  <div
                                    role="alert"
                                    className={`alert alert-success ${
                                      submitNote ? "" : "hidden"
                                    }`}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="stroke-current shrink-0 h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <span>
                                      The ticket has been transferred!
                                    </span>
                                  </div>
                                </div>

                                <div className="flex flex-row justify-center items-center">
                                  {/* Transfer button */}
                                  {addNoteVisible && (
                                    <button
                                      className="btn btn-primary ml-2"
                                      onClick={() => {
                                        createNote(
                                          newNoteBody,
                                          ticket.id,
                                          state.loggedInAgent.agent_id
                                        );
                                        setSubmitNote(true);
                                        transferTicket(
                                          ticket.id,
                                          transferToAgentId
                                        );
                                        setNewNoteBody("");
                                        setAddNoteVisible(false);
                                        setInputValue("");
                                        setShowToast(true);
                                        setTimeout(() => {
                                          closeModal();
                                        }, 1000);
                                        setTimeout(() => {
                                          setShowToast(false);
                                        }, 3000);
                                      }}
                                    >
                                      Transfer Ticket
                                    </button>
                                  )}

                                  {/* View ticket button */}
                                  {/* <button
                                    className="btn btn-primary btn-outline ml-2"
                                    onClick={() => setTicketView(ticket.id)}
                                  >
                                    View Ticket
                                  </button> */}

                                  {/* Close modal x button */}
                                  <form method="dialog">
                                    <button
                                      className="modal-action ml-2"
                                      onClick={closeModal}
                                    >
                                      <label
                                        htmlFor={`transfer_modal_${ticket.id}`}
                                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-white"
                                      >
                                        ✕
                                      </label>
                                    </button>
                                  </form>

                                  {/* Close modal button */}
                                  <form method="dialog">
                                    <button
                                      id="close-modal"
                                      type="submit"
                                      className="modal-action pb-6"
                                      onClick={closeModal}
                                    >
                                      <label
                                        htmlFor={`transfer_modal_${ticket.id}`}
                                        className="btn bg-gray dark:bg-neutral"
                                      >
                                        Close
                                      </label>
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                            {/* Close the modal when clicking on the backdrop */}
                            <form method="dialog" className="modal-backdrop">
                              <button onClick={closeModal}>close</button>
                            </form>
                          </dialog>
                          {/* Transfer Modal ends here */}
                        </li>
                      </div>

                      {/* Show the open ticket icon if the ticket is open */}
                      {ticket.status?.description === "Open" ||
                      ticket.status?.description === "Answered" ? (
                        <li
                          className="tooltip tooltip-right px-3 py-4"
                          data-tip="Resolve"
                          onClick={(event) => {
                            event.stopPropagation();
                            resolveTicket(ticket.id);
                          }}
                        >
                          <CgCheckO size="1.5rem" />
                        </li>
                      ) : (
                        // Otherwise show resolve icon

                        <li
                          className="tooltip tooltip-right px-3 py-4"
                          data-tip="Reopen"
                          onClick={(event) => {
                            event.stopPropagation();
                            openTicket(ticket.id);
                          }}
                        >
                          <IoIosMailOpen size="1.5rem" />
                        </li>
                      )}

                      <li
                        className="tooltip tooltip-right px-3 py-4"
                        data-tip="Delete Ticket"
                        onClick={(event) => {
                          event.stopPropagation();
                          document
                            .getElementById(`delete_modal_${ticket.id}`)
                            .showModal();
                        }}
                      >
                        <MdDelete size="1.5rem" />

                        {/* Delete Modal starts here */}
                        <dialog
                          id={`delete_modal_${ticket.id}`}
                          className="modal"
                        >
                          <div className="modal-box pb-1  flex flex-col items-center">
                            <h3 className="text-lg font-bold dark:text-white">
                              This action is reversible!
                            </h3>
                            <p className="pt-4 dark:text-white">
                              Are you sure you want to delete this ticket?
                            </p>

                            <div
                              className="modal-action m-0"
                              onClick={(event) => {
                                event.stopPropagation();
                              }}
                            >
                              {/* Close modal x button */}
                              <form method="dialog">
                                <button
                                  className="modal-action m-0"
                                  onClick={() =>
                                    document
                                      .getElementById("modal-box")
                                      .Modal.close()
                                  }
                                >
                                  <label
                                    htmlFor={`delete_modal_${ticket.id}`}
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-white"
                                  >
                                    ✕
                                  </label>
                                </button>
                              </form>
                            </div>

                            <div className="flex flex-row justify-center items-center gap-10">
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  deleteTicket(ticket.id);
                                  console.log("deleteTicket");
                                }}
                              >
                                Delete
                              </button>

                              <form method="dialog">
                                <button
                                  className="modal-action pb-6"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    document
                                      .getElementById("modal-box")
                                      .Modal.close();
                                  }}
                                >
                                  <label
                                    htmlFor={`delete_modal_${ticket.id}`}
                                    className="btn bg-gray dark:bg-neutral"
                                  >
                                    Close
                                  </label>
                                </button>
                              </form>
                            </div>
                          </div>
                          {/* Close the modal when clicking on the backdrop */}
                          <form method="dialog" className="modal-backdrop">
                            <button onClick={closeModal}>close</button>
                          </form>
                        </dialog>
                        {/* Delete Modal ends here */}
                        {/* <DeleteConfirmationModal ticket_id={ticket.id} /> - old*/}
                      </li>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TicketInbox;

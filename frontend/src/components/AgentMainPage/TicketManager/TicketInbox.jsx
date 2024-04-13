import { useAppContext } from "../../../context/AppContext";

// Icons
import { MdDelete } from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import { CgCheckO } from "react-icons/cg";
import { IoIosMailOpen } from "react-icons/io";
// import TicketManagerNav from "./TicketManagerNav";

// Date formatting
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
import ReactTimeAgo from "react-time-ago";

// Hooks
import useApplicationData from "../../../hooks/useApplicationData";
import useFetchInboxTickets from "../../../hooks/inbox/useFetchInboxTickets";
import DeleteConfirmationModal from "../Modal/DeleteConfirmationModal";
import TransferConfirmationModal from "../Modal/TransferConfirmationModal";

function TicketInbox() {
  const { setTicketView, resolveTicket, transferTicket, openTicket } =
    useApplicationData();
  const { state } = useAppContext();
  const tickets = state.inboxTickets;
  const agents = state.agents;

  useFetchInboxTickets();

  const getTicketRowClassName = (ticket) => {
    return ticket.status_id === 1
      ? "bg-white border-b dark:bg-gray-600 dark:border-gray-700 hover:bg-blue-50  dark:hover:text-black rounded cursor-pointer dark:text-gray-100"
      : "bg-grey border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50  dark:hover:text-black rounded cursor-pointer text-gray-500";
  };

  return (
    <section className="flex flex-col">
      {/* <TicketManagerNav /> */}
      <section className="flex bg-base-100 shadow-md pl-5">
            <div className="flex-col items-start mt-2">
              <h1 className="text-2xl font-bold mb-4">{state.ticketManagerView}</h1>
              <div className="mb-4">       
                <input type="search" name="search" id="search" placeholder=" Search" className="bg-slate-100"/>
              </div>
            </div> 
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
            {tickets.map((ticket) => (
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
                <td className="px-6 py-4">
                  {ticket.status_id === 1 ? "Open" : "Resolved"}
                </td>

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
                      className="dropdown dropdown-hover px-3 py-4"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <li className="tooltip tooltip-right" data-tip="Transfer">
                        <label htmlFor="my_modal_7">
                          <LuArrowLeftRight size="1.5rem" />
                        </label>
                        <TransferConfirmationModal ticket={ticket} />
                      </li>                      
                    </div>
                    {ticket.status_id === 1 ? ( // Show the resolve ticket icon if the ticket is open
                      <li
                        className="tooltip tooltip-right px-3 py-4"
                        data-tip="Resolve"
                        onClick={(event) => {
                          event.stopPropagation();
                          resolveTicket(ticket.id);
                        }}
                      >
                        <CgCheckO size="1.5rem" />
                      </li> // Show the open ticket icon if the ticket has been resolved
                    ) : (
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
                      }}
                    >
                      <label htmlFor="my_modal_7">
                        <MdDelete size="1.5rem" />
                      </label>
                      <DeleteConfirmationModal ticket_id={ticket.id} />
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

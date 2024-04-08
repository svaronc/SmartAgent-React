import { useAppContext } from "../../../context/AppContext";

// Icons
import { MdDelete } from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import { CgCheckO } from "react-icons/cg";
import { IoIosMailOpen } from "react-icons/io";

// Date formatting
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

import ReactTimeAgo from 'react-time-ago';

// Hooks
import useApplicationData from "../../../hooks/useApplicationData";
import useFetchInboxTickets from "../../../hooks/inbox/useFetchInboxTickets";

function TicketInbox() {
  const {
    setTicketView,
    deleteTicket,
    resolveTicket,
    transferTicket,
    openTicket,
  } = useApplicationData();
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
    <section className="flex flex-col w-full">
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
              <th scope="col" className="px-6 py-3">
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
                  className="px-6 py-4 font-bold whitespace-nowrap"
                >
                  {ticket.title}
                </th>

                {/* Customer name */}
                <td className="px-6 py-4">{ticket.customer_name}</td>

                {/* Ticket ID */}
                <td className="px-6 py-4">{ticket.id}</td>
                
                {/* Status */}
                <td className="px-6 py-4">
                  {ticket.status_id === 1 ? "Open" : "Closed"}
                </td>

                {/* Created At */}
                <td className="px-6 py-4">
                  <ReactTimeAgo date={ticket.created_at} locale="en-US"/>
                </td>

                {/* Assigned to agent */}
                <td className="px-6 py-4">
                  {state.loggedInAgent.agent_id === ticket.agent.id
                    ? "Me"
                    : ticket.agent.full_name}
                </td>

                {/* Actions */}
                <td className="px-6">
                  <div className="flex flex-row hover:ring-slate-300">
                    <div
                      className="dropdown dropdown-hover px-3 py-4"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <li className="tooltip tooltip-right" data-tip="Transfer">
                        <LuArrowLeftRight size="1.5rem" />
                      </li>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box dark:text-gray-200"
                      >
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
                        deleteTicket(ticket.id);
                      }}
                    >
                      <MdDelete size="1.5rem" />
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

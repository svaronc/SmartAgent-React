import { useAppContext } from "../../../context/AppContext";

// Icons
import { MdDelete } from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import { CgCheckO } from "react-icons/cg";
import { IoIosMailOpen } from "react-icons/io";

// Hooks
import useApplicationData from "../../../hooks/useApplicationData";
import useFetchInboxTickets from "../../../hooks/inbox/useFetchInboxTickets";

function TicketInbox() {
  const { setTicketView, deleteTicket, resolveTicket, transferTicket, openTicket } = useApplicationData();
  const { state } = useAppContext();
  const tickets = state.inboxTickets;
  const agents = state.agents;

  useFetchInboxTickets();

  const getTicketRowClassName = (ticket) => {
    return ticket.status_id === 1 
      ? "bg-white border-b dark:bg-gray-600 dark:border-gray-700 hover:bg-blue-50 rounded cursor-pointer dark:text-gray-200" 
      : "bg-grey border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 rounded cursor-pointer text-gray-500"
  }

  return (
    <section className="flex flex-col w-full">
      <div className="relative">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
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
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {ticket.title}
                </th>
                <td className="px-6 py-4">{ticket.customer_name}</td>
                <td className="px-6 py-4">{ticket.id}</td>
                <td className="px-6 py-4">{ticket.status_id === 1 ? "Open" : "Closed"}</td>
                <td className="px-6 py-4">{ticket.created_at}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-row gap-3 hover:ring-slate-300">
                    <div className="dropdown dropdown-hover">
                      <li className="tooltip tooltip-right" data-tip="Transfer">
                        <LuArrowLeftRight
                          size="1.5rem"
                          onClick={() => console.log("transfer")}
                        />
                      </li>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                      >
                        {agents.map((agent) => (
                          <li key={agent.id} 
                            onClick={(event) => {
                              event.stopPropagation();
                              transferTicket(ticket.id, agent.id)
                              // window.location.reload();
                            }}
                          >
                            <a>{agent.full_name}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {ticket.status_id === 1 ?  // Show the resolve ticket icon if the ticket is open
                      <li className="tooltip tooltip-right" data-tip="Resolve">
                        <CgCheckO
                          size="1.5rem"
                          onClick={(event) => {
                            event.stopPropagation();
                            resolveTicket(ticket.id)
                            // window.location.reload();
                          }}
                        />
                      </li> : // Show the open ticket icon if the ticket has been resolved
                      <li className="tooltip tooltip-right" data-tip="Reopen">
                      <IoIosMailOpen 
                        size="1.5rem"
                        onClick={(event) => {
                          event.stopPropagation();
                          openTicket(ticket.id)
                          // window.location.reload();
                        }}
                      />
                    </li>
                    }
                    <li
                      className="tooltip tooltip-right"
                      data-tip="Delete Ticket"
                    >
                      <MdDelete
                        size="1.5rem"
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteTicket(ticket.id)
                          // window.location.reload();
                        }}
                      />
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

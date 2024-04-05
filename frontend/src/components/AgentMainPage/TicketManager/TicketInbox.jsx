import { MdDelete } from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import { CgCheckO } from "react-icons/cg";
import useApplicationData from "../../../hooks/useApplicationData";
import { useAppContext } from "../../../context/AppContext";
import useFetchInboxAllTickets from "../../../hooks/inbox/useFetchInboxAllTickets";
import useFetchInboxTriageTickets from "../../../hooks/inbox/useFetchInboxTriageTickets";

function TicketInbox() {
  const { setTicketView, deleteTicket,  } = useApplicationData();
  const { state, dispatch } = useAppContext();
  const tickets = state.inboxTickets;
  const agents = state.agents;

  switch (state.ticketManagerView) {
    case "Assigned to Me": return
    case "Triage - Open Tickets": {
      useFetchInboxTriageTickets("http://localhost:3000/api/v1/tickets", dispatch)
    }
    case "All Tickets": {
      useFetchInboxAllTickets("http://localhost:3000/api/v1/tickets", dispatch)
    }
    case "Closed Tickets": return
  }

  return (
    <section className="flex flex-col w-full">
      <div className="relative">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 rounded cursor-pointer"
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
                <td className="px-6 py-4">{ticket.title}</td>
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
                          <li onClick={() => console.log(agent.username)}>
                            <a>{agent.username}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <li className="tooltip tooltip-right" data-tip="Resolve">
                      <CgCheckO
                        size="1.5rem"
                        onClick={() => console.log("resolve")}
                      />
                    </li>
                    <li
                      className="tooltip tooltip-right"
                      data-tip="Delete Ticket"
                    >
                      <MdDelete
                        size="1.5rem"
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteTicket(ticket.id)
                          window.location.reload();
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

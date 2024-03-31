import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import { CgCheckO } from "react-icons/cg";
import useApplicationData from "../../../hooks/useApplicationData";

function TicketInbox() {
  const [requests, setRequests] = useState([]);
  const { setTicketView, deleteTicket } = useApplicationData();

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/requests', {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        setRequests(response.data)
      })
      .catch(error => {
        console.error('Error fetching requests', error);
      });
  }, []);

  return (
    <section className="flex flex-col w-full">

      <div className="relative overflow-x-auto">
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
              {requests.map(request => (
                <tr 
                  key={request.id} 
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 rounded cursor-pointer"
                  onClick={() => setTicketView(request.id) }
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {request.title}
                  </th>
                  <td className="px-6 py-4">{request.customer_name}</td>
                  <td className="px-6 py-4">{request.id}</td>
                  <td className="px-6 py-4">{request.tickets[0].status.description}</td>
                  <td className="px-6 py-4">{request.created_at}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-row gap-3 hover:ring-slate-300">
                      <LuArrowLeftRight size='1.5rem' onClick={() => console.log("transfer")}/>
                      <CgCheckO size='1.5rem' onClick={() => console.log("resolve")}/>
                      <MdDelete size='1.5rem' onClick={() => console.log("delete")}/>
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

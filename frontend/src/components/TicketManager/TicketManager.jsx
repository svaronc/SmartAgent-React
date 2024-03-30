import { useEffect, useState } from "react";
import axios from "axios";
import TicketManagerNav from "../TicketManagerNav/TicketManagerNav";

function TicketManager() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/requests', {
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
      <TicketManagerNav />

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Request
              </th>
              <th scope="col" class="px-6 py-3">
                Customer
              </th>
              <th scope="col" class="px-6 py-3">
                Ticket ID
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
              {requests.map(request => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-50 rounded cursor-pointer">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {request.title}
                  </th>
                  <td class="px-6 py-4">{request.customer_name}</td>
                  <td class="px-6 py-4">{request.id}</td>
                  <td class="px-6 py-4">Open</td>
                  <td class="px-6 py-4">{request.created_at}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TicketManager;

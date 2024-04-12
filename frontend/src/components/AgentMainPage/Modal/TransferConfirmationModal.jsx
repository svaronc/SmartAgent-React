import useApplicationData from "../../../hooks/useApplicationData";
import { useAppContext } from "../../../context/AppContext";
import { useState } from "react";

import { LuArrowLeftRight } from "react-icons/lu";

function TransferConfirmationModal({ ticket }) {
  const { state } = useAppContext();
  const { transferTicket } = useApplicationData();


  const agents = state.agents;
  return (
    <div className="m-0 p-0">
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        {/* Close the modal when clicking on the backdrop */}
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>

        <div className="modal-box pb-1">
          <h3 className="text-3xl font-bold dark:text-white">Transfer Ticket</h3>
          <p className="pt-4 text-2xl mb-3 dark:text-white">
            Currently Assigned to:
          {Number(state.loggedInAgent.agent_id) === ticket.agent.id
                    ? " Me"
                    : ticket.agent.full_name
                    ? ` ${ticket.agent.full_name}`
                    : ""}
          </p>
          
          <details className="">
                <summary className="btn font-bold text-gray-700 dark:text-white">
                  {Number(state.loggedInAgent.agent_id) === ticket.agent.id
                    ? "Assign to: Me"
                    : ticket.agent.full_name
                    ? `Assign to: ${ticket.agent.full_name}`
                    : ""}
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

          <div className="flex flex-col justify-center items-center gap-2">
            <textarea
              placeholder="Transfer Note"
              className="textarea textarea-bordered textarea-lg mt-4 w-full max-w-xs dark:text-white"
            ></textarea>
          </div>

          <div
            className="modal-action m-0"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <label
              htmlFor="my_modal_7"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-white"
            >
              <div
                onClick={() =>
                  document.getElementById("modal-box").Modal.close()
                }
              >
                ✕
              </div>
            </label>
          </div>

          <div className="flex flex-row justify-center items-center gap-10">
            <button
              className="btn"
              onClick={(event) => {
                event.stopPropagation();
                // transferTicket(ticket_id, agent_id);
              }}
            >
              Transfer
            </button>
            
            <button
              className="modal-action pb-6"
              onClick={(event) => {
                event.stopPropagation();
                document.getElementById("modal-box").Modal.close();
              }}
            >
              <label htmlFor="my_modal_7" className="btn">
                Close
              </label>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferConfirmationModal;

import useApplicationData from "../../../hooks/useApplicationData";
import { useAppContext } from "../../../context/AppContext";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";

import { LuArrowLeftRight } from "react-icons/lu";

function TransferConfirmationModal({ ticket }) {
  const { state } = useAppContext();
  const { transferTicket } = useApplicationData();

  const agents = state.agents;

  const closeModal = () => document.getElementById("modal-box").Modal.close();

  const initialValues = {
    note: ""
  };

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (values, actions) => {
    // Handle form submission logic here
    console.log(values);
    actions.setSubmitting(false);
    closeModal(); // Close the modal after form submission

    let formData = new FormData();
    // formData.append("ticket[customer_name]", values.note);
    formData.append("ticket[agent_id]", values.agent_id);
    // Assuming 'attachments' is the file to be uploaded
    if (values.attachments) {
      Array.from(values.attachments).forEach((file ) => {
        formData.append(`ticket[attachments][]`, file);
      });
    }
    console.log("Form data:", formData);
    // axios
    //   .post("api/v1/notes", formData, {
    //     headers: { "content-type": "multipart/form-data" },
    //   })
    //   .then((response) => {
    //     console.log("Form submission successful:", response.data);
    //     alert("Form submitted successfully!");
    //     setSubmitted(true);
    //     actions.resetForm();
    //   })
    //   .catch((error) => {
    //     console.error("Error submitting form:", error);
    //     alert("Error submitting form!");
    //   })
    //   .finally(() => {
    //     actions.setSubmitting(false);
    //   });
  };


  return (
    <div className="m-0 p-0">
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        {/* Close the modal when clicking on the backdrop */}
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>

        <div className="modal-box pb-1">
          <h3 className="text-3xl font-bold dark:text-white">
            Transfer Ticket
          </h3>
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
          
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              <Form className="p-4 w-full">
                {/* Form fields */}
                <div className="mb-4">
                  <label htmlFor="note"></label>
                  <Field
                    id="note"
                    name="note"
                    placeholder="Transfer Note"
                    className="textarea textarea-bordered textarea-lg mt-4 w-full max-w-xs dark:text-white"
                    component="textarea"
                    rows="2"
                  />
                  <ErrorMessage
                    name="note"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Other form fields go here */}
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
                      onClick={closeModal}
                    >
                      ✕
                    </div>
                  </label>
                </div>

                <div className="flex flex-row justify-center items-center gap-10">
                  <button
                    className="btn btn-primary"
                    onClick={(event) => {
                      event.stopPropagation();
                      // transferTicket(ticket_id, agent_id);
                    }}
                  >
                    Transfer
                  </button>

                  <button
                    type="submit"
                    className="modal-action pb-6"
                    onClick={closeModal}
                  >
                    <label htmlFor="my_modal_7" className="btn btn-primary">
                      Close
                    </label>
                  </button>
                </div>
              </Form>
            </Formik>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferConfirmationModal;

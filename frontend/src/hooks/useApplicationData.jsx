import { ACTIONS, useAppContext } from "../context/AppContext";
import axios from "axios";
import useFetchData from "./useFetchData";
import useFetchAgents from "./useFetchAgents";
// import { useEffect } from 'react';

const useApplicationData = () => {
  const { state, dispatch } = useAppContext();

  /**
   * This sets the view of the Ticket Manager
   * @function
   * @returns {void}
   */
  const setTicketManagerView = (view) => {
    dispatch({ type: ACTIONS.SET_VIEW, payload: view });
  };

  /**
   * This sets the Ticket information view
   * @function
   * @returns {void}
   */
  const setTicketView = (ticket_id) => {
    dispatch({ type: ACTIONS.VIEW_TICKET, payload: ticket_id });
    console.log("setTicketView");
  };

  const getAllTicketCount = () => {
    useFetchData("/api/v1/tickets", "countAll", dispatch);
  };

  const getTriageTicketCount = () => {
    useFetchData(
      "/api/v1/tickets",
      "countTriage",
      dispatch
    );
  };

  const getMyTicketCount = () => {
    useFetchData(
      "/api/v1/tickets",
      "countAssignedToMe",
      dispatch
    );
  };

  const getClosedTicketCount = () => {
    useFetchData(
      "/api/v1/tickets",
      "countClosed",
      dispatch
    );
  };

  // DELETE /tickets/:id
  const deleteTicket = (ticket_id) => {
    event.stopPropagation();
    axios
      .delete(`/api/v1/tickets/${ticket_id}`)
      .then(() => {
        dispatch({ type: ACTIONS.SET_VIEW, payload: "Triage - Open Tickets" });
      })
      .catch((error) => {
        console.error("Error fetching requests", error);
      });
  };

  /**
   * This sets the agents in context state. GET api/v1/agents
   * @function
   * @returns {void}
   */
  const getAgents = () => {
    useFetchAgents("/api/v1/agents", dispatch);
  };

  return {
    setTicketManagerView,
    setTicketView,
    deleteTicket,
    getAllTicketCount,
    getTriageTicketCount,
    getClosedTicketCount,
    getMyTicketCount,
    getAgents,
  };
};

export default useApplicationData;

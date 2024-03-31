import { ACTIONS, useAppContext } from "../context/AppContext";
import axios from "axios";
// import { useEffect } from 'react';

const useApplicationData = () => {
  const { state, dispatch } = useAppContext();

  /**
   * This sets the view of the Ticket Manager
   * @function
   * @returns {void}
   */
  const setTicketManagerView = (view) => {
    dispatch({type: ACTIONS.SET_VIEW, payload: view });
  }

  /**
   * This sets the Ticket information view
   * @function
   * @returns {void}
   */
  const setTicketView = (ticket_id) => {
    dispatch({type: ACTIONS.VIEW_TICKET, payload: ticket_id})
    console.log("setTicketView")
  }

  // const getTriageTicketCount = () => {

  // }

  // DELETE /tickets/:id
  const deleteTicket = (ticket_id) => {
    event.stopPropagation();
    axios.delete(`http://localhost:3000/api/v1/tickets/${ticket_id}`)
      .then(() => {
        dispatch({type: ACTIONS.SET_VIEW, payload: "Triage - Open Tickets"})
      })
      .catch(error => {
        console.error('Error fetching requests', error);
      });
  }

  return {
    setTicketManagerView,
    setTicketView,
    deleteTicket,
  }
}

export default useApplicationData;
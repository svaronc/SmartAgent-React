import { useEffect } from "react";
import { ACTIONS } from "../../context/AppContext";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";

const useFetchInboxTickets = () => {
  console.log("hi")
  const { state, dispatch } = useAppContext();
  const API_URL = "api/v1/tickets";
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (state.ticketManagerView) {
          // case "Assigned to Me": 
          case "Triage - Open Tickets": {
            response = await axios.get(API_URL);
            const inboxTriageTickets = response.data.filter(
              (ticket) => ticket.status_id === 1 && ticket.agent_id === 1
            );
            dispatch({
              type: ACTIONS.GET_INBOX_TICKETS,
              payload: inboxTriageTickets
            });
            break;
          }
          case "All Tickets": {
            response = await axios.get(API_URL);
            dispatch({
              type: ACTIONS.GET_INBOX_TICKETS,
              payload: response.data
            });
            break;
          }
          case "Resolved Tickets": {
            response = await axios.get(API_URL);
            const inboxClosedTickets = response.data.filter(
              (ticket) => ticket.status_id === 2
            );
            console.log(inboxClosedTickets);
            dispatch({
              type: ACTIONS.GET_INBOX_TICKETS,
              payload: inboxClosedTickets
            });
            break;
          }
          default:
            break;
        }
      } catch (error) {
        console.error("Error fetching inbox tickets:", error);
      }
    }    
    fetchData();
  }, [state.ticketManagerView]);
};

export default useFetchInboxTickets;

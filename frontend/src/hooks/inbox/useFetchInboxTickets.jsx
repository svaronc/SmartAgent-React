import { useEffect } from "react";
import { ACTIONS } from "../../context/AppContext";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import ActionCable from "actioncable";

const useFetchInboxTickets = () => {
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
              payload: inboxTriageTickets,
            });
            break;
          }
          case "All Tickets": {
            response = await axios.get(API_URL);
            dispatch({
              type: ACTIONS.GET_INBOX_TICKETS,
              payload: response.data,
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
              payload: inboxClosedTickets,
            });
            break;
          }
          default:
            break;
        }
      } catch (error) {
        console.error("Error fetching inbox tickets:", error);
      }
    };
    fetchData();
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    const subscription = cable.subscriptions.create("TicketsChannel", {
      received: (ticket) => {
        dispatch({ type: ACTIONS.ADD_INBOX_TICKET, payload: ticket });
      },
    });

    return () => {
      cable.subscriptions.remove(subscription);
    };
  }, [state.ticketManagerView]);
};

export default useFetchInboxTickets;

import { useEffect, useRef } from "react";
import { ACTIONS } from "../../context/AppContext";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import ActionCable from "actioncable";

const useFetchInboxTickets = () => {
  const { state, dispatch } = useAppContext();
  const inboxTicketsRef = useRef(state.inboxTickets);
  const API_URL = "api/v1/tickets";
  useEffect(() => {
    inboxTicketsRef.current = state.inboxTickets;
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
      received: (data) => {
        if (data.deleted) {
          dispatch({ type: ACTIONS.DELETE_INBOX_TICKET, payload: data.id });
        } else {
          const ticketInInbox = inboxTicketsRef.current.find(
            (t) => t.id === data.id
          );

          if (ticketInInbox) {
            dispatch({ type: ACTIONS.UPDATE_INBOX_TICKET, payload: data });
          } else {
            dispatch({ type: ACTIONS.ADD_INBOX_TICKET, payload: data });
          }
        }
      },
    });

    return () => {
      cable.subscriptions.remove(subscription);
    };
  }, [state.inboxTickets, state.ticketManagerView, dispatch]);
};

export default useFetchInboxTickets;

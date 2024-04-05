import { useEffect } from "react";
import { ACTIONS } from "../../context/AppContext";
import axios from "axios";

const useFetchInboxTriageTickets = (API_URL, dispatch) => {
  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        const inboxTriageTickets = res.data.filter(
          (ticket) => ticket.status_id === 1 && ticket.agent_id === 1
        );
        dispatch({
          type: ACTIONS.GET_INBOX_TICKETS,
          payload: inboxTriageTickets,
        });
      });
  }, []);
};

export default useFetchInboxTriageTickets;

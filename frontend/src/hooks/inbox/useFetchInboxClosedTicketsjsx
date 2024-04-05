import { useEffect } from "react";
import { ACTIONS } from "../../context/AppContext";
import axios from "axios";

const useFetchInboxClosedTickets = (API_URL, dispatch) => {
  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        const inboxClosedTickets = res.data.filter(
          (ticket) => ticket.status_id === 2
        );
        dispatch({
          type: ACTIONS.GET_INBOX_TICKETS,
          payload: inboxClosedTickets,
        });
      });
  }, []);
};

export default useFetchInboxClosedTickets;

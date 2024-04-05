import { useEffect } from "react";
import { ACTIONS } from "../../context/AppContext";
import axios from "axios";

const useFetchInboxAllTickets = (API_URL, dispatch) => {
  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        const inboxAllTickets = res.data;
        dispatch({
          type: ACTIONS.GET_INBOX_TICKETS,
          payload: inboxAllTickets,
        });
      });
  }, []);
};

export default useFetchInboxAllTickets;

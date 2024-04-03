import { useEffect } from "react";
import { ACTIONS } from "../context/AppContext";
import axios from "axios";


const useFetchTicketData = (API_URL, dispatch) => {
  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        const ticketData = res.data;
        dispatch({type: ACTIONS.GET_TICKET_DATA, payload: ticketData });
      })
      .catch((error) => {
        console.error("Error fetching ticket data", error);
      });
  }, [])
};

export default useFetchTicketData;
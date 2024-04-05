import { useEffect } from "react";
import { ACTIONS } from "../context/AppContext";
// import { useAppContext } from "../context/AppContext";
import axios from "axios";

const useFetchData = (API_URL, state, dispatch) => {
  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => {
        switch (state) {
          case "countAll": dispatch({type: ACTIONS.COUNT_ALL, payload: res.data.length})
          break;
          case "countTriage": 
            const triageTickets = res.data.filter((ticket) => (ticket.status_id === 1 && ticket.agent_id === 1))
            dispatch({type: ACTIONS.COUNT_TRIAGE, payload: triageTickets.length})
          break;
          case "countClosed":
            const closedTickets = res.data.filter((ticket) => (ticket.status_id === 2))
            dispatch({type: ACTIONS.COUNT_CLOSED, payload: closedTickets.length})
          break;
          case "countAssignedToMe":
            const myTickets = res.data.filter((ticket) => (ticket.agent_id === 2))  // Need agent_id
            dispatch({type: ACTIONS.COUNT_ASSIGNED_TO_ME, payload: myTickets.length})
          break;
          default: console.log("Data could not be fetched.")
        }
      })
      .catch(error => {
        console.error('Error fetching requests', error);
      });
  }, []) //state.countAssignedToMe, state.countTriage, state.countAll, state.countClosed
};

export default useFetchData;
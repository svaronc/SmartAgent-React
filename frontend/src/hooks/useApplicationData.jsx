import { ACTIONS, useAppContext } from "../context/TicketManagerContext";

const useApplicationData = () => {
  const { state, dispatch } = useAppContext();

  /**
   * This sets the view of the Ticket Manager
   * @function
   * @returns {void}
   */
  const setTicketManagerView = (view) => {
    dispatch({type: ACTIONS.SET_VIEW, payload: view });
    console.log(state)
  }

  return {
    setTicketManagerView,
  }
}

export default useApplicationData;
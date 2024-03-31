import { ACTIONS, useAppContext } from "../context/AppContext";
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
    // useEffect(() => {

    // }, [state.setTicketManagerView])
  }

  return {
    setTicketManagerView,
  }
}

export default useApplicationData;
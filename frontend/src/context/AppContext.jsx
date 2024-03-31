// State management is centralized here
import React, { createContext, useReducer, useContext } from 'react';

export const ACTIONS = {
  SET_VIEW: 'SET_VIEW',
  VIEW_TICKET: 'VIEW_TICKET'
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_VIEW:
      return { ...state, ticketManagerView: action.payload, ticketInboxView: false, ticketInfoView: true };
    case ACTIONS.VIEW_TICKET:
      return { ...state, viewTicketId: action.payload, ticketInboxView: true, ticketInfoView: false };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const INITIAL_STATE = {
  ticketManagerView: "Triage - Open Tickets",
  countAssignedToMe: 0,
  countTriage: 0,
  countAll: 0,
  countClosed: 0,
  viewTicketId: "",
  ticketInboxView: true,
  ticketInfoView: false
}

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = ()=> {
  return useContext(AppContext)
};

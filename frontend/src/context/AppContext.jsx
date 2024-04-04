// State management is centralized here
import React, { createContext, useReducer, useContext } from 'react';

export const ACTIONS = {
  SET_VIEW: 'SET_VIEW',
  VIEW_TICKET: 'VIEW_TICKET',
  COUNT_TRIAGE: 'COUNT_TRIAGE',
  COUNT_ALL: 'COUNT_ALL',
  COUNT_CLOSED: 'COUNT_CLOSED',
  COUNT_ASSIGNED_TO_ME: 'COUNT_ASSIGNED_TO_ME',
  GET_TICKET_DATA: "GET_TICKET_DATA",
  GET_AGENTS: "GET_AGENTS",
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_VIEW:
      return { ...state, ticketManagerView: action.payload, ticketInboxView: true, ticketInfoView: false };
    case ACTIONS.VIEW_TICKET:
      return { ...state, viewTicketId: action.payload, ticketInboxView: false, ticketInfoView: true };
    case ACTIONS.COUNT_ALL:
      return { ...state, countAll: action.payload };
    case ACTIONS.COUNT_TRIAGE:
      return { ...state, countTriage: action.payload };
    case ACTIONS.COUNT_CLOSED:
      return { ...state, countClosed: action.payload };
    case ACTIONS.COUNT_ASSIGNED_TO_ME:
      return { ...state, countAssignedToMe: action.payload };
    case ACTIONS.GET_TICKET_DATA:
      return { ...state, ticketData: action.payload };
    case ACTIONS.GET_AGENTS:
      return { ...state, agents: action.payload };
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
  ticketInfoView: false,
  ticketData: [],
  agents: []
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

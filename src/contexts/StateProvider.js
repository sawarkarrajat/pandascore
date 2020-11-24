import React, { createContext, useContext, useReducer } from "react";
/**
 * @type {context}
 */
export const StateContext = createContext();

/**
 * state provider for global state
 * to provide state wrap component with it.
 *
 * @param {propType} props
 */
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

/**
 * decorating useContext for easier understanding.
 */
export const useStateValue = () => useContext(StateContext);

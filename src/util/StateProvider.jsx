import React, { useContext, useReducer, createContext } from 'react'


export const StateContext = createContext()

export const StateProvider = ({reducer,children,initialState }) => (
    <StateContext.Provider value = {useReducer(reducer,initialState)} >
      {children}
    </StateContext.Provider>
)

export const useStateProvider = () =>  useContext((StateContext))

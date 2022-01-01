import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialValue={
loading:false,
cart:cartItems,
amount:0,
total:0
}

const AppProvider = ({ children }) => {
  const [state,dispatch]=useReducer(reducer,initialValue);
  const clearCart=()=>{
    dispatch({type:'CLEAR_CART'})
  }
  const removeSingle=(id)=>{
    dispatch({type:'REMOVE',payload:id})
  }

  const increase=(id)=>{
    dispatch({type:'INCREASE',payload:id})
  }

  const decrease=(id)=>{
    dispatch({type:'DECREASE',payload:id})
  }

  useEffect(()=>{
    dispatch({type:'GET_TOTAL'})
  },[state.cart])


  const fetchData=async ()=>{
    dispatch({type:'LOADING'});
    const respone= await fetch(url);
    const cart=await respone.json();
    dispatch({type:'DISPLAY_ITEMS',payload:cart})

  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <AppContext.Provider
      value={{...state,clearCart,removeSingle,increase,decrease
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

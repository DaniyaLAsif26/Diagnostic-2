import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cart/cartSlice.js'
import { loadCart,saveCart } from "./persist";

export const store = configureStore({
    reducer :{
        cart : cartReducer
    },
    preloadedState : {
        cart : loadCart()
    }
})

let last = store.getState().cart

store.subscribe(() => {
    const cart = store.getState().cart
    if(cart !== last){
        last = cart;
        saveCart(cart)
    }
})
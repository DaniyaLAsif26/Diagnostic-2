import { createSlice, createSelector } from '@reduxjs/toolkit'
import { finalPrice } from '../../utils/price'

const cartSlice = createSlice({
    name: "cart",
    initialState: { items: [] },
    reducers: {
        addToCart: {
            prepare: (type, item) => ({
                payload: {
                    id: item.id,
                    type,
                    key: `${type}-${item.id}`
                }
            }),
            reducer: (state, action) => {
                if (!state.items.some((i) => i.key === action.payload.key))
                    state.items.push(action.payload)
            }
        },

        removeFromCart : (state,action) =>{
            state.items = state.items.filter((i) => i.key !== action.payload)
        },

        clearCart : (state) =>{
            state.items = []
        }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer

export const selectCartItems = (state) => state.cart.items
export const selectCartCount = (state) => state.cart.items.length
export const selectIsInCart = (type , id) => (state) =>state.cart.items.some((i)=> i.key === `${type}-${id}`)

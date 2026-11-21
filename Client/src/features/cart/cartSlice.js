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
                    key: `${type}-${item.id}`,
                    type,
                    name: item.name,
                    category : item.category,
                    price: item.price,
                    offerPrice: item.offerPrice ?? 0,
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
export const selectCartTotal = (state) => state.cart.items.reduce((sum,i) => sum + finalPrice(i) , 0)
export const selectCartSavings = (state) => state.cart.items.reduce((sum,i) => sum +(i.price - finalPrice(i)) , 0)
export const selectIsInCart = (type , id) => (state) =>state.cart.items.some((i)=> i.key === `${type}-${id}`)

export const selectCartTests = createSelector([selectCartItems] , (items) => items.filter((i) => i.type === 'test'))
export const selectCartPackages = createSelector([selectCartItems] , (items) => items.filter((i) => i.type === 'package'))
import { useDispatch, useSelector } from 'react-redux'

import { addToCart, removeFromCart, selectIsInCart } from '../features/cart/cartSlice'

/** Add/remove a test or package ('test' | 'package') from the cart and report whether it is in it. */
export function useCartToggle(type, item) {
    const dispatch = useDispatch()
    const inCart = useSelector(selectIsInCart(type, item.id))

    const toggle = () => dispatch(inCart ? removeFromCart(`${type}-${item.id}`) : addToCart(type, item))

    return { inCart, toggle }
}

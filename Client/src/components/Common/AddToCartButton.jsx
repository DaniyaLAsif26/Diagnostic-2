import Icon from '../Icon/Icon'
import { useCartToggle } from '../../hooks/useCartToggle'

const base = 'relative z-10 flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-[0.98]'
const add = 'bg-brand-dark text-white shadow-lg shadow-brand/25 hover:bg-brand-mid'
const remove = 'bg-white text-red-600 shadow-sm ring-1 ring-red-200 hover:bg-red-50 hover:ring-red-300'

export default function AddToCartButton({ type, item, className = '' }) {
    const { inCart, toggle } = useCartToggle(type, item)

    return (
        <button
            onClick={toggle}
            type="button"
            className={`${base} ${inCart ? remove : add} ${className}`}>
            <Icon name="cart" className={`size-4 ${inCart ? '' : 'text-emerald-300'}`} />
            {inCart ? 'Remove' : 'Add to cart'}
        </button>
    )
}

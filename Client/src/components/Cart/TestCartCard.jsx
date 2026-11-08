import CartCard from './CartCard'
import { finalPrice } from '../../utils/price'

/** Single lab or radiology test */
export default function TestCartCard({ item }) {
    return (
        <CartCard
            icon={item.category === 'RADIOLOGY' ? 'scan' : 'tube'}
            name={item.name}
            label="Test"
            mrp={item.price}
            price={finalPrice(item)} />
    )
}

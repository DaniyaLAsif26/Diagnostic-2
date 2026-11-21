import CartCard from './CartCard'
import { finalPrice } from '../../utils/price'

/** Single lab or radiology test */
export default function TestCartCard({ item }) {
    const isScan = item.category === 'RADIOLOGY'
    return (
        <CartCard
            itemKey={item.key}
            icon={isScan ? 'scan' : 'tube'}
            iconTone={isScan ? 'bg-teal-50 text-teal-600' : 'bg-sky-50 text-sky-600'}
            label={isScan ? 'Radiology test' : 'Lab test'}
            name={item.name}
            mrp={item.price}
            price={finalPrice(item)} />
    )
}

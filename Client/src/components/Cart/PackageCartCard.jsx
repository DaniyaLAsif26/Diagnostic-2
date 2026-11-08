import CartCard, { ViewTests } from './CartCard'
import { finalPrice } from '../../utils/price'

/** Ready-made package - tests listed by name only, as wrapping chips */
export default function PackageCartCard({ item }) {
    return (
        <CartCard
            icon="shield"
            name={item.name}
            label="Package"
            meta={`${item.tests.length} tests`}
            mrp={item.price}
            price={finalPrice(item)}>

            <ViewTests>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                    {item.tests.map((test) => (
                        <li key={test.id} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">{test.name}</li>
                    ))}
                </ul>
            </ViewTests>
        </CartCard>
    )
}

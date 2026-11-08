import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import CartCard, { ViewTests } from './CartCard'
import { inr, onOffer, finalPrice } from '../../utils/price'
import { itemMrp, itemPrice } from '../../utils/cart'

/** Package the user built - priced from its tests, so each test shows its price */
export default function CustomPackageCartCard({ item }) {
    return (
        <CartCard
            icon="package"
            name={item.name}
            label="Custom package"
            meta={`${item.tests.length} tests`}
            extra={<Link to="/create-package" className="font-semibold text-brand-light transition hover:text-brand">Edit</Link>}
            mrp={itemMrp(item)}
            price={itemPrice(item)}>

            <ViewTests>
                <ul className="mt-2 divide-y divide-slate-100 rounded-lg bg-slate-50 px-3 ring-1 ring-slate-200/70">
                    {item.tests.map((test) => (
                        <li key={test.id} className="flex items-center justify-between gap-3 py-2 text-xs">
                            <span className="flex min-w-0 items-center gap-2 text-slate-700">
                                <Icon name={test.category === 'RADIOLOGY' ? 'scan' : 'tube'} className="size-3.5 shrink-0 text-slate-400" />
                                <span className="truncate">{test.name}</span>
                            </span>
                            <span className="shrink-0">
                                {onOffer(test) && <span className="mr-1.5 text-slate-400 line-through">{inr(test.price)}</span>}
                                <span className="font-medium text-slate-900">{inr(finalPrice(test))}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            </ViewTests>
        </CartCard>
    )
}

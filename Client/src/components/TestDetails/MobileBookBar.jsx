import { Link } from 'react-router-dom'

import { inr, onOffer, finalPrice } from '../../utils/price'

/** Price + Book, pinned to the bottom on phones where the price card is far up the page. */
export default function MobileBookBar({ test }) {
    return (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(15,27,61,0.25)] backdrop-blur lg:hidden">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                <div className="min-w-0">
                    <p className="truncate text-xs text-slate-500">{test.name}</p>
                    <p className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-brand-dark">{inr(finalPrice(test))}</span>
                        {onOffer(test) && <span className="text-xs text-slate-400 line-through">{inr(test.price)}</span>}
                    </p>
                </div>
                <Link to="/#book" className="shrink-0 rounded-xl bg-brand-dark px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid">
                    Book now
                </Link>
            </div>
        </div>
    )
}

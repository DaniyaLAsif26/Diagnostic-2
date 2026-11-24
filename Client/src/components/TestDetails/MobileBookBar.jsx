import { inr, onOffer, finalPrice } from '../../utils/price'
import { useCartToggle } from '../../hooks/useCartToggle'

/** Price + Add to cart, pinned to the bottom on phones where the price card is far up the page. `type` is 'test' or 'package'. */
export default function MobileBookBar({ test, type }) {
    const { inCart, toggle } = useCartToggle(type, test)

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
                <button
                    onClick={toggle}
                    type="button"
                    className={`shrink-0 rounded-xl px-6 py-3 text-sm font-semibold transition active:scale-[0.98] ${inCart
                        ? 'bg-white text-red-600 shadow-sm ring-1 ring-red-200 hover:bg-red-50 hover:ring-red-300'
                        : 'bg-brand-dark text-white shadow-lg shadow-brand/25 hover:bg-brand-mid'}`}>
                    {inCart ? 'Remove' : 'Add to cart'}
                </button>
            </div>
        </div>
    )
}

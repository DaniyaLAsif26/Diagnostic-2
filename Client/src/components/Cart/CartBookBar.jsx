import Icon from '../Icon/Icon'
import { inr } from '../../utils/price'

/** Total + book button fixed to the bottom on phones and tablets */
export default function CartBookBar({ count, total }) {
    return (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgb(15_27_61/0.15)] backdrop-blur lg:hidden">
            <div className="mx-auto flex max-w-xl items-center gap-4">
                <div className="leading-tight">
                    <p className="text-[11px] text-slate-500">{count} {count === 1 ? 'item' : 'items'} · Total</p>
                    <p className="text-lg font-bold text-brand-dark">{inr(total)}</p>
                </div>
                <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-dark px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
                    Proceed to book<Icon name="arrow" className="size-4" />
                </button>
            </div>
        </div>
    )
}

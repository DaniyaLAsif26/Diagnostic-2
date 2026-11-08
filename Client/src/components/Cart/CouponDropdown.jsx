import Icon from '../Icon/Icon'
import { input } from '../Forms/styles/formHelpers'
import { inr } from '../../utils/price'

/** Collapsible coupon picker plus the applied-coupon chip */
export default function CouponDropdown({ coupon, offers }) {
    return (
        <div className="border-t border-slate-100 pt-5">
            {/* Collapsed by default - native <details>, no state needed */}
            <details className="group rounded-xl ring-1 ring-slate-200 open:ring-brand-light/40">
                <summary className="flex cursor-pointer list-none items-center gap-2.5 px-3.5 py-3 text-sm font-semibold text-slate-700 transition hover:text-brand [&::-webkit-details-marker]:hidden">
                    <Icon name="tag" className="size-4 text-brand-light" />
                    <span className="flex-1">Apply coupon</span>
                    <span className="text-xs font-medium text-slate-400">{offers.length} available</span>
                    <Icon name="chevron" className="size-4 text-slate-400 transition group-open:rotate-180" />
                </summary>

                <div className="border-t border-slate-100 p-3.5">
                    <label htmlFor="coupon" className="sr-only">Coupon code</label>
                    <div className="flex gap-2">
                        <input id="coupon" name="coupon" type="text" placeholder="Enter coupon code" className={`${input} uppercase placeholder:normal-case`} />
                        <button type="button" className="shrink-0 rounded-xl bg-brand-light/10 px-4 text-sm font-semibold text-brand transition hover:bg-brand-light/20">Apply</button>
                    </div>
                    {/* Error state: <p role="alert" className="mt-1.5 pl-1 text-xs font-medium text-red-600">This code is not valid</p> */}

                    <ul className="mt-3 space-y-2">
                        {offers.map((o) => (
                            <li key={o.code} className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 px-3.5 py-2">
                                <span className="min-w-0 flex-1 leading-tight">
                                    <span className="block text-xs font-bold tracking-wide text-brand-dark">{o.code}</span>
                                    <span className="text-[11px] text-slate-500">{o.text}</span>
                                </span>
                                <button type="button" className="shrink-0 text-xs font-semibold text-brand-light transition hover:text-brand">Apply</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </details>

            {/* Applied state - show instead of the dropdown once a code is accepted */}
            {coupon && (
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-emerald-50 px-3.5 py-2.5 ring-1 ring-emerald-200">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-white"><Icon name="check" className="size-3.5" /></span>
                    <span className="min-w-0 flex-1 leading-tight">
                        <span className="block text-sm font-bold tracking-wide text-emerald-800">{coupon.code}</span>
                        <span className="text-xs text-emerald-700">Applied · you save {inr(coupon.amount)}</span>
                    </span>
                    <button type="button" className="text-xs font-semibold text-slate-500 transition hover:text-red-600">Remove</button>
                </div>
            )}
        </div>
    )
}

import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import CouponDropdown from './CouponDropdown'
import { inr } from '../../utils/price'

const Row = ({ name, value, className = 'text-slate-700' }) => (
    <div className="flex justify-between gap-4">
        <dt className="text-slate-500">{name}</dt>
        <dd className={`font-semibold ${className}`}>{value}</dd>
    </div>
)

/** Sidebar card: coupon, bill breakdown, total and the desktop book button */
export default function OrderSummary({ count, mrp, subtotal, total, coupon, offers }) {
    return (
        <aside className="lg:sticky lg:top-24">
            <div className="space-y-5 rounded-3xl bg-white p-6 shadow-xl shadow-brand/10 ring-1 ring-slate-900/5">
                <h2 className="font-semibold text-brand-dark">Order summary</h2>

                <CouponDropdown coupon={coupon} offers={offers} />

                <div className="border-t border-slate-100 pt-5">
                    <dl className="space-y-1.5 text-sm">
                        <Row name={`Items (${count})`} value={inr(mrp)} />
                        {mrp > subtotal && <Row name="Discount" value={`− ${inr(mrp - subtotal)}`} className="text-emerald-600" />}
                        {coupon && <Row name={`Coupon (${coupon.code})`} value={`− ${inr(coupon.amount)}`} className="text-emerald-600" />}
                        <Row name="Home collection" value="Free" className="text-emerald-600" />
                    </dl>
                    <div className="mt-3 flex items-center justify-between border-t border-dashed border-slate-300 pt-3">
                        <p className="font-semibold text-slate-700">Total</p>
                        <p className="text-2xl font-bold text-brand-dark">{inr(total)}</p>
                    </div>
                    {mrp > total && (
                        <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                            <Icon name="tag" className="size-3.5" />You save {inr(mrp - total)} on this order
                        </p>
                    )}
                </div>

                {/* Phones and tablets use CartBookBar instead */}
                <div className="hidden lg:block">
                    <Link to="/checkout" className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
                        Proceed to book<Icon name="arrow" className="size-4" />
                    </Link>
                    <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                        <Icon name="phone" className="size-3.5" />Our team will call you to confirm and book
                    </p>
                </div>
            </div>
        </aside>
    )
}

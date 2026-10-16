import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import { tel, whatsapp } from '../../constants/contact'
import { inr, onOffer, finalPrice, discountPercent } from '../../utils/price'

/** Price, savings, perks and the Book / Call / WhatsApp actions. */
export default function PriceCard({ test, priceLabel, perks, payNote }) {
    const discounted = onOffer(test)

    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-brand/10 ring-1 ring-slate-900/5">
            {/* Price */}
            <div className="relative overflow-hidden bg-linear-to-br from-brand-dark to-brand-light p-6 text-white">
                <div aria-hidden="true" className="absolute -right-12 -top-12 size-44 rounded-full border border-white/10" />
                <div aria-hidden="true" className="absolute -right-4 -top-4 size-24 rounded-full border border-white/10" />

                <p className="relative text-xs font-semibold uppercase tracking-wider text-white/70">{priceLabel}</p>
                <p className="relative mt-2 flex items-end gap-3">
                    <span className="text-4xl font-bold tracking-tight">{inr(finalPrice(test))}</span>
                    {discounted && <span className="mb-1 text-sm text-white/60 line-through">{inr(test.price)}</span>}
                </p>
                {discounted && (
                    <p className="relative mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/20">
                        <Icon name="tag" className="size-3.5" />
                        You save {inr(test.price - test.offerPrice)} · {discountPercent(test)}% off
                    </p>
                )}
            </div>

            {/* Perks + actions */}
            <div className="p-6">
                <ul className="space-y-4">
                    {perks.map(({ icon, title, text }) => (
                        <li key={title} className="flex items-start gap-3">
                            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-600">
                                <Icon name={icon} className="size-4.5" />
                            </span>
                            <span className="text-sm leading-tight">
                                <span className="block font-semibold text-slate-900">{title}</span>
                                <span className="text-slate-500">{text}</span>
                            </span>
                        </li>
                    ))}
                </ul>

                <Link to="/#book" className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
                    Book now<Icon name="arrow" className="size-4" />
                </Link>
                <div className="mt-3 grid grid-cols-2 gap-3">
                    <a href={tel} className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-brand ring-1 ring-slate-200 transition hover:bg-slate-50 hover:ring-brand-light/40">
                        <Icon name="phone" className="size-4" />Call
                    </a>
                    <a href={whatsapp} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-brand ring-1 ring-slate-200 transition hover:bg-slate-50 hover:ring-brand-light/40">
                        <Icon name="chat" className="size-4" />WhatsApp
                    </a>
                </div>
                <p className="mt-4 text-center text-xs text-slate-400">{payNote}</p>
            </div>
        </div>
    )
}

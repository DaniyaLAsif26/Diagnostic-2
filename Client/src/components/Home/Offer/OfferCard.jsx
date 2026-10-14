import { Link } from 'react-router-dom'

import Icon from '../../Icon/Icon'
import { inr, discountPercent } from '../../../utils/price'
import { MONTHS, offerDeadline, toDate } from './offerDates'

// Colour of each offer's band - pick one per occasion
const offerThemes = {
    rose: 'from-rose-500 to-red-600',
    blue: 'from-sky-500 to-blue-700',
    amber: 'from-amber-500 to-orange-600',
    pink: 'from-pink-500 to-fuchsia-600',
    violet: 'from-violet-500 to-purple-700',
    teal: 'from-teal-500 to-emerald-600',
}

/** One health-day offer. `featured` lays it out wide when it is the only offer. */
export default function OfferCard({ offer, featured }) {
    const { label, urgent } = offerDeadline(offer.validTill)
    const date = toDate(offer.date)

    return (
        <article className={`flex overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/10 ${featured ? 'flex-col md:flex-row' : 'w-[85%] shrink-0 snap-start flex-col md:w-auto'}`}>
            {/* Occasion band */}
            <div className={`relative overflow-hidden bg-linear-to-br p-5 text-white sm:p-6 ${offerThemes[offer.theme]} ${featured ? 'md:flex md:w-80 md:shrink-0 md:flex-col md:justify-between md:p-8' : ''}`}>
                <Icon name={offer.icon} className="pointer-events-none absolute -bottom-6 -right-6 size-36 text-white/15" />

                <div className="relative flex items-center gap-3">
                    <span className="flex w-12 shrink-0 flex-col items-center rounded-xl bg-white/15 py-1.5 leading-none ring-1 ring-white/25">
                        <span className="text-lg font-bold">{date.getDate()}</span>
                        <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                            {MONTHS[date.getMonth()]}
                        </span>
                    </span>
                    <span className="leading-tight">
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/75">Special day offer</span>
                        <span className="block font-bold">{offer.occasion}</span>
                    </span>
                </div>

                <p className="relative mt-5 flex items-baseline gap-1.5">
                    <span className="text-5xl font-extrabold tracking-tight">{discountPercent(offer)}%</span>
                    <span className="text-lg font-bold">OFF</span>
                </p>
            </div>

            {/* Details */}
            <div className={`flex flex-1 flex-col p-5 sm:p-6 ${featured ? 'md:justify-center md:p-8' : ''}`}>
                <h3 className="text-lg font-semibold text-slate-900">{offer.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{offer.text}</p>

                <p className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-brand-dark">{inr(offer.offerPrice)}</span>
                    <span className="text-sm text-slate-400 line-through">{inr(offer.price)}</span>
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${urgent ? 'text-rose-600' : 'text-slate-500'}`}>
                        {urgent ? (
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-500 opacity-60 motion-reduce:animate-none" />
                                <span className="relative size-2 rounded-full bg-rose-500" />
                            </span>
                        ) : (
                            <Icon name="clock" className="size-3.5" />
                        )}
                        {label}
                    </span>
                    <Link to={offer.to} className="rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid">
                        Book now
                    </Link>
                </div>
            </div>
        </article>
    )
}

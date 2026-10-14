import OfferCard from './OfferCard'
import { isActive } from './offerDates'
import { wrap } from '../../../constants/layout'

// Offers for health awareness days. Each one shows from 'startsOn' (optional)
// until the end of 'validTill', then hides itself - just add or edit entries here.
// theme: rose | blue | amber | pink | violet | teal
const occasionOffers = [
    {
        occasion: 'World Heart Day', date: '2026-09-29', validTill: '2026-10-15', theme: 'rose', icon: 'heart',
        title: 'Heart Care Package', text: 'Lipid profile, hs-CRP, ECG and more to check how your heart is doing.',
        price: 2499, offerPrice: 1499, to: '/packages?concern=heart',
    },
    {
        occasion: 'World Arthritis Day', date: '2026-10-12', validTill: '2026-10-25', theme: 'amber', icon: 'bone',
        title: 'Bone & Joint Care', text: 'Vitamin D, calcium, uric acid and RA factor for stronger bones and joints.',
        price: 1799, offerPrice: 1169, to: '/packages?concern=bone',
    },
    {
        occasion: 'World Diabetes Day', date: '2026-11-14', startsOn: '2026-10-10', validTill: '2026-11-20', theme: 'blue', icon: 'droplet',
        title: 'Diabetes Care Package', text: 'HbA1c, fasting and post-meal sugar, plus kidney checks, in one visit.',
        price: 1899, offerPrice: 949, to: '/packages?concern=diabetes',
    },
]

/** "Health day specials" - hidden entirely when no offer is running. */
export default function Offers() {
    const active = occasionOffers.filter(isActive)

    if (!active.length) return null

    return (
        <section aria-labelledby="offers-heading" className={`${wrap} mt-14 pb-16 sm:pb-20`}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-rose-600">
                        <span className="size-2 rounded-full bg-rose-500" />Limited-time offers
                    </p>
                    <h2 id="offers-heading" className="mt-2 text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">Health day specials</h2>
                </div>
                <p className="text-sm text-slate-500">Special prices on awareness days, for a short time only.</p>
            </div>

            {active.length === 1 ? (
                <div className="mt-8">
                    <OfferCard offer={active[0]} featured />
                </div>
            ) : (
                // Swipe on phones, grid from md up
                <div className={`-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-none md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 ${active.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
                    {active.map((offer) => <OfferCard key={offer.occasion} offer={offer} />)}
                </div>
            )}
        </section>
    )
}

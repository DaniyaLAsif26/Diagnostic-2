import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import { concernLabel } from '../../constants/concerns'
import { inr, onOffer, finalPrice, discountPercent } from '../../utils/price'
import { slugify } from '../../utils/slug'

const PREVIEW = 5 // tests shown on the card; the rest are on the package page

export default function PackageCard({ pkg }) {
    const discounted = onOffer(pkg)
    const url = `/package/${slugify(pkg.name)}/${pkg.id}`
    const count = pkg.tests.length

    return (
        // `relative` anchors the stretched title link below, which makes the whole card clickable
        <article className="relative flex h-full flex-col rounded-3xl bg-white p-5 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/10 hover:ring-brand-light/30">
            <div className="flex-1 pb-5">
                <div className="flex items-start justify-between gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl bg-brand/5 text-brand">
                        <Icon name="package" className="size-5.5" />
                    </span>
                    {pkg.isPopular && (
                        <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                            <Icon name="star" className="size-3 fill-current" />Most booked
                        </span>
                    )}
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900">
                    <Link to={url} className="after:absolute after:inset-0 after:rounded-3xl">
                        {pkg.name}
                    </Link>
                </h3>
                <p className="mt-2 flex w-fit items-center gap-1.5 rounded-lg bg-brand-light/5 px-2.5 py-1 text-xs text-slate-600 ring-1 ring-brand-light/10">
                    <Icon name="list" className="size-3.5 text-brand-light" />
                    Parameters covered: <span className="font-bold text-brand-dark">{count}</span>
                </p>
                {pkg.description && <p className="mt-2 text-sm text-slate-500">{pkg.description}</p>}

                <div className="mt-3 flex flex-wrap gap-1.5">
                    {pkg.relevance?.map((tag) => (
                        <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">{concernLabel[tag] ?? tag}</span>
                    ))}
                </div>

                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {pkg.tests.slice(0, PREVIEW).map((t, i) => (
                        <li key={`${t.name}-${i}`} className="flex items-start gap-2">
                            <Icon name="check" className="mt-0.5 size-4 shrink-0 text-emerald-500" />{t.name}
                        </li>
                    ))}
                </ul>
                {count > PREVIEW && (
                    <Link to={url} className="relative z-10 mt-2 flex w-fit items-center gap-1 text-sm font-semibold text-brand-light transition hover:text-brand">
                        See {count - PREVIEW} more
                        <Icon name="arrow" className="size-4" />
                    </Link>
                )}

                {pkg.preparation && (
                    <p className="mt-4 flex w-fit items-center gap-1.5 rounded-md bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700">
                        <Icon name="clock" className="size-3.5 shrink-0" />{pkg.preparation}
                    </p>
                )}
            </div>

            <div className="border-t border-slate-100 pt-4">
                <div className="flex items-end justify-between gap-2">
                    <div>
                        {discounted && <p className="text-xs text-slate-400 line-through">{inr(pkg.price)}</p>}
                        <p className="text-2xl font-bold text-brand-dark">{inr(finalPrice(pkg))}</p>
                    </div>
                    {discounted && (
                        <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                            {discountPercent(pkg)}% OFF
                        </span>
                    )}
                </div>
                <Link to="/#book" className="relative z-10 mt-4 block rounded-xl bg-brand-dark py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid">
                    Book now
                </Link>
            </div>
        </article>
    )
}

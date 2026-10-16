import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import { concernLabel } from '../../constants/concerns'
import { inr, onOffer, finalPrice, discountPercent } from '../../utils/price'

/** One test, shaped like the Test model. Used on /tests and the home page's popular tests. */
export default function TestCard({ test }) {
    const isScan = test.category === 'RADIOLOGY'
    const discounted = onOffer(test)

    const slugify = (name) => {
        // name?.toLowerCase()
        return name.toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
    }

    return (
        <article className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/5 hover:ring-brand-light/30">
            <Link to={`/test/${slugify(test.name)}/${test.id}`}>
                <div className="flex-1 pb-5">
                    <div className="flex items-start justify-between gap-3">
                        <span className={`grid size-11 place-items-center rounded-xl ${isScan ? 'bg-teal-50 text-teal-600' : 'bg-sky-50 text-sky-600'}`}>
                            <Icon name={isScan ? 'scan' : 'tube'} className="size-5" />
                        </span>
                        {test.isPopular && (
                            <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                                <Icon name="star" className="size-3 fill-current" />Popular
                            </span>
                        )}
                    </div>

                    <h3 className="mt-4 font-semibold leading-snug text-slate-900">{test.name}</h3>
                    <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-400">{isScan ? 'Radiology' : 'Laboratory'}</p>
                    {test.description && <p className="mt-2 line-clamp-2 text-sm text-slate-500">{test.description}</p>}

                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {test.relevance.map((tag) => (
                            <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">{concernLabel[tag] ?? tag}</span>
                        ))}
                    </div>

                    {test.preparation && (
                        <p className="mt-3 flex w-fit items-center gap-1.5 rounded-md bg-amber-50 px-2 py-1 text-[11px] font-medium text-amber-700">
                            <Icon name="clock" className="size-3.5 shrink-0" />{test.preparation}
                        </p>
                    )}
                </div>

                <div className="flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                    <div>
                        {discounted && (
                            <p className="flex items-center gap-2 text-xs">
                                <span className="text-slate-400 line-through">{inr(test.price)}</span>
                                <span className="font-semibold text-emerald-600">{discountPercent(test)}% off</span>
                            </p>
                        )}
                        <p className="text-xl font-bold text-brand-dark">{inr(finalPrice(test))}</p>
                    </div>
                    <Link to="/#book" className="rounded-xl border border-brand/20 px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white">
                        Book
                    </Link>
                </div>
            </Link>
        </article>
    )
}

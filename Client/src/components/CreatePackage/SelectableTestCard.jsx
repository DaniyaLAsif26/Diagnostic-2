import Icon from '../Icon/Icon'
import { concernLabel } from '../../constants/concerns'
import { inr, onOffer, finalPrice, discountPercent } from '../../utils/price'

/** TestCard with an Add checkbox instead of Book. The whole card is a label, so tapping anywhere ticks it. */
export default function SelectableTestCard({ test, checked }) {
    const isScan = test.category === 'RADIOLOGY'

    return (
        <label className="group flex h-full cursor-pointer flex-col rounded-2xl bg-white p-4 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/5 hover:ring-brand-light/30 has-checked:bg-brand-light/[0.04] has-checked:ring-2 has-checked:ring-brand-light">
            <div className="flex-1 pb-4">
                <div className="flex items-start justify-between gap-3">
                    <span className={`grid size-10 place-items-center rounded-lg ${isScan ? 'bg-teal-50 text-teal-600' : 'bg-sky-50 text-sky-600'}`}>
                        <Icon name={isScan ? 'scan' : 'tube'} className="size-5" />
                    </span>
                    {test.isPopular && (
                        <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                            <Icon name="star" className="size-3 fill-current" />Popular
                        </span>
                    )}
                </div>

                <h3 className="mt-3 text-[15px] font-semibold leading-snug text-slate-900">{test.name}</h3>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">{isScan ? 'Radiology' : 'Laboratory'}</p>
                {test.description && <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-slate-500">{test.description}</p>}

                <div className="mt-2.5 flex flex-wrap gap-1">
                    {test.relevance.map((tag) => (
                        <span key={tag} className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-600">{concernLabel[tag] ?? tag}</span>
                    ))}
                </div>

                {test.preparation && (
                    <p className="mt-2.5 flex w-fit items-center gap-1.5 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                        <Icon name="clock" className="size-3.5 shrink-0" />{test.preparation}
                    </p>
                )}
            </div>

            <div className="flex items-end justify-between gap-3 border-t border-slate-100 pt-3">
                <div>
                    {onOffer(test) && (
                        <p className="flex items-center gap-2 text-xs">
                            <span className="text-slate-400 line-through">{inr(test.price)}</span>
                            <span className="font-semibold text-emerald-600">{discountPercent(test)}% off</span>
                        </p>
                    )}
                    <p className="text-lg font-bold text-brand-dark">{inr(finalPrice(test))}</p>
                </div>

                {/* Looks like a button; fills in and reads "Added" once ticked */}
                <span className="flex items-center gap-2 rounded-lg border border-brand/20 px-3 py-1.5 text-[13px] font-semibold text-brand transition group-hover:border-brand-light group-has-checked:border-brand group-has-checked:bg-brand group-has-checked:text-white">
                    <span className="relative grid place-items-center">
                        <input
                            type="checkbox"
                            defaultChecked={checked}
                            aria-label={`Add ${test.name} to package`}
                            className="peer size-4 cursor-pointer appearance-none rounded border-2 border-current outline-none checked:border-white checked:bg-white focus-visible:ring-4 focus-visible:ring-brand-light/30"
                        />
                        <Icon name="check" className="pointer-events-none absolute size-2.5 text-brand opacity-0 peer-checked:opacity-100" />
                    </span>
                    <span className="group-has-checked:hidden">Add</span>
                    <span className="hidden group-has-checked:inline">Added</span>
                </span>
            </div>
        </label>
    )
}

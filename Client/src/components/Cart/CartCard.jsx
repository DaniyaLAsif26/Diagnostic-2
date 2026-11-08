import Icon from '../Icon/Icon'
import { inr } from '../../utils/price'

/** Shared shell for every cart row: icon, name, kind label + meta, price and remove. Extra content goes in children. */
export default function CartCard({ icon, name, label, meta, extra, mrp, price, children }) {
    return (
        <li className="rounded-xl bg-white py-3 pl-3 pr-2 shadow-sm ring-1 ring-slate-900/5 sm:pr-3">
            <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-light/10 text-brand">
                    <Icon name={icon} className="size-4.5" />
                </span>

                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold leading-snug text-slate-900">{name}</h3>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-xs text-slate-500">
                        <span className="font-medium text-slate-600">{label}</span>
                        {meta && <><span aria-hidden="true">·</span>{meta}</>}
                        {extra && <><span aria-hidden="true">·</span>{extra}</>}
                    </p>
                </div>

                <div className="shrink-0 text-right leading-tight">
                    {mrp > price && <span className="block text-[11px] text-slate-400 line-through">{inr(mrp)}</span>}
                    <span className="text-[15px] font-bold text-brand-dark">{inr(price)}</span>
                </div>

                <button type="button" aria-label={`Remove ${name}`} className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600">
                    <Icon name="close" className="size-4" />
                </button>
            </div>

            {children}
        </li>
    )
}

/** "View tests" toggle under a package row - native <details>, no state needed */
export function ViewTests({ children }) {
    return (
        <details className="group ml-12 mr-1 mt-2">
            <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-xs font-medium text-slate-500 transition hover:text-brand [&::-webkit-details-marker]:hidden">
                View tests
                <Icon name="chevron" className="size-3.5 transition group-open:rotate-180" />
            </summary>
            {children}
        </details>
    )
}

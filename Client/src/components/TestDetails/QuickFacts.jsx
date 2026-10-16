import Icon from '../Icon/Icon'

/** Small fact tiles under the title, in one compact row (2 or 3 tiles). `facts`: [{ icon, label, value }] */
export default function QuickFacts({ facts }) {
    return (
        <dl className={`mt-8 grid max-w-3xl gap-2 sm:gap-3 ${facts.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {facts.map(({ icon, label, value }) => (
                <div key={label} className="flex flex-col items-start gap-2 rounded-2xl bg-white/80 p-3 ring-1 ring-slate-900/5 backdrop-blur sm:flex-row sm:items-center sm:gap-3 sm:p-3.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand/5 text-brand sm:size-10">
                        <Icon name={icon} className="size-4.5 sm:size-5" />
                    </span>
                    <div className="min-w-0">
                        <dt className="text-[11px] text-slate-500 sm:text-xs">{label}</dt>
                        <dd className="line-clamp-2 text-xs font-semibold text-slate-900 sm:line-clamp-1 sm:text-sm">{value}</dd>
                    </div>
                </div>
            ))}
        </dl>
    )
}

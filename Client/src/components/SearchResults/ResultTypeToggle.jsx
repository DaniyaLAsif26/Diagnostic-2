import Icon from '../Icon/Icon'

const options = [
    { value: 'tests', label: 'Tests', icon: 'tube' },
    { value: 'packages', label: 'Packages', icon: 'package' },
]

/** Tests / Packages switch on the search page. `counts` = { tests, packages } shown as badges. */
export default function ResultTypeToggle({ value, onChange, counts = {} }) {
    return (
        <div role="group" aria-label="Show results for" className="inline-flex w-full rounded-2xl bg-slate-100 p-1.5 sm:w-auto">
            {options.map(({ value: option, label, icon }) => {
                const selected = value === option
                return (
                    <button
                        key={option}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => onChange(option)}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition sm:flex-none ${selected ? 'bg-white text-brand-dark shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        <Icon name={icon} className="size-4" />
                        {label}
                        {counts[option] != null && (
                            <span className={`rounded-full px-2 py-0.5 text-xs ${selected ? 'bg-brand/10 text-brand' : 'bg-slate-200 text-slate-500'}`}>
                                {counts[option]}
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    )
}

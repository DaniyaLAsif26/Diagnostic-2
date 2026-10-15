import Icon from '../Icon/Icon'

const types = [
    { value: '', label: 'All' },
    { value: 'laboratory', label: 'Laboratory', icon: 'tube' },
    { value: 'radiology', label: 'Radiology', icon: 'scan' },
]

// All / Laboratory / Radiology switch in the tests toolbar
export default function TypeToggle({ type, onChange }) {
    return (
        <div role="group" aria-label="Type" className="flex rounded-xl bg-slate-100 p-1">
            {types.map(({ value, label, icon }) => (
                <button
                    key={label}
                    type="button"
                    aria-pressed={type === value}
                    onClick={() => onChange(value)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${type === value ? 'bg-white text-brand-dark shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                    {icon && <Icon name={icon} className="hidden size-4 sm:block" />}
                    {label}
                </button>
            ))}
        </div>
    )
}

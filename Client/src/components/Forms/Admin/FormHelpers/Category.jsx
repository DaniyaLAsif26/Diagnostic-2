import { categories } from '../../styles/formHelpers'
import { stroke } from '../../styles/iconStroke'

export default function Category({ register, disabled = false }) {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((c) => (
                <label key={c.value} className="relative has-[:enabled]:cursor-pointer">
                    <input {...register('category')}
                        disabled={disabled}
                        type="radio" value={c.value} className="peer sr-only" />
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3.5 transition has-[:enabled]:hover:bg-slate-50 peer-checked:border-brand-light peer-checked:bg-brand-light/5 peer-checked:ring-4 peer-checked:ring-brand-light/15 peer-disabled:opacity-60">
                        <span className="grid size-10 place-items-center rounded-lg bg-brand-light/10 text-brand">
                            <svg viewBox="0 0 24 24" {...stroke} className="size-5">{c.icon}</svg>
                        </span>
                        <span>
                            <span className="block text-sm font-semibold text-slate-900">{c.title}</span>
                            <span className="block text-xs text-slate-500">{c.hint}</span>
                        </span>
                    </div>
                </label>
            ))}
        </div>
    )
}
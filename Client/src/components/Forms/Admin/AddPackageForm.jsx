import { label,input,Card,categories } from '../styles/formHelpers'
import { stroke } from '../styles/iconStroke'
import { useNavigate } from 'react-router-dom'

const results = [
    { id: 1, name: 'Complete Blood Count', price: 800 },
    { id: 2, name: 'Lipid Profile', price: 1500 },
    { id: 3, name: 'Liver Function Test', price: 1200 },
]

const picked = [
    { id: 1, name: 'Complete Blood Count', isNew: false },
    { id: 2, name: 'Lipid Profile', isNew: false },
    { id: 3, name: 'Vitamin D3', isNew: true },
]

export default function AddPackageForm() {

    const navigate = useNavigate()

    return (
        <form noValidate className="p-6 lg:p-8">
            {/* Header */}
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <button type="button" onClick={() => navigate('/admin/packages')} className="flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-brand">
                        <svg viewBox="0 0 24 24" {...stroke} className="size-4"><path d="m15 18-6-6 6-6" /></svg>
                        Back to packages
                    </button>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-brand-dark">Add Package</h1>
                    <p className="mt-1 text-sm text-slate-500">Bundle tests together at a package price.</p>
                </div>

                <div className="flex gap-3">
                    <button type="button" onClick={() => navigate('/admin/packages')} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                        Cancel
                    </button>
                    <button type="submit" className="rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
                        Save Package
                    </button>
                </div>
            </header>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <Card
                    title="Package details" hint="Name, price and description of the package."
                    icon={<path d="M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8" />}>

                    <div>
                        <label className={label}>Package Name</label>
                        <input type="text" placeholder="e.g. Full Body Checkup" className={input} />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className={label}>Price</label>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">Rs.</span>
                                <input type="number" placeholder="0" className={`${input} pl-12`} />
                            </div>
                        </div>

                        <div>
                            <label className={label}>Offer Price <span className="font-normal text-slate-400">(optional)</span></label>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">Rs.</span>
                                <input type="number" placeholder="0" className={`${input} pl-12`} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className={label}>Category</label>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {categories.map((c) => (
                                <label key={c.value} className="relative cursor-pointer">
                                    <input type="radio" name="category" value={c.value} className="peer sr-only" />
                                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3.5 transition hover:bg-slate-50 peer-checked:border-brand-light peer-checked:bg-brand-light/5 peer-checked:ring-4 peer-checked:ring-brand-light/15">
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
                    </div>

                    <div>
                        <label className={label}>Description</label>
                        <textarea rows={4} placeholder="What this package covers" className={input} />
                    </div>

                    <div>
                        <label className={label}>Patient Preparation</label>
                        <textarea rows={4} placeholder="e.g. Fasting for 10-12 hours" className={input} />
                    </div>

                    {/* Popular toggle */}
                    <label className="relative flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-200 p-3.5 transition hover:bg-slate-50">
                        <span className="flex items-center gap-3">
                            <span className="grid size-10 place-items-center rounded-lg bg-amber-50 text-amber-500">
                                <svg viewBox="0 0 24 24" {...stroke} className="size-5"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z" /></svg>
                            </span>
                            <span>
                                <span className="block text-sm font-semibold text-slate-900">Mark as popular</span>
                                <span className="block text-xs text-slate-500">Highlights this package for patients</span>
                            </span>
                        </span>
                        <input type="checkbox" className="peer sr-only" />
                        <span className="relative h-6 w-11 shrink-0 rounded-full bg-slate-200 transition after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:bg-brand-light peer-checked:after:translate-x-5" />
                    </label>
                </Card>

                <Card
                    title="Tests included" hint="Search saved tests or type a new name to add it."
                    icon={<path d="M9 2h6M10 2v14a2 2 0 0 0 4 0V2M10 11h4" />}>

                    {/* Search + add */}
                    <div>
                        <label className={label}>Add Test</label>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <input type="text" placeholder="Search or type a test name" className={`${input} pl-10`} />
                                <svg viewBox="0 0 24 24" {...stroke} className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400">
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="m20 20-3.5-3.5" />
                                </svg>

                                {/* Search results - render only while typing */}
                                <ul className="absolute inset-x-0 top-full z-10 mt-2 max-h-56 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                                    {results.map((t) => (
                                        <li key={t.id}>
                                            <button type="button" className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-brand-light/5">
                                                {t.name}
                                                <span className="text-xs text-slate-400">Rs. {t.price}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button type="button" className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Picked tests */}
                    <div>
                        <label className={label}>Tests in this package <span className="font-normal text-slate-400">({picked.length})</span></label>
                        <ul className="min-h-32 space-y-2 rounded-xl bg-slate-50 p-3">
                            {picked.map((t) => (
                                <li key={t.id} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-slate-900/5">
                                    <span className={`text-sm font-medium ${t.isNew ? 'text-slate-900' : 'text-brand-light'}`}>{t.name}</span>
                                    <span className="flex items-center gap-2">
                                        {t.isNew && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">New</span>}
                                        <button type="button" aria-label={`Remove ${t.name}`} className="text-slate-400 transition hover:text-red-500">×</button>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-1.5 pl-1 text-xs text-slate-400">Blue tests are already saved, black ones will be created with the package.</p>
                    </div>
                </Card>
            </div>
        </form>
    )
}

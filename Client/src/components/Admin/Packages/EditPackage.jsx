import { label, Card, categories, field, input } from "../../Forms/styles/formHelpers.jsx"
import { stroke } from "../../Forms/styles/iconStroke"

const editing = false

export default function EditPackage({data , PackageId}) {
    return (
        <form className="p-6 lg:p-8">
            {/* Header */}
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <button type="button" className="flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-brand">
                        <svg viewBox="0 0 24 24" {...stroke} className="size-4"><path d="m15 18-6-6 6-6" /></svg>
                        Back to packages
                    </button>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-brand-dark">{data.name}</h1>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-brand-light/10 px-2.5 py-1 text-xs font-medium text-brand">{data.category}</span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{data?.tests?.length} tests</span>
                        {data.isPopular && <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600">Popular</span>}
                    </div>
                </div>

                <div className="flex gap-3">
                    {editing ? (
                        <>
                            <button type="button" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                                Cancel
                            </button>
                            <button type="submit" className="flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99] disabled:opacity-60">
                                <svg viewBox="0 0 24 24" {...stroke} className="size-4"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2M17 21v-8H7v8M7 3v5h8" /></svg>
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <button type="button" className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 active:scale-[0.99]">
                                <svg viewBox="0 0 24 24" {...stroke} className="size-4"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" /></svg>
                                Delete
                            </button>
                            <button type="button" className="flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
                                <svg viewBox="0 0 24 24" {...stroke} className="size-4"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
                                Edit
                            </button>
                        </>
                    )}
                </div>
            </header>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <Card
                    title="Package details" hint="Name, price and description of the package."
                    icon={<path d="M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8" />}>

                    <div>
                        <label className={label}>Package Name</label>
                        <input type="text" defaultValue={data.name} disabled={!editing} className={field} />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        {[['Price', data.price], ['Offer Price', data?.offerPrice]].map(([text, value]) => (
                            <div key={text}>
                                <label className={label}>{text}</label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">Rs.</span>
                                    <input type="number" defaultValue={value} disabled={!editing} className={`${field} pl-12`} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <label className={label}>Category</label>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {categories.map((c) => (
                                <label key={c.value} className="relative has-[:enabled]:cursor-pointer">
                                    <input type="radio" name="category" value={c.value} defaultChecked={data.category === c.value} disabled={!editing} className="peer sr-only" />
                                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3.5 transition peer-checked:border-brand-light peer-checked:bg-brand-light/5 peer-checked:ring-4 peer-checked:ring-brand-light/15 peer-disabled:opacity-60">
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
                        <textarea rows={3} defaultValue={data.description} disabled={!editing} className={field} />
                    </div>

                    <div>
                        <label className={label}>Patient Preparation</label>
                        <textarea rows={3} defaultValue={data.preparation} disabled={!editing} className={field} />
                    </div>

                    {/* Popular toggle */}
                    <label className="relative flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3.5 transition has-[:enabled]:cursor-pointer has-[:enabled]:hover:bg-slate-50">
                        <span className="flex items-center gap-3">
                            <span className="grid size-10 place-items-center rounded-lg bg-amber-50 text-amber-500">
                                <svg viewBox="0 0 24 24" {...stroke} className="size-5"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z" /></svg>
                            </span>
                            <span>
                                <span className="block text-sm font-semibold text-slate-900">Marked as popular</span>
                                <span className="block text-xs text-slate-500">Highlights this package for patients</span>
                            </span>
                        </span>
                        <input type="checkbox" defaultChecked={data.isPopular} disabled={!editing} className="peer sr-only" />
                        <span className="relative h-6 w-11 shrink-0 rounded-full bg-slate-200 transition after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:bg-brand-light peer-checked:after:translate-x-5 peer-disabled:opacity-70" />
                    </label>
                </Card>

                <Card
                    title="Tests included" hint="Tests bundled in this package."
                    icon={<path d="M9 2h6M10 2v14a2 2 0 0 0 4 0V2M10 11h4" />}>

                    {/* Search + add - only while editing (reuse the AddPackageForm picker here) */}
                    {editing && (
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <input type="text" placeholder="Search or type a test name" className={`${input} pl-10`} />
                                <svg viewBox="0 0 24 24" {...stroke} className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400">
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="m20 20-3.5-3.5" />
                                </svg>
                            </div>
                            <button type="button" className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                                Add
                            </button>
                        </div>
                    )}

                    <ul className="space-y-2 rounded-xl bg-slate-50 p-3">
                        {data.tests.map((t, i) => (
                            <li key={t.name} className="flex items-center gap-3 rounded-lg bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-slate-900/5">
                                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">{i + 1}</span>
                                <span className={`flex-1 text-sm font-medium ${t.testId ? 'text-brand-light' : 'text-slate-900'}`}>{t.name}</span>
                                {!t.testId && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">New</span>}
                                {editing && <button type="button" aria-label={`Remove ${t.name}`} className="text-slate-400 transition hover:text-red-500">×</button>}
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </form>
    )
}

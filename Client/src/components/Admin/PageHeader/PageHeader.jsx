import { stroke } from "../../Forms/styles/iconStroke"
import { useNavigate } from 'react-router-dom'

export default function PageHeader({ title, subtitle, search, setSearch,placeholder, category, setCategory, addLink,addBtn }) {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`${addLink}`)
    }

    return (
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-brand-dark">{title}</h1>
                <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            </div>

            <div className="flex gap-3">
                <div className="relative flex-1 sm:w-72">
                    <input
                        type="search"
                        placeholder={placeholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="peer w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-light focus:ring-4 focus:ring-brand-light/15"
                    />
                    <svg viewBox="0 0 24 24" {...stroke} className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400 peer-focus:text-brand">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                    </svg>
                </div>

                <div className="relative shrink-0">
                    <select 
                    value={category}
                    onChange={(e)=> setCategory(e.target.value)}
                    
                    className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-brand-light focus:ring-4 focus:ring-brand-light/15">
                        <option value="">All Types</option>
                        <option value="laboratory">Laboratory</option>
                        <option value="radiology">Radiology</option>
                    </select>
                    <svg viewBox="0 0 24 24" {...stroke} className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>

                <button
                    onClick={handleClick}
                    className="flex shrink-0 items-center gap-2 rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
                    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2} className="size-4">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    {addBtn}
                </button>
            </div>
        </header>
    )
}
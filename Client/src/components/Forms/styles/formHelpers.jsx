import { stroke } from '../styles/iconStroke'
 
 const label = 'mb-1.5 block text-sm font-medium text-slate-700'

const input = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-light focus:ring-4 focus:ring-brand-light/15'

const field = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-light focus:ring-4 focus:ring-brand-light/15 disabled:border-transparent disabled:bg-slate-50 disabled:text-slate-600'

const Card = ({ icon, title, hint, children }) => (
    <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
            <span className="grid size-9 place-items-center rounded-lg bg-brand-light/10 text-brand">
                <svg viewBox="0 0 24 24" {...stroke} className="size-4.5">{icon}</svg>
            </span>
            <div>
                <h2 className="font-semibold text-brand-dark">{title}</h2>
                <p className="text-xs text-slate-500">{hint}</p>
            </div>
        </div>
        <div className="space-y-5 p-6">{children}</div>
    </section>
)

const categories = [
    { value: 'LABORATORY', title: 'Laboratory', hint: 'Blood, urine & sample tests', icon: <path d="M9 2h6M10 2v7L4.5 19a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9V2M7 15h10" /> },
    { value: 'RADIOLOGY', title: 'Radiology', hint: 'X-ray, ultrasound & scans', icon: <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10" /> },
]

const Err = ({ e }) => e && <p role="alert" className="mt-1.5 pl-1 text-xs font-medium text-red-600">{e.message}</p>

export {label,input,Card,categories,Err,field}
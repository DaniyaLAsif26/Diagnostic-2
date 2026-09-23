import LOGO from '../../../assets/logo.png'
import { stroke } from '../../Forms/styles/iconStroke'

export default function AdminNavbar({ showLogo }) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
            {/* Fades out when the sidebar is open, since the sidebar shows the logo then */}
            <div className={`flex items-center gap-2.5 transition-opacity duration-300 ${showLogo ? 'opacity-100' : 'opacity-0'}`}>
                <img src={LOGO} alt="Vision Diagnostic Centre" className="size-10 rounded-full" />
                <p className="text-sm font-bold uppercase leading-tight text-brand">
                    Vision Diagnostic<br />Centre
                </p>
            </div>

            {/* Static profile box */}
            <button className="flex items-center gap-3 rounded-xl py-1.5 pl-1.5 pr-3 transition hover:bg-slate-100">
                <span className="grid size-9 place-items-center rounded-full bg-brand-dark text-sm font-semibold text-white">A</span>
                <span className="hidden text-left sm:block">
                    <span className="block text-sm font-semibold text-slate-900">Admin</span>
                    <span className="block text-xs text-slate-500">admin@vision.com</span>
                </span>
                <svg viewBox="0 0 24 24" {...stroke} className="size-4 text-slate-400"><path d="m6 9 6 6 6-6" /></svg>
            </button>
        </header>
    )
}

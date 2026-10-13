import { Link, NavLink } from 'react-router-dom'

import LOGO from '../../../assets/logo.png'
import Icon from '../../Icon/Icon'
import { CONTACT, tel, landlineTel, directions } from '../../../constants/contact'

// Tests and Packages are pages; the rest are sections on the home page
const navLinks = [
    { label: 'Tests', to: '/tests' },
    { label: 'Packages', to: '/packages' },
    { label: 'Radiology', to: '/#radiology' },
    { label: 'How it works', to: '/#how-it-works' },
    { label: 'FAQs', to: '/#faqs' },
    { label: 'Contact', to: '/#contact' },
]

const wrap = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'

// Highlight only real pages - every /#section link would otherwise match "/"
const isCurrent = (to, isActive) => isActive && !to.includes('#')

// Close the mobile <details> menu once a link is picked
const closeMenu = (e) => e.currentTarget.closest('details')?.removeAttribute('open')

function TopBar() {
    return (
        <div className="hidden bg-brand-dark text-xs text-white/75 sm:block">
            <div className={`${wrap} flex h-9 items-center justify-between gap-4`}>
                <div className="flex items-center gap-5">
                    <span className="flex items-center gap-1.5"><Icon name="clock" className="size-3.5" />{CONTACT.hours} · {CONTACT.sundayHours}</span>
                    <a href={directions} target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 transition hover:text-white lg:flex">
                        <Icon name="pin" className="size-3.5" />{CONTACT.address}
                    </a>
                </div>
                <div className="flex items-center gap-5">
                    <a href={`mailto:${CONTACT.email}`} className="hidden items-center gap-1.5 transition hover:text-white xl:flex">
                        <Icon name="mail" className="size-3.5" />{CONTACT.email}
                    </a>
                    <a href={landlineTel} className="hidden items-center gap-1.5 transition hover:text-white md:flex">
                        <Icon name="phone" className="size-3.5" />{CONTACT.landline}
                    </a>
                    <a href={tel} className="flex items-center gap-1.5 font-medium text-white">
                        <Icon name="phone" className="size-3.5" />{CONTACT.phone}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default function UserNavbar() {
    return (
        <>
            <TopBar />

            <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
                <div className={`${wrap} flex h-16 items-center justify-between gap-4 sm:h-18`}>
                    <Link to="/" className="flex shrink-0 items-center gap-2.5">
                        <img src={LOGO} alt="Vision Diagnostic Centre" className="size-10 rounded-full sm:size-11" />
                        <span className="h-9 w-0.5 bg-brand" />
                        <p className="text-xs font-bold uppercase leading-tight text-brand sm:text-sm">Vision Diagnostic<br />Centre</p>
                    </Link>

                    <nav className="hidden items-center gap-1 lg:flex">
                        {navLinks.map(({ label, to }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) => `whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition xl:px-3.5 ${isCurrent(to, isActive) ? 'bg-brand/5 text-brand' : 'text-slate-600 hover:bg-slate-100 hover:text-brand'}`}
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <a href={tel} className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-brand transition hover:bg-slate-100 xl:flex">
                            <Icon name="phone" className="size-4" />Call us
                        </a>
                        <Link to="/login" className="hidden items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand ring-1 ring-slate-200 transition hover:bg-slate-50 hover:ring-brand-light/40 sm:flex">
                            <Icon name="user" className="size-4" />Login
                        </Link>
                        <Link to="/tests" className="whitespace-nowrap rounded-xl bg-brand-dark px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid sm:px-5">
                            Book a Test
                        </Link>

                        {/* Mobile menu */}
                        <details className="group relative lg:hidden">
                            <summary aria-label="Menu" className="grid size-10 cursor-pointer list-none place-items-center rounded-xl text-slate-600 transition hover:bg-slate-100 [&::-webkit-details-marker]:hidden">
                                <Icon name="menu" className="size-5 group-open:hidden" />
                                <Icon name="close" className="hidden size-5 group-open:block" />
                            </summary>
                            <nav className="absolute right-0 top-12 w-60 rounded-2xl bg-white p-2 shadow-xl shadow-brand/10 ring-1 ring-slate-900/5">
                                {navLinks.map(({ label, to }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        onClick={closeMenu}
                                        className={({ isActive }) => `block rounded-xl px-3.5 py-2.5 text-sm font-medium transition hover:bg-slate-100 hover:text-brand ${isCurrent(to, isActive) ? 'text-brand' : 'text-slate-700'}`}
                                    >
                                        {label}
                                    </NavLink>
                                ))}
                                <div className="mt-1 border-t border-slate-100 pt-1">
                                    <Link to="/login" onClick={closeMenu} className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-brand transition hover:bg-slate-100">
                                        <Icon name="user" className="size-4" />Login
                                    </Link>
                                    <a href={tel} className="flex items-center gap-2 rounded-xl bg-brand/5 px-3.5 py-2.5 text-sm font-semibold text-brand">
                                        <Icon name="phone" className="size-4" />{CONTACT.phone}
                                    </a>
                                </div>
                            </nav>
                        </details>
                    </div>
                </div>
            </header>
        </>
    )
}

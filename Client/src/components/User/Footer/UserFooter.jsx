import { Link } from 'react-router-dom'

import LOGO from '../../../assets/logo.png'
import Icon from '../../Icon/Icon'
import { CONTACT, tel, landlineTel, directions } from '../../../constants/contact'

const footerLinks = [
    { title: 'Services', links: [['Lab tests', '/#tests'], ['Health packages', '/#packages'], ['Radiology', '/#radiology'], ['Home collection', '/#book']] },
    { title: 'Company', links: [['How it works', '/#how-it-works'], ['FAQs', '/#faqs'], ['Book a test', '/#book'], ['Login', '/login']] },
]

const wrap = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'

export default function UserFooter() {
    return (
        <footer id="contact" className="scroll-mt-24 bg-brand-dark text-white/70">
            <div className={`${wrap} grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]`}>
                <div>
                    <div className="flex items-center gap-2.5">
                        <img src={LOGO} alt="Vision Diagnostic Centre" className="size-11 rounded-full bg-white p-0.5" />
                        <span className="h-9 w-0.5 bg-white" />
                        <p className="text-sm font-bold uppercase leading-tight text-white">Vision Diagnostic<br />Centre</p>
                    </div>
                    <p className="mt-5 max-w-xs text-sm leading-relaxed">
                        Trusted pathology and imaging services, with home sample collection and fast, accurate reports.
                    </p>
                </div>

                {footerLinks.map(({ title, links }) => (
                    <div key={title}>
                        <h3 className="text-sm font-semibold text-white">{title}</h3>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            {links.map(([label, to]) => (
                                <li key={label}><Link to={to} className="transition hover:text-white">{label}</Link></li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div>
                    <h3 className="text-sm font-semibold text-white">Visit us</h3>
                    <ul className="mt-4 space-y-3 text-sm">
                        <li className="flex gap-2.5">
                            <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-sky-300" />
                            <span>
                                {CONTACT.fullAddress}
                                <a href={directions} target="_blank" rel="noreferrer" className="mt-1 block font-semibold text-sky-300 transition hover:text-white">Get directions →</a>
                            </span>
                        </li>
                        <li className="flex gap-2.5">
                            <Icon name="phone" className="mt-0.5 size-4 shrink-0 text-sky-300" />
                            <span>
                                <a href={tel} className="block transition hover:text-white">{CONTACT.phone}</a>
                                <a href={landlineTel} className="block transition hover:text-white">{CONTACT.landline}</a>
                            </span>
                        </li>
                        <li><a href={`mailto:${CONTACT.email}`} className="flex gap-2.5 break-all transition hover:text-white"><Icon name="mail" className="mt-0.5 size-4 shrink-0 text-sky-300" />{CONTACT.email}</a></li>
                        <li className="flex gap-2.5">
                            <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-sky-300" />
                            <span>{CONTACT.hours}<br />{CONTACT.sundayHours}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className={`${wrap} flex flex-col gap-2 py-5 text-xs sm:flex-row sm:items-center sm:justify-between`}>
                    <p>© {new Date().getFullYear()} Vision Diagnostic Centre. All rights reserved.</p>
                    <div className="flex gap-5">
                        <a href="#privacy" className="transition hover:text-white">Privacy policy</a>
                        <a href="#terms" className="transition hover:text-white">Terms of use</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

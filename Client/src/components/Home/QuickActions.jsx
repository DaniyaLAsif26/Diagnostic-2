import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import { wrap } from '../../constants/layout'

const quickActions = [
    { icon: 'tube', title: 'Book Lab Tests', text: '500+ tests available', href: '/tests', tone: 'bg-sky-50 text-sky-600' },
    { icon: 'package', title: 'Health Packages', text: 'Full body & more', href: '/packages', tone: 'bg-indigo-50 text-indigo-600' },
    { icon: 'scan', title: 'Radiology & Scans', text: 'X-Ray, USG, ECG', href: '/tests?type=radiology', tone: 'bg-teal-50 text-teal-600' },
    { icon: 'upload', title: 'Upload Prescription', text: 'We’ll book it for you', href: '/#book', tone: 'bg-amber-50 text-amber-600' },
]

/** Four shortcut tiles that overlap the bottom of the hero. */
export default function QuickActions() {
    return (
        <section aria-label="Quick actions" className={`${wrap} relative -mt-12`}>
            <div className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-xl shadow-brand/10 ring-1 ring-slate-900/5 sm:gap-3 sm:p-3 lg:grid-cols-4">
                {quickActions.map(({ icon, title, text, href, tone }) => (
                    <Link key={title} to={href} className="group flex flex-col gap-3 rounded-2xl p-3 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:p-4">
                        <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${tone}`}>
                            <Icon name={icon} className="size-6" />
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold text-slate-900 sm:text-base">{title}</span>
                            <span className="block text-xs text-slate-500 sm:text-sm">{text}</span>
                        </span>
                        <Icon name="arrow" className="hidden size-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand sm:block" />
                    </Link>
                ))}
            </div>
        </section>
    )
}

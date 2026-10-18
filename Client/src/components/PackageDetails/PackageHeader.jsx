import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import { EcgAccent } from '../Common/SectionAccents'
import { onOffer, discountPercent } from '../../utils/price'

const chip = 'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1'

/** Breadcrumb, badges, name, description and a row of quick-info chips. */
export default function PackageHeader({ pkg }) {
    const count = pkg.tests.length
    const prep = pkg.preparation?.trim()

    return (
        <div>
            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm text-slate-500">
                <Link to="/" className="shrink-0 transition hover:text-brand">Home</Link>
                <Icon name="chevron" className="size-3.5 shrink-0 -rotate-90" />
                <Link to="/packages" className="shrink-0 transition hover:text-brand">Packages</Link>
                <Icon name="chevron" className="size-3.5 shrink-0 -rotate-90" />
                <span className="truncate font-medium text-brand-dark">{pkg.name}</span>
            </nav>

            <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-600/10">
                    <Icon name="package" className="size-3.5" />Health package
                </span>
                {pkg.isPopular && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-600/10">
                        <Icon name="star" className="size-3.5 fill-current" />Most booked
                    </span>
                )}
                {onOffer(pkg) && (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/10">
                        {discountPercent(pkg)}% off
                    </span>
                )}
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">{pkg.name}</h1>
            <EcgAccent />
            {pkg.description && <p className="mt-3 max-w-2xl text-slate-600">{pkg.description}</p>}

            <div className="mt-5 flex flex-wrap gap-2">
                <span className={`${chip} bg-white text-slate-700 ring-slate-200`}>
                    <Icon name="list" className="size-4 text-brand-light" />{count} test{count === 1 ? '' : 's'}
                </span>
                <span className={`${chip} bg-white text-slate-700 ring-slate-200`}>
                    <Icon name="report" className="size-4 text-brand-light" />Reports in 24 hrs
                </span>
                <span className={`${chip} bg-white text-slate-700 ring-slate-200`}>
                    <Icon name="home" className="size-4 text-brand-light" />Free home collection
                </span>
                <span className={`${chip} ${prep ? 'bg-amber-50 text-amber-800 ring-amber-600/15' : 'bg-emerald-50 text-emerald-800 ring-emerald-600/15'}`}>
                    <Icon name={prep ? 'clock' : 'check'} className="size-4" />{prep || 'No preparation needed'}
                </span>
            </div>
        </div>
    )
}

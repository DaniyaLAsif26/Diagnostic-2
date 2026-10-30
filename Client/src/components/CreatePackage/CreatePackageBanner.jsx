import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'

// Slim "build your own package" prompt for the top of the listing pages
export default function CreatePackageBanner() {
    return (
        <Link
            to="/create-package"
            className="group mt-4 flex items-center gap-4 rounded-2xl bg-linear-to-r from-brand-dark to-brand-light p-4 text-white shadow-lg shadow-brand/15 transition hover:shadow-xl hover:shadow-brand/25 sm:px-6"
        >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15">
                <Icon name="package" className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold sm:text-base">Can’t find the right package? Create your own</span>
                <span className="block text-xs text-white/75 sm:text-sm">Pick only the tests you need and see the total as you go.</span>
            </span>
            <span className="hidden shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-brand-dark transition group-hover:bg-slate-100 sm:inline-flex">
                Create package<Icon name="arrow" className="size-4" />
            </span>
            <Icon name="arrow" className="size-5 shrink-0 sm:hidden" />
        </Link>
    )
}

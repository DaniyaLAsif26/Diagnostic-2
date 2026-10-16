import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import { tel } from '../../constants/contact'
import { wrap } from '../../constants/layout'

/** Shown for a bad or out-of-date test link. */
export default function TestNotFound() {
    return (
        <div className={`${wrap} py-16 sm:py-24`}>
            <div className="mx-auto flex max-w-lg flex-col items-center rounded-3xl bg-slate-50 px-6 py-14 text-center ring-1 ring-slate-200/70">
                <span className="grid size-14 place-items-center rounded-full bg-white text-brand shadow-sm ring-1 ring-slate-900/5">
                    <Icon name="search" className="size-6" />
                </span>
                <h1 className="mt-4 text-xl font-semibold text-slate-900">We couldn’t find this test</h1>
                <p className="mt-2 text-sm text-slate-500">The link may be out of date, or the test is no longer offered.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Link to="/tests" className="rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid">
                        Browse all tests
                    </Link>
                    <a href={tel} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand ring-1 ring-slate-200 transition hover:ring-brand-light/40">
                        <Icon name="phone" className="size-4" />Ask us
                    </a>
                </div>
            </div>
        </div>
    )
}

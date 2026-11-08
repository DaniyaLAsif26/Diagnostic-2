import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import HeaderBackdrop from '../Header/HeaderBackdrop'

// Shown in place of the whole cart page when there is nothing in it
export default function EmptyCart() {
    return (
        <section className="px-2 pb-8 pt-2 sm:px-4 sm:pt-4">
            <div className="relative isolate grid min-h-[70dvh] place-items-center overflow-clip rounded-[1.75rem] bg-slate-50 px-6 py-16 text-center ring-1 ring-slate-900/5 sm:rounded-[2.5rem]">
                <HeaderBackdrop />

                <div className="max-w-sm">
                    <span className="mx-auto grid size-20 place-items-center rounded-full bg-white text-brand shadow-lg shadow-brand/10 ring-1 ring-slate-200">
                        <Icon name="cart" className="size-8" />
                    </span>

                    <h1 className="mt-6 text-xl font-bold tracking-tight text-brand-dark sm:text-2xl">Your cart is empty</h1>
                    <p className="mt-2 text-sm text-slate-500">Add tests or packages to your cart and they’ll show up here.</p>

                    <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link to="/tests" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid">
                            Browse tests<Icon name="arrow" className="size-4" />
                        </Link>
                        <Link to="/packages" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand ring-1 ring-slate-200 transition hover:bg-slate-50 hover:ring-brand-light/40">
                            View packages
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

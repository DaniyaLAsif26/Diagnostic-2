import Icon from '../Icon/Icon'
import { label, input } from '../Forms/styles/formHelpers'
import { wrap } from '../../constants/layout'
import { inr, onOffer, finalPrice } from '../../utils/price'

const Row = ({ name, value, className = 'text-slate-700' }) => (
    <div className="flex justify-between">
        <dt className="text-slate-500">{name}</dt>
        <dd className={`font-semibold ${className}`}>{value}</dd>
    </div>
)

/**
 * Cart bar stuck to the bottom of the page, plus the drawer it opens to name and review the package.
 * The drawer uses the native popover attribute, so it opens and closes without any state.
 */
export default function PackageCart({ tests }) {
    const mrp = tests.reduce((sum, t) => sum + t.price, 0)
    const total = tests.reduce((sum, t) => sum + finalPrice(t), 0)

    return (
        <>
            {/* Floating cart button - stays in the corner while scrolling and stops above the footer */}
            <div className={`${wrap} pointer-events-none sticky bottom-4 z-30 mb-4 flex justify-center sm:justify-end`}>
                <button type="button" popoverTarget="package-cart" className="pointer-events-auto flex items-center gap-3 rounded-full bg-brand-dark py-1.5 pl-1.5 pr-4 text-white shadow-xl shadow-brand/30 transition hover:bg-brand-mid">
                    <span className="relative grid size-9 place-items-center rounded-full bg-white/15">
                        <Icon name="package" className="size-4.5" />
                        <span className="absolute -right-1 -top-1 grid size-4.5 place-items-center rounded-full bg-sky-400 text-[10px] font-bold text-brand-dark ring-2 ring-brand-dark">{tests.length}</span>
                    </span>
                    <span className="text-left leading-tight">
                        <span className="block text-[11px] text-white/70">{tests.length} tests added</span>
                        <span className="block text-sm font-bold">{inr(total)}</span>
                    </span>
                    <span className="flex items-center gap-1 border-l border-white/20 pl-3 text-sm font-semibold">
                        Review<Icon name="arrow" className="size-4" />
                    </span>
                </button>
            </div>

            {/* Bottom sheet on phones, right-hand drawer from sm up */}
            <form
                id="package-cart"
                popover="auto"
                aria-labelledby="cart-heading"
                className="inset-x-0 bottom-0 top-auto m-0 h-[85dvh] w-full max-w-none flex-col overflow-hidden rounded-t-3xl border-0 bg-white p-0 shadow-2xl backdrop:bg-slate-900/40 backdrop:backdrop-blur-sm open:flex sm:inset-y-0 sm:left-auto sm:h-dvh sm:max-w-md sm:rounded-tr-none sm:rounded-bl-3xl"
            >
                <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                    <span className="grid size-10 place-items-center rounded-xl bg-brand-light/10 text-brand">
                        <Icon name="package" className="size-5" />
                    </span>
                    <div className="flex-1">
                        <h2 id="cart-heading" className="font-semibold text-brand-dark">Your package</h2>
                        <p className="text-xs text-slate-500">{tests.length} tests added</p>
                    </div>
                    <button type="button" popoverTarget="package-cart" popoverTargetAction="hide" aria-label="Close" className="grid size-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
                        <Icon name="close" className="size-5" />
                    </button>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto p-5">
                    <div>
                        <label htmlFor="package-name" className={label}>Package name <span className="text-red-500">*</span></label>
                        <input id="package-name" name="name" type="text" required maxLength={60} placeholder="e.g. My yearly checkup" className={input} />
                        {/* <p role="alert" className="mt-1.5 pl-1 text-xs font-medium text-red-600">Please name your package</p> */}
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-sm font-medium text-slate-700">Selected tests <span className="text-slate-400">({tests.length})</span></h3>
                            {tests.length > 0 && <button type="button" className="text-xs font-semibold text-slate-400 transition hover:text-red-600">Clear all</button>}
                        </div>

                        {tests.length === 0 ? (
                            <div className="rounded-2xl border-2 border-dashed border-slate-200 px-6 py-10 text-center">
                                <Icon name="list" className="mx-auto size-7 text-slate-300" />
                                <p className="mt-3 text-sm font-semibold text-slate-700">No tests added yet</p>
                                <p className="mt-1 text-xs text-slate-500">Tap Add on any test to put it in your package.</p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-slate-100 rounded-2xl ring-1 ring-slate-200">
                                {tests.map((test) => {
                                    const isScan = test.category === 'RADIOLOGY'
                                    return (
                                        <li key={test.id} className="flex items-center gap-3 py-3 pl-3 pr-1.5">
                                            <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${isScan ? 'bg-teal-50 text-teal-600' : 'bg-sky-50 text-sky-600'}`}>
                                                <Icon name={isScan ? 'scan' : 'tube'} className="size-4" />
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block text-sm font-medium leading-snug text-slate-800">{test.name}</span>
                                                <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{isScan ? 'Radiology' : 'Laboratory'}</span>
                                            </span>
                                            <span className="shrink-0 text-right leading-tight">
                                                {onOffer(test) && <span className="block text-[11px] text-slate-400 line-through">{inr(test.price)}</span>}
                                                <span className="text-sm font-semibold text-slate-900">{inr(finalPrice(test))}</span>
                                            </span>
                                            <button type="button" aria-label={`Remove ${test.name}`} className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600">
                                                <Icon name="close" className="size-4" />
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}

                        <button type="button" popoverTarget="package-cart" popoverTargetAction="hide" className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-brand-light transition hover:text-brand">
                            + Add more tests
                        </button>
                    </div>
                </div>

                <div className="border-t border-slate-200 bg-slate-50 p-5">
                    <dl className="space-y-1.5 text-sm">
                        <Row name="Total tests" value={tests.length} />
                        <Row name="Tests MRP" value={inr(mrp)} />
                        {mrp > total && <Row name="Discount" value={`− ${inr(mrp - total)}`} className="text-emerald-600" />}
                    </dl>
                    <div className="mt-3 flex items-center justify-between border-t border-dashed border-slate-300 pt-3">
                        <p className="font-semibold text-slate-700">Package total</p>
                        <p className="text-2xl font-bold text-brand-dark">{inr(total)}</p>
                    </div>
                    <button
                        type="submit"
                        disabled={tests.length === 0}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                    >
                        Create package<Icon name="arrow" className="size-4" />
                    </button>
                    <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                        <Icon name="phone" className="size-3.5" />Our team will call you to confirm and book
                    </p>
                </div>
            </form>
        </>
    )
}

import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import HeaderBackdrop from '../Header/HeaderBackdrop'
import { label, input } from '../Forms/styles/formHelpers'
import { wrap } from '../../constants/layout'
import { CONTACT, directions } from '../../constants/contact'

const slots = ['7 – 9 AM', '9 – 11 AM', '11 AM – 1 PM', '1 – 3 PM', '3 – 5 PM', '5 – 7 PM']

// Next 7 days for the date picker strip
const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return {
        value: d.toLocaleDateString('en-CA'), // YYYY-MM-DD in local time
        top: i === 0 ? 'Today' : i === 1 ? 'Tmrw' : d.toLocaleDateString('en-IN', { weekday: 'short' }),
        date: d.getDate(),
        month: d.toLocaleDateString('en-IN', { month: 'short' }),
    }
})

// Radio styled as a tile; the input itself is visually hidden
const choice = 'cursor-pointer rounded-xl bg-white text-center text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition hover:ring-brand-light/50 has-checked:bg-brand has-checked:text-white has-checked:shadow-md has-checked:shadow-brand/20 has-checked:ring-brand has-focus-visible:ring-4 has-focus-visible:ring-brand-light/30'
const req = <span className="text-red-500">*</span>

const Section = ({ step, title, hint, className = '', children }) => (
    <section className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 ${className}`}>
        <header className="mb-4 flex items-center gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-white">{step}</span>
            <div>
                <h2 className="text-[15px] font-semibold leading-tight text-brand-dark">{title}</h2>
                <p className="text-xs text-slate-500">{hint}</p>
            </div>
        </header>
        {children}
    </section>
)

export default function Checkout() {
    return (
        <section className="px-2 pb-8 pt-2 sm:px-4 sm:pt-4">
            <div className="relative isolate min-h-[70dvh] overflow-clip rounded-[1.75rem] bg-slate-50 ring-1 ring-slate-900/5 sm:rounded-[2.5rem]">
                <HeaderBackdrop />

                <div className={`${wrap} py-6 sm:py-8`}>
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light transition hover:text-brand">
                                <Icon name="arrow" className="size-4 rotate-180" />Back to cart
                            </Link>
                            <h1 className="mt-2 text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">Checkout</h1>
                        </div>
                        <p className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                            <Icon name="shield" className="size-4 text-emerald-600" />Free home collection by trained staff
                        </p>
                    </div>

                    <form className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
                        <div className="grid min-w-0 gap-5 xl:grid-cols-2">
                            <Section step={1} title="Patient details" hint="Who is the test for?">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label htmlFor="name" className={label}>Full name {req}</label>
                                        <input id="name" name="name" type="text" required autoComplete="name" placeholder="As on the report" className={input} />
                                    </div>
                                    <div>
                                        <label htmlFor="age" className={label}>Age {req}</label>
                                        <input id="age" name="age" type="number" min={0} max={120} required placeholder="Years" className={input} />
                                    </div>
                                    <fieldset>
                                        <legend className={label}>Gender {req}</legend>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['Male', 'Female'].map((g) => (
                                                <label key={g} className={`${choice} py-2.5`}>
                                                    <input type="radio" name="gender" value={g.toLowerCase()} required className="sr-only" />{g}
                                                </label>
                                            ))}
                                        </div>
                                    </fieldset>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="phone" className={label}>Mobile {req}</label>
                                        <input id="phone" name="phone" type="tel" inputMode="numeric" maxLength={10} required autoComplete="tel-national" placeholder="10-digit number" className={input} />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="email" className={label}>Email</label>
                                        <input id="email" name="email" type="email" autoComplete="email" placeholder="For reports" className={input} />
                                    </div>
                                </div>
                            </Section>

                            {/* Centre details / address card switch with CSS from the checked radio; swap for state if you prefer */}
                            <div className="group/collect min-w-0 space-y-5">
                                <Section step={2} title="Sample collection" hint="Where should we collect the sample?">
                                    <div className="grid grid-cols-2 gap-2">
                                        {[{ id: 'at-home', value: 'home', icon: 'home', text: 'Home' }, { id: 'at-centre', value: 'centre', icon: 'building', text: 'Diagnostic centre' }].map((o) => (
                                            <label key={o.id} className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:ring-brand-light/50 has-checked:bg-brand-light/5 has-checked:text-brand has-checked:ring-2 has-checked:ring-brand-light">
                                                <input id={o.id} type="radio" name="collection" value={o.value} defaultChecked={o.value === 'home'} className="size-4 shrink-0 accent-brand" />
                                                <Icon name={o.icon} className="size-4 shrink-0" />{o.text}
                                            </label>
                                        ))}
                                    </div>

                                    <div className="mt-4 hidden rounded-xl bg-slate-50 p-4 text-sm ring-1 ring-slate-200/70 group-has-[#at-centre:checked]/collect:block">
                                        <p className="font-semibold text-slate-900">Vision Diagnostic Centre</p>
                                        <p className="mt-1.5 flex items-start gap-2 text-slate-600"><Icon name="pin" className="mt-0.5 size-4 shrink-0 text-brand-light" />{CONTACT.fullAddress}</p>
                                        <p className="mt-1 flex items-center gap-2 text-slate-600"><Icon name="clock" className="size-4 shrink-0 text-brand-light" />{CONTACT.hours} · {CONTACT.sundayHours}</p>
                                        <a href={directions} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 font-semibold text-brand-light transition hover:text-brand">
                                            Get directions<Icon name="arrow" className="size-4" />
                                        </a>
                                    </div>
                                </Section>

                                {/* Not marked required - hidden fields would block submit when the centre is picked; validate them for home only */}
                                <Section step={3} title="Collection address" hint="Where should our staff visit?" className="hidden group-has-[#at-home:checked]/collect:block">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <label htmlFor="address" className={label}>House / flat, street {req}</label>
                                            <input id="address" name="address" type="text" autoComplete="street-address" className={input} />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="landmark" className={label}>Landmark</label>
                                            <input id="landmark" name="landmark" type="text" placeholder="e.g. Near Metro Station" className={input} />
                                        </div>
                                        <div>
                                            <label htmlFor="city" className={label}>City {req}</label>
                                            <input id="city" name="city" type="text" autoComplete="address-level2" className={input} />
                                        </div>
                                        <div>
                                            <label htmlFor="pincode" className={label}>Pincode {req}</label>
                                            <input id="pincode" name="pincode" type="text" inputMode="numeric" maxLength={6} autoComplete="postal-code" className={input} />
                                        </div>
                                    </div>
                                </Section>
                            </div>

                            <Section step={4} title="Date & time" hint="Pick a date and time slot" className="xl:col-span-2">
                                <fieldset>
                                    <legend className={label}>Date {req}</legend>
                                    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none">
                                        {days.map((d) => (
                                            <label key={d.value} className={`${choice} flex w-16 shrink-0 flex-col py-2 leading-tight`}>
                                                <input type="radio" name="date" value={d.value} required className="sr-only" />
                                                <span className="text-[11px] opacity-70">{d.top}</span>
                                                <span className="text-lg font-bold">{d.date}</span>
                                                <span className="text-[11px] opacity-70">{d.month}</span>
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>
                                <fieldset className="mt-4">
                                    <legend className={label}>Time slot {req}</legend>
                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
                                        {slots.map((s) => (
                                            <label key={s} className={`${choice} py-2.5`}>
                                                <input type="radio" name="slot" value={s} required className="sr-only" />{s}
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>
                            </Section>
                        </div>

                        <aside className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-brand/10 ring-1 ring-slate-900/5 lg:sticky lg:top-24">
                            <div className="relative overflow-hidden bg-linear-to-br from-brand-dark to-brand-light p-5 text-white">
                                <div aria-hidden="true" className="absolute -right-10 -top-10 size-36 rounded-full border border-white/10" />
                                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Amount payable</p>
                                <p className="mt-1 text-3xl font-bold tracking-tight">₹3,197</p>
                                <p className="mt-1 text-xs text-white/70">4 items · incl. all discounts</p>
                            </div>
                            <div className="p-5">
                                <ul className="space-y-2.5 text-sm text-slate-600">
                                    <li className="flex items-center gap-2.5"><Icon name="home" className="size-4 text-brand-light" />Free sample collection at home</li>
                                    <li className="flex items-center gap-2.5"><Icon name="report" className="size-4 text-brand-light" />Reports shared online</li>
                                    <li className="flex items-center gap-2.5"><Icon name="tag" className="size-4 text-brand-light" />Pay at the time of collection</li>
                                </ul>
                                <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
                                    Confirm booking<Icon name="arrow" className="size-4" />
                                </button>
                                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                                    <Icon name="phone" className="size-3.5" />Our team will call you to confirm
                                </p>
                            </div>
                        </aside>
                    </form>
                </div>
            </div>
        </section>
    )
}

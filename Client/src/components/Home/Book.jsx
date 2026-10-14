import Icon from '../Icon/Icon'
import { CONTACT, tel, whatsapp } from '../../constants/contact'
import { wrap } from '../../constants/layout'

const field = 'w-full rounded-xl border border-transparent bg-slate-100/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-light focus:bg-white focus:ring-4 focus:ring-brand-light/15'

/** "Book a home sample collection today" - call / WhatsApp buttons and a callback form. Target of /#book links. */
export default function Book() {
    return (
        <section id="book" className={`${wrap} scroll-mt-24 py-16 sm:py-20`}>
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-dark to-brand-light px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
                <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full border border-white/10" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/3 size-96 rounded-full bg-white/5 blur-2xl" />

                <div className="relative grid items-center gap-10 lg:grid-cols-2">
                    <div className="text-white">
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Book a home sample collection today</h2>
                        <p className="mt-3 max-w-md text-white/75">
                            Share your details and our team will call you back to confirm your test and a convenient time slot.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <a href={tel} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-dark transition hover:bg-slate-100">
                                <Icon name="phone" className="size-4" />{CONTACT.phone}
                            </a>
                            <a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10">
                                <Icon name="chat" className="size-4" />WhatsApp us
                            </a>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-2xl shadow-black/20 sm:p-6">
                        <h3 className="font-semibold text-slate-900">Request a callback</h3>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <input type="text" aria-label="Full name" placeholder="Full name" className={field} />
                            <input type="tel" aria-label="Mobile number" placeholder="Mobile number" className={field} />
                            <input type="text" aria-label="Test or package" placeholder="Test or package (optional)" className={`${field} sm:col-span-2`} />
                        </div>
                        <button type="button" className="mt-4 w-full rounded-xl bg-brand-dark py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
                            Request a callback
                        </button>
                        <p className="mt-3 text-center text-xs text-slate-400">We usually call back within 30 minutes during working hours.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

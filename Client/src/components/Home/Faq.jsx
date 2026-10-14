import Icon from '../Icon/Icon'
import SectionHeading from '../Common/SectionHeading'
import { tint } from '../Common/SectionAccents'
import { tel } from '../../constants/contact'
import { wrap } from '../../constants/layout'

const faqs = [
    { q: 'Do I need to fast before my test?', a: 'Some tests, like Lipid Profile and Fasting Blood Sugar, need 10–12 hours of fasting (water is fine). Preparation is listed for every test, and we remind you when confirming your booking.' },
    { q: 'Is home sample collection available?', a: 'Yes. A trained phlebotomist will collect your sample at home at no extra charge within our service area. Just pick a convenient slot while booking.' },
    { q: 'When will I get my reports?', a: 'Most routine blood tests are reported within 24 hours. Reports are shared online and on WhatsApp, and you can also collect a printed copy from the centre.' },
    { q: 'Can I book a test without a prescription?', a: 'Most lab tests and health packages can be booked without a prescription. Some radiology scans may need a referral from your doctor.' },
    { q: 'What payment methods do you accept?', a: 'We accept cash, UPI, debit and credit cards. For home collection you can pay online in advance or at the time of collection.' },
]

/** "Frequently asked questions" - accordion built on <details>, no JS needed. */
export default function Faq() {
    return (
        <section id="faqs" className={`${tint} scroll-mt-24 py-16 sm:py-20`}>
            <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_1.5fr]`}>
                <div>
                    <SectionHeading
                        eyebrow="FAQs"
                        icon="list"
                        title="Frequently asked questions"
                        text="Can’t find what you’re looking for? Our team is happy to help."
                    />
                    <a href={tel} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-brand shadow-sm ring-1 ring-slate-900/5 transition hover:ring-brand-light/40">
                        <Icon name="phone" className="size-4" />Talk to us
                    </a>
                </div>

                <div className="space-y-3">
                    {faqs.map(({ q, a }) => (
                        <details key={q} className="group rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition open:shadow-lg open:shadow-brand/5 open:ring-brand-light/30">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                                {q}
                                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-180 group-open:bg-brand group-open:text-white">
                                    <Icon name="chevron" className="size-4" />
                                </span>
                            </summary>
                            <p className="mt-3 pr-12 text-sm leading-relaxed text-slate-600">{a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    )
}

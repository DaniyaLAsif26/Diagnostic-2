import Icon from '../Icon/Icon'
import SectionHeading from '../Common/SectionHeading'
import { tint } from '../Common/SectionAccents'
import { wrap } from '../../constants/layout'

const steps = [
    { icon: 'calendar', title: 'Book a test', text: 'Search and book online, or simply give us a call.' },
    { icon: 'home', title: 'Sample collection', text: 'A trained phlebotomist visits your home, or walk in to the centre.' },
    { icon: 'flask', title: 'Lab processing', text: 'Samples are tested on calibrated, quality-checked analysers.' },
    { icon: 'report', title: 'Get your report', text: 'Download your report online or receive it on WhatsApp.' },
]

/** "Your test in 4 simple steps" - the How it works section. */
export default function Steps() {
    return (
        <section id="how-it-works" className={`${tint} scroll-mt-24 py-16 sm:py-20`}>
            <div className={wrap}>
                <SectionHeading center eyebrow="How it works" icon="calendar" title="Your test in 4 simple steps" />
                <div className="relative mt-12">
                    {/* dashed connector behind the step icons */}
                    <div aria-hidden="true" className="absolute inset-x-[12.5%] top-8 hidden border-t-2 border-dashed border-brand/15 lg:block" />
                    <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {steps.map(({ icon, title, text }, i) => (
                            <li key={title} className="flex flex-col items-center text-center">
                                <span className="relative grid size-16 place-items-center rounded-2xl bg-white text-brand shadow-lg shadow-brand/10 ring-1 ring-slate-900/5">
                                    <Icon name={icon} className="size-7" />
                                    <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-brand-dark text-xs font-bold text-white">{i + 1}</span>
                                </span>
                                <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
                                <p className="mt-2 max-w-60 text-sm text-slate-500">{text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}

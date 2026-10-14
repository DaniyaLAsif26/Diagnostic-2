import Icon from '../Icon/Icon'
import SectionHeading from '../Common/SectionHeading'
import { wrap } from '../../constants/layout'

const testimonials = [
    { name: 'Priya Sharma', meta: 'Full Body Checkup', text: 'The phlebotomist arrived on time at 7 AM and it was all done in five minutes. Reports were on my WhatsApp the same evening.' },
    { name: 'Rahul Verma', meta: 'Diabetes Care Package', text: 'Booked tests for my parents over a phone call. The staff explained the fasting instructions clearly and the prices were very reasonable.' },
    { name: 'Ayesha Khan', meta: 'Ultrasound', text: 'Clean centre, minimal waiting and a very polite team. The radiologist took the time to explain my report.' },
]

/** "What our patients say" - three review cards. */
export default function Testimonials() {
    return (
        <section className={`${wrap} py-16 sm:py-20`}>
            <SectionHeading center eyebrow="Testimonials" icon="chat" title="What our patients say" />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
                {testimonials.map(({ name, meta, text }) => (
                    <figure key={name} className="flex flex-col rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                        <div className="flex gap-0.5 text-amber-400">
                            {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" className="size-4 fill-current" />)}
                        </div>
                        <blockquote className="mt-4 flex-1 leading-relaxed text-slate-600">“{text}”</blockquote>
                        <figcaption className="mt-6 flex items-center gap-3">
                            <span className="grid size-10 place-items-center rounded-full bg-brand/10 text-sm font-semibold text-brand">{name[0]}</span>
                            <span>
                                <span className="block text-sm font-semibold text-slate-900">{name}</span>
                                <span className="text-xs text-slate-500">{meta}</span>
                            </span>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    )
}

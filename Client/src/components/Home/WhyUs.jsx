import Icon from '../Icon/Icon'
import { Eyebrow, EcgAccent } from '../Common/SectionAccents'
import { wrap } from '../../constants/layout'

const stats = [
    { value: '15+', label: 'Years of service' },
    { value: '500+', label: 'Tests available' },
    { value: '1 Lakh+', label: 'Patients served' },
    { value: '24 hrs', label: 'Average report time' },
]

const features = [
    { icon: 'flask', title: 'Modern lab equipment', text: 'Automated analysers with daily calibration and quality controls.' },
    { icon: 'award', title: 'Experienced team', text: 'Qualified pathologists and radiologists review every report.' },
    { icon: 'shield', title: 'Safe & hygienic', text: 'Sterile, single-use kits for every sample collection.' },
    { icon: 'tag', title: 'Honest pricing', text: 'Transparent rates with no hidden charges.' },
]

/** "Care and accuracy at every step" - dark band with stats and reasons to choose the centre. */
export default function WhyUs() {
    return (
        <section className="relative overflow-hidden bg-brand-dark py-16 text-white sm:py-20">
            {/* rings + ECG trace */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute -right-40 -top-40 size-130 rounded-full border border-white/5" />
                <div className="absolute -right-24 -top-24 size-90 rounded-full border border-white/5" />
                <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className="absolute inset-x-0 bottom-8 h-20 w-full text-white/5">
                    <path
                        d="M0 60h180l24-40 20 74 26-56 18 22h150l24-40 20 74 26-56 18 22h150l24-40 20 74 26-56 18 22h436"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <div className={`${wrap} relative grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center`}>
                <div>
                    <Eyebrow icon="shield" dark>Why Vision Diagnostic</Eyebrow>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Care and accuracy at every step</h2>
                    <EcgAccent dark />
                    <p className="mt-4 max-w-lg text-white/70">
                        From the moment you book to the moment you read your report, our team makes sure every result is accurate,
                        on time and easy to understand.
                    </p>
                    <dl className="mt-10 grid grid-cols-2 gap-6">
                        {stats.map(({ value, label }) => (
                            <div key={label} className="flex flex-col-reverse border-l-2 border-sky-300/40 pl-4">
                                <dt className="text-sm text-white/60">{label}</dt>
                                <dd className="text-3xl font-bold">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {features.map(({ icon, title, text }) => (
                        <div key={title} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:bg-white/8">
                            <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-sky-300">
                                <Icon name={icon} className="size-5.5" />
                            </span>
                            <h3 className="mt-4 font-semibold">{title}</h3>
                            <p className="mt-1.5 text-sm text-white/60">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

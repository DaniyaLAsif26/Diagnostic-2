import Icon from '../Icon/Icon'
import { Eyebrow, EcgAccent } from '../Common/SectionAccents'
import { wrap } from '../../constants/layout'

const scans = [
    { name: 'Digital X-Ray', icon: 'xray', note: 'Same-day reports' },
    { name: 'Ultrasound', icon: 'ultrasound', note: 'Abdomen, pelvis & more' },
    { name: 'ECG', icon: 'activity', note: 'Results in minutes' },
    { name: 'Colour Doppler', icon: 'scan', note: 'Vascular studies' },
]

const perks = ['Walk-in or pre-booked slots', 'Digital films and online reports', 'Comfortable, private scan rooms']

/** "Scans and imaging under one roof" - the radiology section. */
export default function Services() {
    return (
        <section id="radiology" className={`${wrap} scroll-mt-24 py-16 sm:py-20`}>
            <div className="grid items-center gap-10 rounded-3xl bg-linear-to-br from-sky-50 to-indigo-50 p-6 ring-1 ring-slate-200/60 sm:p-10 lg:grid-cols-2 lg:p-14">
                <div>
                    <Eyebrow icon="scan">Radiology & imaging</Eyebrow>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">Scans and imaging under one roof</h2>
                    <EcgAccent />
                    <p className="mt-3 text-slate-600">
                        From X-rays to ultrasound, get your imaging done at our centre with reports reviewed by experienced radiologists.
                    </p>
                    <ul className="mt-6 space-y-3 text-sm text-slate-700">
                        {perks.map((p) => (
                            <li key={p} className="flex items-center gap-2.5">
                                <span className="grid size-5 place-items-center rounded-full bg-brand-light text-white"><Icon name="check" className="size-3" /></span>
                                {p}
                            </li>
                        ))}
                    </ul>
                    <a href="#book" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid">
                        Book a scan<Icon name="arrow" className="size-4" />
                    </a>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {scans.map(({ name, icon, note }) => (
                        <div key={name} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/10">
                            <span className="grid size-12 place-items-center rounded-2xl bg-brand-dark text-white">
                                <Icon name={icon} className="size-6" />
                            </span>
                            <h3 className="mt-4 font-semibold text-slate-900">{name}</h3>
                            <p className="mt-1 text-xs text-slate-500">{note}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

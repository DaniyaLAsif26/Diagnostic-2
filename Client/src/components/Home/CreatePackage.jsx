import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import { Eyebrow } from '../Common/SectionAccents'
import { wrap } from '../../constants/layout'

const points = ['Choose any tests, lab or radiology', 'See your total update as you pick', 'Our team confirms and books it for you']

/** Tells visitors they can build their own health package. */
export default function CreatePackage() {
    return (
        <section aria-labelledby="create-package-heading" className={`${wrap} py-16 sm:py-20`}>
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-dark to-brand-light px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
                <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full border border-white/10" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 right-1/3 size-96 rounded-full bg-white/5 blur-2xl" />

                <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
                    <div className="text-white">
                        <Eyebrow icon="package" dark>Build your own</Eyebrow>
                        <h2 id="create-package-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Need something different? Create your own package</h2>
                        <p className="mt-3 max-w-xl text-white/75">
                            Not every checkup fits a ready-made package. Pick just the tests you need and we’ll put them together for you.
                        </p>
                        <Link to="/create-package" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-dark transition hover:bg-slate-100">
                            Create your package<Icon name="arrow" className="size-4" />
                        </Link>
                    </div>

                    <ul className="grid gap-3 text-sm text-white">
                        {points.map((point) => (
                            <li key={point} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
                                <Icon name="check" className="size-4 shrink-0 text-sky-300" />{point}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

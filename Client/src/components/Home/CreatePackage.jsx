import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import { Eyebrow } from '../Common/SectionAccents'
import { wrap } from '../../constants/layout'

const points = ['Choose any tests, lab or radiology', 'See your total update as you pick', 'Our team confirms and books it for you']

/** Tells visitors they can build their own health package. */
export default function CreatePackage() {
    return (
        <section aria-labelledby="create-package-heading" className={`${wrap} pb-2 pt-8 sm:pb-4 sm:pt-10 lg:pb-6 lg:pt-12`}>
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-brand-dark to-brand-light px-5 py-7 sm:rounded-3xl sm:px-8 sm:py-9 lg:px-12 lg:py-10">
                <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full border border-white/10" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 right-1/3 size-96 rounded-full bg-white/5 blur-2xl" />

                <div className="relative grid items-center gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
                    <div className="text-white">
                        <Eyebrow icon="package" dark>Build your own</Eyebrow>
                        <h2 id="create-package-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Need something different? Create your own package</h2>
                        <p className="mt-3 max-w-xl text-white/75">
                            Not every checkup fits a ready-made package. Pick just the tests you need and we’ll put them together for you.
                        </p>
                        <Link to="/create-package" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm sm:inline-flex sm:w-auto sm:justify-start font-semibold text-brand-dark transition hover:bg-slate-100">
                            Create your package<Icon name="arrow" className="size-4" />
                        </Link>
                    </div>

                    <ul className="grid gap-2.5 text-sm text-white sm:gap-3">
                        {points.map((point) => (
                            <li key={point} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-2.5 ring-1 ring-white/10">
                                <Icon name="check" className="size-4 shrink-0 text-sky-300" />{point}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import { slugify } from '../../utils/slug'

// Same category colours as the test cards
const groups = [
    { category: 'RADIOLOGY', title: 'Radiology tests', icon: 'scan', tone: 'bg-teal-50 text-teal-600' },
    { category: 'LABORATORY', title: 'Laboratory tests', icon: 'tube', tone: 'bg-sky-50 text-sky-600' },
]

const row = '-mx-2 flex items-start gap-2.5 rounded-lg px-2 py-1.5 text-sm'

/** Tests in the package, grouped by type. Saved tests are blue links to their page; new tests are plain text. */
export default function IncludedTests({ tests }) {
    const filled = groups
        .map((g) => ({ ...g, items: tests.filter((t) => t.category === g.category) }))
        .filter((g) => g.items.length)

    return (
        <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 sm:p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-brand-dark">
                Tests included
                <span className="rounded-full bg-brand-light/10 px-2 py-0.5 text-xs font-semibold text-brand-light">{tests.length}</span>
            </h2>

            <div className={`mt-5 grid gap-6 ${filled.length > 1 ? 'sm:grid-cols-2 sm:gap-8' : ''}`}>
                {filled.map(({ title, icon, tone, items }) => (
                    <div key={title}>
                        <h3 className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5 text-sm font-semibold text-slate-900">
                            <span className={`grid size-7 place-items-center rounded-lg ${tone}`}>
                                <Icon name={icon} className="size-4" />
                            </span>
                            {title}
                            <span className="ml-auto text-xs font-medium text-slate-400">{items.length}</span>
                        </h3>

                        <ul className={`mt-2 ${filled.length === 1 ? 'sm:columns-2 sm:gap-8' : ''}`}>
                            {items.map((t, i) => {
                                const check = (
                                    <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                                        <Icon name="check" className="size-3" />
                                    </span>
                                )

                                return (
                                    <li key={`${t.name}-${i}`} className="break-inside-avoid">
                                        {t.testId ? (
                                            <Link to={`/test/${slugify(t.name)}/${t.testId}`} className={`${row} group font-medium text-blue-600 transition hover:bg-blue-50 hover:text-blue-700`}>
                                                {check}
                                                <span className="flex-1">{t.name}</span>
                                                <Icon name="arrow" className="mt-0.5 size-4 shrink-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                                            </Link>
                                        ) : (
                                            <div className={`${row} font-medium text-slate-700`}>
                                                {check}
                                                <span className="flex-1">{t.name}</span>
                                            </div>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

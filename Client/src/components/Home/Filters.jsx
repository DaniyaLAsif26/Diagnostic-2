import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import { concerns } from '../../constants/concerns'

/**
 * Health-concern circles, used on the home page and the tests / packages pages.
 *
 * - With `onChange`: toggle buttons; `active` is the selected tag ('' for none).
 * - Without it: links to /tests?concern=<tag> (home page).
 *
 * Optional: `title` / `subtitle` add a heading with a Clear button,
 * `items` + `noun` show a count under each label ("3 tests"),
 * `layout="wrap"` wraps and centres the circles instead of scrolling sideways.
 */
export default function Filters({ active = '', onChange, items, noun, title, subtitle, layout = 'scroll' }) {
    const row = layout === 'wrap'
        ? 'flex flex-wrap justify-center gap-x-3 gap-y-6 lg:justify-between'
        : '-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 pt-1 scrollbar-none sm:mx-0 sm:px-0 lg:justify-between'

    const tiles = (
        <div className={`${title ? 'mt-4' : ''} ${row}`}>
            {concerns.map(({ tag, label, icon, tone }) => {
                const selected = active === tag
                const count = items?.filter((i) => i.relevance.includes(tag)).length

                const body = (
                    <>
                        <span className={`relative grid size-20 place-items-center rounded-full bg-white transition ${selected ? 'shadow-lg shadow-brand/10 ring-2 ring-brand-light' : 'ring-1 ring-slate-200 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-brand/5 group-hover:ring-brand-light/30'}`}>
                            <span className={`grid size-14 place-items-center rounded-full transition group-hover:scale-105 ${tone}`}>
                                <Icon name={icon} className="size-7" />
                            </span>
                            {selected && (
                                <span className="absolute right-0 top-0 grid size-5 place-items-center rounded-full bg-brand-light text-white ring-2 ring-white">
                                    <Icon name="check" className="size-3" />
                                </span>
                            )}
                        </span>
                        <span>
                            <span className="block text-sm font-semibold leading-tight text-slate-800">{label}</span>
                            {items && noun && (
                                <span className="text-xs text-slate-400">{count} {noun}{count === 1 ? '' : 's'}</span>
                            )}
                        </span>
                    </>
                )

                const tile = 'group flex w-24 shrink-0 flex-col items-center gap-2.5 text-center'

                return onChange ? (
                    <button key={tag} type="button" aria-pressed={selected} onClick={() => onChange(selected ? '' : tag)} className={tile}>
                        {body}
                    </button>
                ) : (
                    <Link key={tag} to={`/tests?concern=${tag}`} className={tile}>
                        {body}
                    </Link>
                )
            })}
        </div>
    )

    if (!title) return tiles

    return (
        <section aria-labelledby="concern-heading">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h2 id="concern-heading" className="text-lg font-semibold text-brand-dark">{title}</h2>
                    {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
                </div>
                {active && onChange && (
                    <button type="button" onClick={() => onChange('')} className="text-sm font-semibold text-brand-light transition hover:text-brand">
                        Clear
                    </button>
                )}
            </div>
            {tiles}
        </section>
    )
}

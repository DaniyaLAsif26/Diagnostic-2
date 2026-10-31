import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import { concerns } from '../../constants/concerns'

// layout="wrap": big tiles for the home page. Default: one row of small tiles for the listing pages.
const sizes = {
    wrap: { row: 'flex flex-wrap justify-center gap-x-3 gap-y-6 lg:justify-between', tile: 'w-24 gap-2.5', outer: 'size-20', inner: 'size-14', icon: 'size-7', label: 'text-sm', count: 'text-xs' },
    scroll: { row: '-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 pt-1 scrollbar-none sm:mx-0 sm:px-0 lg:justify-between', tile: 'w-20 gap-1.5', outer: 'size-14', inner: 'size-10', icon: 'size-5', label: 'text-xs', count: 'text-[11px]' },
}

export default function Filters({ active = '', onChange, items, noun, layout = 'scroll' }) {
    const s = sizes[layout]

    return (
        <div className={s.row}>
            {concerns.map(({ tag, label, icon, tone }) => {
                const selected = active === tag
                const count = items?.filter((i) => i.relevance.includes(tag)).length

                const body = (
                    <>
                        <span className={`relative grid ${s.outer} place-items-center rounded-full bg-white transition ${selected ? 'shadow-lg shadow-brand/10 ring-2 ring-brand-light' : 'ring-1 ring-slate-200 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-brand/5 group-hover:ring-brand-light/30'}`}>
                            <span className={`grid ${s.inner} place-items-center rounded-full transition group-hover:scale-105 ${tone}`}>
                                <Icon name={icon} className={s.icon} />
                            </span>
                            {selected && (
                                <span className="absolute -right-0.5 -top-0.5 grid size-4.5 place-items-center rounded-full bg-brand-light text-white ring-2 ring-white">
                                    <Icon name="check" className="size-2.5" />
                                </span>
                            )}
                        </span>
                        <span>
                            <span className={`block ${s.label} font-semibold leading-tight text-slate-800`}>{label}</span>
                            {items && noun && (
                                <span className={`${s.count} text-slate-400`}>{count} {noun}{count === 1 ? '' : 's'}</span>
                            )}
                        </span>
                    </>
                )

                const tile = `group flex shrink-0 flex-col items-center text-center ${s.tile}`

                return onChange ? (
                    <button key={tag} type="button" aria-pressed={selected} onClick={() => onChange(selected ? '' : tag)} className={tile}>
                        {body}
                    </button>
                ) : (
                    <Link key={tag} to={`/search?concern=${tag}`} className={tile}>
                        {body}
                    </Link>
                )
            })}
        </div>
    )
}

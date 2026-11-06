import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import { concerns } from '../../constants/concerns'

// Same tile size on every page, growing with the screen
const tileSizes = {
    tile: 'w-20 gap-1.5 lg:w-24 xl:w-28 2xl:w-32 2xl:gap-2',
    outer: 'size-14 lg:size-16 xl:size-20 2xl:size-24',
    inner: 'size-10 lg:size-12 xl:size-14 2xl:size-17',
    icon: 'size-5 lg:size-6 xl:size-7 2xl:size-9',
    label: 'text-xs xl:text-sm 2xl:text-base',
    count: 'text-[11px] xl:text-xs 2xl:text-sm',
}

// layout="wrap": tiles wrap onto rows (home page). Default: one scrolling row (listing pages).
const sizes = {
    wrap: { ...tileSizes, row: 'flex flex-wrap justify-center gap-x-1 gap-y-5 sm:gap-x-3 lg:gap-x-5' },
    scroll: { ...tileSizes, row: '-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 pt-1 scrollbar-none sm:mx-0 sm:px-0 lg:justify-between' },
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
                                <span className="absolute -right-0.5 -top-0.5 grid size-4.5 place-items-center rounded-full bg-brand-light text-white ring-2 ring-white xl:size-5 2xl:size-6">
                                    <Icon name="check" className="size-2.5 xl:size-3 2xl:size-3.5" />
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

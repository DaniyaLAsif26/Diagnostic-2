import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'
import { concerns } from '../../constants/concerns'

export default function Filters({ active = '', onChange, items, noun, layout = 'scroll' }) {
    const row = layout === 'wrap'
        ? 'flex flex-wrap justify-center gap-x-3 gap-y-6 lg:justify-between'
        : '-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 pt-1 scrollbar-none sm:mx-0 sm:px-0 lg:justify-between'

    return (
        <div className={row}>
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
                    <Link key={tag} to={`/search?concern=${tag}`} className={tile}>
                        {body}
                    </Link>
                )
            })}
        </div>
    )
}

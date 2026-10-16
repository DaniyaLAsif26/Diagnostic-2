import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'

/** Home › Tests › <current test> */
export default function Breadcrumb({ name }) {
    return (
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm text-slate-500">
            <Link to="/" className="shrink-0 transition hover:text-brand">Home</Link>
            <Icon name="chevron" className="size-3.5 shrink-0 -rotate-90" />
            <Link to="/tests" className="shrink-0 transition hover:text-brand">Tests</Link>
            <Icon name="chevron" className="size-3.5 shrink-0 -rotate-90" />
            <span className="truncate font-medium text-brand-dark">{name}</span>
        </nav>
    )
}

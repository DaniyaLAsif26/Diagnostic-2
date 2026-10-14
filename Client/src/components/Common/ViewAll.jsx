import { Link } from 'react-router-dom'

import Icon from '../Icon/Icon'

/** "View all …" link with an arrow, shown beside a section heading. */
export default function ViewAll({ to, children }) {
    return (
        <Link to={to} className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-light transition hover:text-brand">
            {children}
            <Icon name="arrow" className="size-4 transition group-hover:translate-x-0.5" />
        </Link>
    )
}

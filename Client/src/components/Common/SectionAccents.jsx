import Icon from '../Icon/Icon'

// Faint brand-blue wash for full-width bands - alternate with white sections
export const tint = 'border-y border-brand-light/10 bg-brand-light/[0.04]'

// Small pill above a section title - the icon tells sections apart at a glance
export function Eyebrow({ icon, children, dark = false }) {
    return (
        <p className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${dark ? 'bg-white/10 text-sky-300' : 'bg-brand-light/10 text-brand-light'}`}>
            {icon && <Icon name={icon} className="size-3.5" />}
            {children}
        </p>
    )
}

// Short heartbeat line under a section title, echoing the hero ECG
export function EcgAccent({ center = false, dark = false }) {
    return (
        <svg aria-hidden="true" viewBox="0 0 64 12" className={`mt-3 h-3 w-16 ${dark ? 'text-sky-300/60' : 'text-brand-light/50'} ${center ? 'mx-auto' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 6h20l4-5 5 10 4-7 3 2h26" />
        </svg>
    )
}

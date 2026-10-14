import { Eyebrow, EcgAccent } from './SectionAccents'

/** Eyebrow pill, title, heartbeat accent and optional intro - the heading used by every home section. */
export default function SectionHeading({ eyebrow, icon, title, text, action, center = false }) {
    return (
        <div className={`flex flex-col gap-4 ${center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}>
            <div className="max-w-2xl">
                <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">{title}</h2>
                <EcgAccent center={center} />
                {text && <p className="mt-3 text-slate-600">{text}</p>}
            </div>
            {action}
        </div>
    )
}

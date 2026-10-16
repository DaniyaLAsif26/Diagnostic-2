import { useId } from 'react'

/** Soft colour washes + faded dot grid behind the light page headers. Place inside a `relative isolate` panel. */
export default function HeaderBackdrop() {
    // Unique id so the dot pattern never clashes with another SVG on the page
    const patternId = useId()

    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-40 -top-40 size-120 rounded-full bg-sky-200/50 blur-3xl" />
            <div className="absolute -right-32 -top-20 size-105 rounded-full bg-indigo-200/40 blur-3xl" />
            <svg className="absolute inset-0 size-full text-brand mask-[radial-gradient(ellipse_80%_80%_at_50%_30%,black_30%,transparent_80%)]">
                <defs>
                    <pattern id={patternId} width="26" height="26" patternUnits="userSpaceOnUse">
                        <circle cx="1.6" cy="1.6" r="1.6" fill="currentColor" opacity="0.08" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>
        </div>
    )
}

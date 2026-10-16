import Icon from '../Icon/Icon'

/** "Before your test" - the preparation in an amber note, or a green "nothing listed" note. */
export default function PreparationNote({ preparation, title }) {
    const prep = preparation?.trim()

    const tone = prep
        ? { box: 'bg-amber-50 ring-amber-600/10', icon: 'text-amber-600', label: 'text-amber-700/80', text: 'text-amber-900', hint: 'text-amber-800/80' }
        : { box: 'bg-emerald-50 ring-emerald-600/10', icon: 'text-emerald-600', label: 'text-emerald-700/80', text: 'text-emerald-900', hint: 'text-emerald-800/80' }

    return (
        <div className={`mt-6 flex max-w-3xl gap-4 rounded-2xl p-4 ring-1 sm:p-5 ${tone.box}`}>
            <span className={`grid size-10 shrink-0 place-items-center rounded-xl bg-white shadow-sm ${tone.icon}`}>
                <Icon name={prep ? 'clock' : 'check'} className="size-5" />
            </span>
            <div>
                <p className={`text-xs font-semibold uppercase tracking-wider ${tone.label}`}>{title}</p>
                <p className={`mt-1 font-semibold ${tone.text}`}>{prep || 'No special preparation listed'}</p>
                <p className={`mt-1 text-sm ${tone.hint}`}>
                    {prep ? 'Our team will confirm the instructions when you book.' : 'We’ll let you know if anything is needed when we confirm your booking.'}
                </p>
            </div>
        </div>
    )
}

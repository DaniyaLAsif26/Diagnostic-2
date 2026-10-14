const DAY = 24 * 60 * 60 * 1000

export const toDate = (iso) => new Date(`${iso}T00:00:00`) // local midnight

// Fixed 3-letter months - browsers vary ("Sep" vs "Sept")
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const startOfToday = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
}

/** Shown from `startsOn` (optional) until the end of `validTill`. */
export function isActive({ startsOn, validTill }) {
    const today = startOfToday()
    return (!startsOn || toDate(startsOn) <= today) && toDate(validTill) >= today
}

/** Days left on an offer, worded for the card; urgent in the last 3 days. */
export function offerDeadline(validTill) {
    const end = toDate(validTill)
    const days = Math.round((end - startOfToday()) / DAY)

    if (days === 0) return { label: 'Ends today', urgent: true }
    if (days === 1) return { label: 'Ends tomorrow', urgent: true }
    if (days <= 3) return { label: `Ends in ${days} days`, urgent: true }
    return { label: `Valid till ${end.getDate()} ${MONTHS[end.getMonth()]}`, urgent: false }
}

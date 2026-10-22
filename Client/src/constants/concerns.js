/**
 * Health concerns used to filter tests and packages.
 * `tag` is what goes in each item's `relevance` array and in ?concern= links.
 */
export const concerns = [
    { tag: 'diabetes', label: 'Diabetes', icon: 'droplet', tone: 'bg-rose-50 text-rose-600' },
    { tag: 'heart', label: 'Heart', icon: 'heart', tone: 'bg-red-50 text-red-600' },
    { tag: 'thyroid', label: 'Thyroid', icon: 'thyroid', tone: 'bg-violet-50 text-violet-600' },
    { tag: 'liver', label: 'Liver', icon: 'liver', tone: 'bg-amber-50  text-amber-600' },
    { tag: 'kidney', label: 'Kidney', icon: 'kidney', tone: 'bg-orange-50 text-orange-600' },
    { tag: 'vitamin', label: 'Vitamins', icon: 'sun', tone: 'bg-yellow-50 text-yellow-600' },
    { tag: 'fever', label: 'Fever & Infection', icon: 'thermometer', tone: 'bg-sky-50 text-sky-600' },
    { tag: 'bone', label: 'Bone & Joints', icon: 'bone', tone: 'bg-stone-100 text-stone-600' },
    { tag: 'women', label: 'Women’s Health', icon: 'female', tone: 'bg-pink-50 text-pink-600' },
    { tag: 'lung', label: 'Lungs & Allergy', icon: 'lungs', tone: 'bg-teal-50 text-teal-600' },
]

export const concernLabel = Object.fromEntries(concerns.map(({ tag, label }) => [tag, label]))

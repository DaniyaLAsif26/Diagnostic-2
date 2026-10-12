import { useState } from 'react'
import { input } from '../../styles/formHelpers'
import { stroke } from '../../styles/iconStroke'
import useTestSearch from '../../../../hooks/useTestSearch'

// search saved tests or type a new name; picked tests are passed to the useFieldArray `append`
export default function TestPicker({ fields, append }) {

    const [search, setSearch] = useState('')
    const term = search.trim()

    const { results, showResults, isSearching } = useTestSearch(search)

    const addTest = (test) => {
        const alreadyAdded = fields.some((f) => f.name.toLowerCase() === test.name.toLowerCase())

        if (!alreadyAdded) append(test)
        setSearch("")
    }

    const handleAdd = () => {
        if (term.length < 2 || isSearching) return

        const exactSearchResult = results.find((t) => t.name.toLowerCase() === term.toLowerCase())

        if (exactSearchResult) {
            addTest({ testId: exactSearchResult.id, name: exactSearchResult.name })
        }
        else {
            addTest({ testId: null, name: term })
        }
    }

    return (
        <div className="flex gap-3">
            <div className="relative flex-1">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()   // stop Enter submitting the form
                            handleAdd()
                        }
                    }}
                    type="text" placeholder="Search or type a test name" className={`${input} pl-10`} />
                <svg viewBox="0 0 24 24" {...stroke} className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                </svg>

                {showResults && (
                    <ul className="absolute inset-x-0 top-full z-10 mt-2 max-h-56 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                        {results.length === 0 ? (
                            <li className="px-4 py-2.5 text-sm text-slate-400">
                                {isSearching ? 'Searching...' : 'No tests found, press Add to create it'}
                            </li>
                        ) : (
                            results.map((t) => (
                                <li key={t.id}>
                                    <button type="button" onClick={() => addTest({ testId: t.id, name: t.name })} className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-brand-light/5">
                                        {t.name}
                                        <span className="text-xs text-slate-400">Rs. {t.price}</span>
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>

            <button
                type="button"
                onClick={handleAdd}
                disabled={term.length < 2 || isSearching}
                className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-50">
                Add
            </button>
        </div>
    )
}

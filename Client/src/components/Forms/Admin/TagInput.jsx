import { use } from "react"
import { useState } from "react"

export default function TagInput({ value = [], onChange, ...props }) {

    const [draft, setDraft] = useState('')

    const addTag = () => {
        const tag = draft.trim()

        if (tag && !value.includes(tag)) {
            onChange([...value, tag])
        }

        setDraft('')
    }

    const removeTag = (index) => {
        onChange(value.filter((_, i) => i !== index))
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addTag()
        }
    }

    return (
        <div className="">
            <textarea
                {...props}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
            >

            </textarea>

            <div className="mt-2 flex flex-wrap gap-2">
                {value.map((tag, index) => (
                    <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-light/10 px-3 py-1 text-sm font-medium text-brand">
                        {tag}
                        <button
                            className="text-brand/60 transition hover:text-red-500"
                            type="button"
                            onClick={() => removeTag(index)}
                            aria-label={`Remove ${tag}`}>
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </div>
    )
}
import { field } from "../../styles/formHelpers"

export default function Description({ register, data = null, disabled = false, placeholder = "" }) {
    return (
        // empty textarea is saved as null so clearing it doesn't count as a change
        <textarea {...register("description", { setValueAs: (v) => v || null })} rows={3} placeholder={placeholder} defaultValue={data?.description ?? ""} disabled={disabled} className={`${field} placeholder:text-slate-400`} />
    )
}

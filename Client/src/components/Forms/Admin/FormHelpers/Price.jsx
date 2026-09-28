import { field } from "../../styles/formHelpers"

export default function Price({ register, disabled = false, data = null }) {

    return (
        <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">Rs.</span>
            <input {...register("price", { valueAsNumber: true })} type="number" placeholder="0" defaultValue={data?.price} disabled={disabled} className={`${field} pl-12`} />
        </div>
    )
}
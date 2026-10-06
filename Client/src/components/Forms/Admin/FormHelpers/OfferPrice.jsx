import { field } from "../../styles/formHelpers"

export default function OfferPrice({ register, data = null, disabled = false }) {
    return (
        <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">Rs.</span>
            <input {...register("offerPrice", { valueAsNumber: true })} type="number" defaultValue={data?.offerPrice} disabled={disabled} className={`${field} pl-12`} />
        </div>
    )
}
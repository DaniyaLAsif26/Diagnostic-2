import { stroke } from "../../styles/iconStroke"

export default function IsPopular({ register ,data=null,disabled=false }) {
    return (
        <>
            <span className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-amber-50 text-amber-500">
                    <svg viewBox="0 0 24 24" {...stroke} className="size-5"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z" /></svg>
                </span>
                <span>
                    <span className="block text-sm font-semibold text-slate-900">Marked as popular</span>
                    <span className="block text-xs text-slate-500">Highlights this test for patients</span>
                </span>
            </span>
            <input {...register("isPopular")} type="checkbox" defaultChecked={data?.isPopular} disabled={disabled} className="peer sr-only" />
            <span className="relative h-6 w-11 shrink-0 rounded-full bg-slate-200 transition after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:bg-brand-light peer-checked:after:translate-x-5 peer-disabled:opacity-70" />
        </>
    )
}
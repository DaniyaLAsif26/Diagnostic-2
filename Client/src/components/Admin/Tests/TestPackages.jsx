import { stroke } from "../../Forms/styles/iconStroke"

const offerPercent = ({ price, offerPrice }) => {
    if (!offerPrice || !price || offerPrice >= price) return 0
    return Math.round(((price - offerPrice) / price) * 100)
}

export default function TestPackages({ packages = [] }) {
    return (
        <section className="mx-6 mb-8 rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5 lg:mx-8">
            <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
                <span className="grid size-9 place-items-center rounded-lg bg-brand-light/10 text-brand">
                    <svg viewBox="0 0 24 24" {...stroke} className="size-4.5">
                        <path d="m21 8-9-5-9 5 9 5zM3 8v8l9 5 9-5V8M12 13v8" />
                    </svg>
                </span>
                <div>
                    <h2 className="font-semibold text-brand-dark">Included in packages</h2>
                    <p className="text-xs text-slate-500">Packages that contain this test.</p>
                </div>
            </div>

            {packages.length === 0 ? (
                <p className="p-6 text-sm text-slate-500">This test is not part of any package yet.</p>
            ) : (
                <ul className="divide-y divide-slate-100">
                    {packages.map((pkg) => {
                        const percent = offerPercent(pkg)
                        const description = pkg.description?.trim()

                        return (
                            <li key={pkg.name} className="flex items-start justify-between gap-4 px-6 py-4">
                                <div className="min-w-0">
                                    <p className="font-semibold text-slate-900">{pkg.name}</p>
                                    {description && <p className="mt-0.5 text-sm text-slate-500 wrap-break-word">{description}</p>}
                                </div>
                                {percent > 0 && (
                                    <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                                        {percent}% OFF
                                    </span>
                                )}
                            </li>
                        )
                    })}
                </ul>
            )}
        </section>
    )
}

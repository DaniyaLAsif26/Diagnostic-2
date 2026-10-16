import { wrap } from '../../constants/layout'

/** Placeholder shaped like the test page while it loads: details on the left, price card on the right. */
export default function DetailsSkeleton() {
    return (
        <div aria-busy="true" aria-label="Loading test" className="animate-pulse">
            <section className="px-2 pt-2 sm:px-4 sm:pt-4">
                <div className="rounded-[1.75rem] bg-slate-50 ring-1 ring-slate-900/5 sm:rounded-[2.5rem]">
                    <div className={`${wrap} grid gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12 lg:py-14 xl:grid-cols-[minmax(0,1fr)_24rem]`}>
                        <div>
                            <div className="h-4 w-48 rounded bg-slate-200" />
                            <div className="mt-6 h-6 w-28 rounded-full bg-slate-200" />
                            <div className="mt-4 h-10 w-2/3 max-w-xl rounded-lg bg-slate-200" />
                            <div className="mt-4 h-4 w-full max-w-lg rounded bg-slate-200" />
                            <div className="mt-8 grid max-w-3xl grid-cols-2 gap-2 sm:gap-3">
                                {[0, 1].map((i) => <div key={i} className="h-16 rounded-2xl bg-white" />)}
                            </div>
                            <div className="mt-6 h-24 max-w-3xl rounded-2xl bg-white" />
                        </div>
                        <div className="h-96 rounded-3xl bg-white" />
                    </div>
                </div>
            </section>
        </div>
    )
}

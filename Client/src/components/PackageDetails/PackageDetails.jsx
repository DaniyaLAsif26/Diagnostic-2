import { useParams } from 'react-router-dom'
import { usePackage, usePopularPackage } from '../../hooks/usePackage'

import PackageHeader from './PackageHeader'
import IncludedTests from './IncludedTests'
import PackageNotFound from './PackageNotFound'
import OtherPopularPackages from './OtherPopularPackages'
import HeaderBackdrop from '../Header/HeaderBackdrop'
import PriceCard from '../TestDetails/PriceCard'
import MobileBookBar from '../TestDetails/MobileBookBar'
import DetailsSkeleton from '../TestDetails/DetailsSkeleton'
import Steps from '../Home/Steps'
import HelpBanner from '../Listing/HelpBanner'
import { wrap } from '../../constants/layout'

export default function PackageDetails() {
    const { id } = useParams()
    const { data: pkg, isPending, isError } = usePackage(id)
    const { data: popular = [] } = usePopularPackage(4)
    // Popular packages other than the one being viewed - fetch 4 so 3 remain
    const otherPopular = popular.filter((p) => String(p.id) !== id).slice(0, 3)

    if (isPending) return <DetailsSkeleton />
    if (isError || !pkg) return <PackageNotFound />

    return (
        <>
            <section className="px-2 pb-8 pt-2 sm:px-4 sm:pt-4">
                {/* overflow-clip (not hidden) so the price card can stay sticky */}
                <div className="relative isolate overflow-clip rounded-[1.75rem] bg-slate-50 ring-1 ring-slate-900/5 sm:rounded-[2.5rem]">
                    <HeaderBackdrop />

                    <div className={`${wrap} grid gap-6 py-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-10`}>
                        <div className="min-w-0">
                            <PackageHeader pkg={pkg} />
                            <IncludedTests tests={pkg.tests} />
                        </div>

                        <aside className="lg:sticky lg:top-24">
                            <PriceCard test={pkg} priceLabel="Package price" perks={[]} payNote="No hidden charges · Pay online or at collection" />
                        </aside>
                    </div>
                </div>
            </section>

            <OtherPopularPackages packages={otherPopular} />

            <Steps title="Your checkup in 4 simple steps" />

            {/* Extra bottom padding on phones clears the fixed book bar */}
            <div className={`${wrap} pb-28 lg:pb-20`}>
                <HelpBanner
                    title="Have a question about this package?"
                    text="Call us and our team will explain what it covers and how to prepare, or message us on WhatsApp."
                />
            </div>

            <MobileBookBar test={pkg} />
        </>
    )
}

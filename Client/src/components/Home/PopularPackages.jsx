import PackageCard from '../AllPackages/PackageCard'
import SectionHeading from '../Common/SectionHeading'
import ViewAll from '../Common/ViewAll'
import { tint } from '../Common/SectionAccents'
import { usePopularPackage } from '../../hooks/usePackage'
import { wrap } from '../../constants/layout'

export default function PopularPackages() {
    const { data: popular = [], isPending } = usePopularPackage(4)

    // Nothing popular yet - skip the section rather than show an empty one
    if (!isPending && !popular.length) return null

    return (
        <section className={`${tint} py-16 sm:py-20`}>
            <div className={wrap}>
                <SectionHeading
                    eyebrow="Health checkups"
                    icon="package"
                    title="Popular health packages"
                    text="Comprehensive checkups at a fraction of the price of individual tests."
                    action={<ViewAll to="/packages">View all packages</ViewAll>}
                />
                {/* Scrolls sideways on phones, grid from sm up */}
                <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4">
                    {isPending && [0, 1, 2, 3].map((i) => (
                        <div key={i} className="h-96 w-[82%] shrink-0 animate-pulse rounded-3xl bg-white sm:w-auto" />
                    ))}
                    {popular.map((pkg) => (
                        <div key={pkg.id} className="w-[82%] shrink-0 snap-start sm:w-auto">
                            <PackageCard pkg={pkg} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

import PackageCard from '../AllPackages/PackageCard'
import SectionHeading from '../Common/SectionHeading'
import ViewAll from '../Common/ViewAll'
import { tint } from '../Common/SectionAccents'
import { packages } from '../../constants/packages'
import { wrap } from '../../constants/layout'

// Packages marked isPopular in the shared data
const popular = packages.filter((p) => p.isPopular)

export default function PopularPackages() {
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

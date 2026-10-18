import PackageCard from '../AllPackages/PackageCard'
import SectionHeading from '../Common/SectionHeading'
import ViewAll from '../Common/ViewAll'
import { wrap } from '../../constants/layout'

/** Popular packages other than the one being viewed. Renders nothing when the list is empty. */
export default function OtherPopularPackages({ packages }) {
    if (!packages.length) return null

    return (
        <section className={`${wrap} py-12 sm:py-16`}>
            <SectionHeading
                eyebrow="Popular"
                icon="star"
                title="Other popular packages"
                text="Health checkups our patients book most often."
                action={<ViewAll to="/packages">View all packages</ViewAll>}
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
            </div>
        </section>
    )
}

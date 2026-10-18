import PackageCard from '../AllPackages/PackageCard'
import SectionHeading from '../Common/SectionHeading'
import { tint } from '../Common/SectionAccents'
import { wrap } from '../../constants/layout'

/** Packages that include the viewed test, shown with the site's usual package card. Renders nothing when there are none. */
export default function IncludedInPackages({ packages }) {
    if (!packages.length) return null

    const count = packages.length

    return (
        <section className={tint}>
            <div className={`${wrap} py-16 sm:py-20`}>
                <SectionHeading
                    eyebrow="Packages"
                    icon="package"
                    title="Included in these packages"
                    text={`Get this test as part of ${count === 1 ? 'a larger health package' : `${count} larger health packages`}.`}
                />

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
                </div>
            </div>
        </section>
    )
}

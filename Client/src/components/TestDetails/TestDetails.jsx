import { useParams } from "react-router-dom"
import { useTest, usePopularTests } from '../../hooks/useTest.js'

import DetailsHeader from './DetailsHeader'
import PriceCard from './PriceCard'
import OtherPopularTests from './OtherPopularTests'
import MobileBookBar from './MobileBookBar'
import DetailsSkeleton from './DetailsSkeleton'
import TestNotFound from './TestNotFound'
import Steps from '../Home/Steps'
import HelpBanner from '../Listing/HelpBanner'
import { copyFor } from './detailsContent'
import { wrap } from '../../constants/layout'

export default function TestDetails() {

    const { id } = useParams()

    const { data: test, isPending, isError } = useTest(id)
    const { data: popularTests = [] } = usePopularTests(4)
    // Popular tests other than the one being viewed - fetch 4 so 3 remain
    const otherPopular = popularTests.filter((t) => String(t.id) !== id).slice(0, 3)

    if (isPending) return <DetailsSkeleton />
    if (isError || !test) return <TestNotFound />

    const copy = copyFor(test)

    return (
        <>
            {/* Price card sits beside the details on desktop, below them on phones */}
            <DetailsHeader test={test} prepTitle={copy.prepTitle}>
                <PriceCard test={test} priceLabel={copy.priceLabel} perks={copy.perks} payNote={copy.payNote} />
            </DetailsHeader>

            <OtherPopularTests tests={otherPopular} />

            <Steps steps={copy.steps} title={copy.stepsTitle} />

            {/* Extra bottom padding on phones clears the fixed book bar */}
            <div className={`${wrap} pb-28 lg:pb-20`}>
                <HelpBanner
                    title="Have a question about this test?"
                    text="Call us and our team will explain what it checks and how to prepare, or send your prescription on WhatsApp."
                />
            </div>

            <MobileBookBar test={test} />
        </>
    )
}

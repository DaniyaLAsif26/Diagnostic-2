import TestCard from '../AllTest/TestCard'
import SectionHeading from '../Common/SectionHeading'
import ViewAll from '../Common/ViewAll'
import { tint } from '../Common/SectionAccents'
import { wrap } from '../../constants/layout'

import { usePopularTests } from '../../hooks/useTest.js'

export default function PopularTests() {

    const { data: popular = [], isPending, isError } = usePopularTests()

    // Nothing worth showing: request failed, or no test is marked popular yet
    if (isError || (!isPending && !popular.length)) return null

    return (
        <section className={`${tint} py-16 sm:py-20`}>
            <div className={wrap}>
                <SectionHeading
                    eyebrow="Lab tests"
                    icon="tube"
                    title="Most booked tests"
                    text="Individual tests with transparent pricing and quick turnaround."
                    action={<ViewAll to="/tests">View all tests</ViewAll>}
                />
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {popular.map((test) => <TestCard key={test.id} test={test} />)}
                </div>
            </div>
        </section>
    )
}

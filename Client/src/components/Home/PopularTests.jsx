import TestCard from '../AllTest/TestCard'
import SectionHeading from '../Common/SectionHeading'
import ViewAll from '../Common/ViewAll'
import { tint } from '../Common/SectionAccents'
import { tests } from '../../constants/tests'
import { wrap } from '../../constants/layout'

// Tests marked isPopular in the shared data
const popular = tests.filter((t) => t.isPopular)

export default function PopularTests() {
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

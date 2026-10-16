import TestCard from '../AllTest/TestCard'
import SectionHeading from '../Common/SectionHeading'
import ViewAll from '../Common/ViewAll'
import { wrap } from '../../constants/layout'

/** Popular tests other than the one being viewed. Renders nothing when the list is empty. */
export default function OtherPopularTests({ tests }) {
    if (!tests.length) return null

    return (
        <section className={`${wrap} py-16 sm:py-20`}>
            <SectionHeading
                eyebrow="Popular"
                icon="star"
                title="Other popular tests"
                text="Tests our patients book most often."
                action={<ViewAll to="/tests">View all tests</ViewAll>}
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tests.map((t) => <TestCard key={t.id} test={t} />)}
            </div>
        </section>
    )
}

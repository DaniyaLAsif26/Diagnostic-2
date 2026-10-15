import TestCard from '../AllTest/TestCard'
import SectionHeading from '../Common/SectionHeading'
import ViewAll from '../Common/ViewAll'
import { useQuery } from '@tanstack/react-query'
import { tint } from '../Common/SectionAccents'
import { tests } from '../../constants/tests'
import { wrap } from '../../constants/layout'

import api from '../../api/api.js'

// const popular = tests.filter((t) => t.isPopular)

export default function PopularTests() {

    const limit = 3

    const popularTests = () => api.get("tests/popular" ,{params : {limit}})
        .then((res) => res.data.data.popularTests)

    const { data: popular = [], isPending, error, isError } = useQuery({
        queryKey: ['popularTests'],
        queryFn: popularTests
    })


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

import HeroSection from './HeroSection'
import QuickActions from './QuickActions'
import Filters from './Filters'
import Steps from './Steps'
import PopularTests from './PopularTests'
import PopularPackages from './PopularPackages'
import Services from './Services'
import WhyUs from './WhyUs'
import Testimonials from './Testimonials'
import Faq from './Faq'
import Book from './Book'
import SectionHeading from '../Common/SectionHeading'
import Offers from './Offer/Offers'
import { wrap } from '../../constants/layout'

function Concerns() {
    return (
        <section className="py-16 sm:py-20">
            <div className={wrap}>
                <SectionHeading
                    center
                    eyebrow="Find the right test"
                    icon="search"
                    title="Tests by health concern"
                    text="Not sure what to book? Start with what you want to check."
                />
                <div className="mt-10">
                    <Filters layout="wrap" />
                </div>
            </div>
        </section>
    )
}

export default function Home() {
    return (
        <>
            <HeroSection />
            <QuickActions />
            <Offers />
            <PopularPackages />
            <Concerns />
            <PopularTests />
            <Services />
            <Steps />
            <WhyUs />
            <Testimonials />
            <Faq />
            <Book />
        </>
    )
}

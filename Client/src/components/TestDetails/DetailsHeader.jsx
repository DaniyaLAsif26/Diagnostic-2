import Icon from '../Icon/Icon'
import HeaderBackdrop from '../Header/HeaderBackdrop'
import Breadcrumb from './Breadcrumb'
import QuickFacts from './QuickFacts'
import PreparationNote from './PreparationNote'
import { EcgAccent } from '../Common/SectionAccents'
import { wrap } from '../../constants/layout'
import { onOffer, discountPercent } from '../../utils/price'

/**
 * Top of a test page: breadcrumb, badges, name, description, quick facts and the preparation note.
 * `children` goes in the right-hand column on desktop (the price card) and below the details on phones.
 */
export default function DetailsHeader({ test, prepTitle, children }) {
    const isScan = test.category === 'RADIOLOGY'

    const facts = [
        { icon: 'report', label: 'Reports', value: 'Within 24 hrs' },
        isScan
            ? { icon: 'pin', label: 'Where', value: 'At our centre' }
            : { icon: 'home', label: 'Sample collection', value: 'Free at home' },
    ]

    return (
        <section className="px-2 pt-2 sm:px-4 sm:pt-4">
            <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-slate-50 ring-1 ring-slate-900/5 sm:rounded-[2.5rem]">
                <HeaderBackdrop />

                <div className={`${wrap} grid gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-12 lg:py-14 xl:grid-cols-[minmax(0,1fr)_24rem]`}>
                    <div className="min-w-0">
                        <Breadcrumb name={test.name} />

                        <div className="mt-6 flex flex-wrap items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${isScan ? 'bg-teal-50 text-teal-700 ring-teal-600/10' : 'bg-sky-50 text-sky-700 ring-sky-600/10'}`}>
                                <Icon name={isScan ? 'scan' : 'tube'} className="size-3.5" />
                                {isScan ? 'Radiology' : 'Laboratory'}
                            </span>
                            {test.isPopular && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-600/10">
                                    <Icon name="star" className="size-3.5 fill-current" />Most booked
                                </span>
                            )}
                            {onOffer(test) && (
                                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/10">
                                    {discountPercent(test)}% off
                                </span>
                            )}
                        </div>

                        <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl lg:text-5xl lg:leading-[1.1]">
                            {test.name}
                        </h1>
                        <EcgAccent />
                        {test.description && (
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{test.description}</p>
                        )}

                        <QuickFacts facts={facts} />
                        <PreparationNote preparation={test.preparation} title={prepTitle} />
                    </div>

                    {children}
                </div>
            </div>
        </section>
    )
}

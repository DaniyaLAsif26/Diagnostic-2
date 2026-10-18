import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import PackageCard from './PackageCard'
import TestPackageHeader from '../Header/TestPackageHeader'
import Filters from '../Home/Filters'
import ResultsToolbar from '../Listing/ResultsToolbar'
import NoResults from '../Listing/NoResults'
import HelpBanner from '../Listing/HelpBanner'
import { useAllPackages } from '../../hooks/usePackage'
import { concernLabel } from '../../constants/concerns'
import { wrap } from '../../constants/layout'
import { finalPrice } from '../../utils/price'

const sorts = {
    popular: { label: 'Most popular', compare: (a, b) => Number(b.isPopular) - Number(a.isPopular) || a.name.localeCompare(b.name) },
    'price-asc': { label: 'Price: low to high', compare: (a, b) => finalPrice(a) - finalPrice(b) },
    'price-desc': { label: 'Price: high to low', compare: (a, b) => finalPrice(b) - finalPrice(a) },
    'tests-desc': { label: 'Most tests included', compare: (a, b) => b.tests.length - a.tests.length },
}

export default function AllPackages() {
    const { data: packages = [], isPending, isError } = useAllPackages()

    // Filters live in the URL (?q=&concern=&sort=) so links can open a filtered view
    const [params, setParams] = useSearchParams()
    const concern = concernLabel[params.get('concern')] ? params.get('concern') : ''
    const sort = sorts[params.get('sort')] ? params.get('sort') : 'popular'

    // The input keeps its own state so typing stays smooth; the URL mirrors it
    const [search, setSearch] = useState(params.get('q') ?? '')

    // Sets one filter in the URL without adding history entries or jumping to the top
    const setParam = (key, value) => setParams((prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
    }, { replace: true, preventScrollReset: true })

    const updateSearch = (value) => {
        setSearch(value)
        setParam('q', value.trim())
    }

    const clearFilters = () => {
        setSearch('')
        setParams({}, { replace: true, preventScrollReset: true })
    }

    // Search matches the package name, its concerns, or any test inside it
    const term = search.trim().toLowerCase()
    const visible = useMemo(() => packages
        .filter((p) => !concern || p.relevance.includes(concern))
        .filter((p) => !term
            || p.name.toLowerCase().includes(term)
            || p.relevance.some((tag) => (concernLabel[tag] ?? tag).toLowerCase().includes(term))
            || p.tests.some((t) => t.name.toLowerCase().includes(term)))
        .sort(sorts[sort].compare),
    [packages, concern, term, sort])

    const hasFilters = Boolean(term || concern)

    return (
        <>
            <TestPackageHeader
                crumb="Health packages"
                title="Health checkup packages"
                text="Preventive checkups that bundle the right tests together, at a lower price than booking them one by one."
                search={search}
                onSearch={updateSearch}
                searchLabel="Search packages"
                placeholder="Search packages or tests, e.g. Full Body"
            >
                <Filters
                    title="Filter by health concern"
                    subtitle="Find a package for what you want to check."
                    active={concern}
                    onChange={(tag) => setParam('concern', tag)}
                    items={packages}
                    noun="package"
                />
            </TestPackageHeader>

            <div className={`${wrap} pb-16 pt-4 sm:pb-20`}>
                <ResultsToolbar
                    shown={visible.length}
                    total={packages.length}
                    noun="package"
                    hasFilters={hasFilters}
                    onClear={clearFilters}
                    sorts={sorts}
                    sort={sort}
                    onSort={(value) => setParam('sort', value === 'popular' ? '' : value)}
                />

                {isPending ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[0, 1, 2].map((i) => <div key={i} className="h-96 animate-pulse rounded-3xl bg-slate-100" />)}
                    </div>
                ) : isError ? (
                    <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">Couldn’t load packages. Please refresh the page.</p>
                ) : visible.length ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {visible.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
                    </div>
                ) : (
                    <NoResults noun="package" onClear={clearFilters} />
                )}

                <HelpBanner
                    title="Need a custom package?"
                    text="Tell us what you need checked and our team will put the right tests together."
                />
            </div>
        </>
    )
}

import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import PackageResults from './PackageResults'
import TestPackageHeader from '../Header/TestPackageHeader'
import Filters from '../Home/Filters'
import HelpBanner from '../Listing/HelpBanner'
import { useAllPackages } from '../../hooks/usePackage'
import { concernLabel } from '../../constants/concerns'
import { wrap } from '../../constants/layout'
import { packageSorts as sorts } from '../../utils/sorts'

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
                <PackageResults
                    packages={visible}
                    total={packages.length}
                    isPending={isPending}
                    isError={isError}
                    hasFilters={hasFilters}
                    onClear={clearFilters}
                    sort={sort}
                    onSort={(value) => setParam('sort', value === 'popular' ? '' : value)}
                />

                <HelpBanner
                    title="Need a custom package?"
                    text="Tell us what you need checked and our team will put the right tests together."
                />
            </div>
        </>
    )
}

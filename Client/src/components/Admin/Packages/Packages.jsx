import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { createColumnHelper, tableFeatures } from "@tanstack/react-table"
import PageHeader from "../PageHeader/PageHeader"

import DataTable from '../Table/DataTable.jsx'

import api from "../../../api/api"

const features = tableFeatures({})
const columnHelper = createColumnHelper()

const columns = columnHelper.columns([
    columnHelper.accessor('name', { header: 'Test Name' }),
    columnHelper.accessor('price', { header: 'Price' }),
    columnHelper.accessor('offerPrice', { header: 'Offer-price' }),
    columnHelper.accessor('category', { header: 'Category' }),
    columnHelper.accessor('relevance', { header: 'Relevance' }),
    columnHelper.accessor('isPopular', { header: 'Popular' }),
    columnHelper.accessor(
        row => row.preparation?.trim() || "-",
        { id: 'preparation', header:  'Preparation'  }
    ),
    columnHelper.accessor(
        row => row._count.items,
        { id: 'items', header: 'Tests' }
    )
])

export default function Packages() {

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')

    const allPackages = async () => {
        const res = await api.get('/packages/all')
        return res.data.data.allPackages
    }

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['packages'],
        queryFn: allPackages
    })

    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="p-6 lg:p-8">
            <PageHeader
                title={'Packages'}
                subtitle={'Manage all diagnostic packages offered at the centre.'}
                search={search}
                setSearch={setSearch}
                placeholder={'Search Packages'}
                category={category}
                setCategory={setCategory}
                addLink={'/admin/package/add'}
                addBtn={'Add Package'}
            />

            <DataTable
                data={data}
                columns={columns}
                features={features}
                route={'/packages'}
            />

        </div>
    )
}
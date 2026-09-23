import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { createColumnHelper, tableFeatures, useTable } from "@tanstack/react-table"
import PageHeader from "../PageHeader/PageHeader"

import api from "../../../api/api"

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
                addLink={'/admin/packages/add'}
                addBtn={'Add Package'}
            />

        </div>
    )
}
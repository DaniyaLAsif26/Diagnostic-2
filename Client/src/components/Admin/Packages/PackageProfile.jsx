import EditPackage from "./EditPackage"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import api from "../../../api/api"

export default function PacakgeProfile() {

    const { id } = useParams()

    const getPackage = async () => {
        const res = await api.get(`/packages/${id}`)

        const pkg = res.data.data.getPackage

        return {
            ...pkg,
            tests: pkg.items.map((item) => ({
                testId: item.testId,
                name: item.test?.name ?? item.testName,
            })),
        }
    }

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["packages", id],
        queryFn: getPackage
    })

    if (isPending) return <p>Loading...</p>
    if (isError) return <p>Error: {error?.message}</p>

    return (
        <>
            <EditPackage
                data={data}
                PackageId={id}
            />
        </>
    )
}
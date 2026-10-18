import EditPackage from "./EditPackage"
import { useParams } from "react-router-dom"

import { usePackage } from "../../../hooks/usePackage"

export default function PacakgeProfile() {

    const { id } = useParams()

    const { data, isPending, isError, error } = usePackage(id)

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

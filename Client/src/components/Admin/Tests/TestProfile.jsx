import { useParams } from "react-router-dom"
import { useTest } from "../../../hooks/useTest"

import EditTest from "./EditTest"

export default function TestProfile() {

    const { id } = useParams()

    const {data,isPending,isError,error}=useTest(id)

    if(isPending) return <p>Loading...</p>
    if(isError) return <p>Error: {error?.message}</p>

    return (
       <EditTest
       testId={id}
       data={data}
       />
    )
}

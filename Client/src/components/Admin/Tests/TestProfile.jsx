import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import api from "../../../api/api"

import EditTest from "./EditTest"

export default function TestProfile() {

    const { id } = useParams()


    const getTest = async()=>{
        const res = await api.get(`/tests/${id}`)

        return res.data.data.test
    }

    const {data,isPending,isError,error}=useQuery({
        queryKey : ['tests', id],
        queryFn : getTest
    })

    if(isPending) return <p>Loading...</p>
    if(isError) return <p>Error: {error?.message}</p>

    return (
       <EditTest
       testId={id}
       data={data}
       />
    )
}

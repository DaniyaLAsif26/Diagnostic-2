import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar'

export default function (){
    return (
        <div className="flex">
            <AdminSidebar/>
            <main className="flex-1 overflow-y-auto">
                <Outlet/>
            </main>
        </div>
    )
}
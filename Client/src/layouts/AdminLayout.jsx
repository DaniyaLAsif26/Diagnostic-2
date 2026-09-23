import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar'
import AdminNavbar from '../components/Admin/Navbar/AdminNavbar'

export default function AdminLayout() {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex h-dvh">
            <AdminSidebar open={open} onToggle={() => setOpen(!open)} />
            <div className="flex min-w-0 flex-1 flex-col">
                <AdminNavbar showLogo={!open} />
                <main className="flex-1 overflow-y-auto bg-slate-50">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

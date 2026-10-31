import { Outlet } from 'react-router-dom'
import UserNavbar from '../components/User/Navbar/UserNavbar'
import UserFooter from '../components/User/Footer/UserFooter'

export default function UserLayout() {
    return (
        <div className="flex min-h-dvh flex-col bg-white text-slate-900">
            <UserNavbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <UserFooter />
        </div>
    )
}

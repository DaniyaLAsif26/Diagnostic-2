import { Outlet, ScrollRestoration } from 'react-router-dom'
import UserNavbar from '../components/User/Navbar/UserNavbar'
import UserFooter from '../components/User/Footer/UserFooter'

export default function UserLayout() {
    return (
        <div className="flex min-h-dvh flex-col bg-white text-slate-900 antialiased">
            <UserNavbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <UserFooter />

            {/* Scrolls to the top on page change, or to the #section in links like /#tests */}
            <ScrollRestoration />
        </div>
    )
}

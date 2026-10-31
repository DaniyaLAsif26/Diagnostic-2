import { Outlet, ScrollRestoration } from 'react-router-dom'

// Wraps every route (public, login and admin) so scroll is managed app-wide
export default function RootLayout() {
    return (
        <>
            <Outlet />

            {/* Scrolls to the top on page change, or to the #section in links like /#tests */}
            <ScrollRestoration />
        </>
    )
}

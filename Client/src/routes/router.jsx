import { createBrowserRouter, createRoutesFromElements, Route, redirect } from 'react-router-dom'

import Adminlayout from '../layouts/AdminLayout.jsx'
import UserLayout from '../layouts/UserLayout.jsx'
import LoginForm from '../components/Forms/LoginForm.jsx'
import Dashboard from '../components/Admin/Dashboard/Dashbaord.jsx'
import Tests from '../components/Admin/Tests/Tests.jsx'
import AddTestForm from '../components/Forms/Admin/AddTestForm.jsx'
import Packages from '../components/Admin/Packages/Packages.jsx'
import TestProfile from '../components/Admin/Tests/TestProfile.jsx'
import PacakgeProfile from '../components/Admin/Packages/PackageProfile.jsx'
import AddPackageForm from '../components/Forms/Admin/AddPackageForm.jsx'
import Home from '../components/Home/Home.jsx'
import AllTests from '../components/AllTest/AllTests.jsx'
import AllPackages from '../components/AllPackages/AllPackages.jsx'

import TestDetails from '../components/TestDetails/TestDetails.jsx'
import PackageDetails from '../components/PackageDetails/PackageDetails.jsx'

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path='/'
                element={<UserLayout />}
            >
                <Route index element={<Home />} />
                <Route path='tests' element={<AllTests />} />
                <Route path='packages' element={<AllPackages />} />
                <Route path='test/:name/:id' element={<TestDetails />} />
                <Route path='package/:name/:id' element={<PackageDetails />} />
            </Route>

            <Route path='/login' element={<LoginForm />} />

            <Route
                path='/admin'
                element={<Adminlayout />}
            >
                <Route index loader={() => redirect('dashboard')} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="tests" element={<Tests />} />
                <Route path="packages" element={<Packages />} />
                <Route path="tests/add" element={<AddTestForm />} />
                <Route path="package/add" element={<AddPackageForm />} />
                <Route path="tests/:id/:name" element={<TestProfile />} />
                <Route path="packages/:id/:name" element={<PacakgeProfile />} />
            </Route>
        </>
    )
)
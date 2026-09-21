import { createBrowserRouter, createRoutesFromElements, Route , redirect  } from 'react-router-dom'

import Adminlayout from '../layouts/AdminLayout.jsx'
import LoginForm from '../components/Forms/LoginForm.jsx'
import Dashboard from '../components/Admin/Dashboard/Dashbaord.jsx'
import Tests from '../components/Admin/Tests/Tests.jsx'
import AddTestForm from '../components/Forms/Admin/AddTestForm.jsx'

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<LoginForm />} />

            <Route
                path='/admin'
                element={<Adminlayout />}
            >
                <Route index loader={() => redirect('dashboard')} />
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="tests" element={<Tests/>}/>
                <Route path="tests/add" element={<AddTestForm/>}/>
            </Route>
        </>
    )
)
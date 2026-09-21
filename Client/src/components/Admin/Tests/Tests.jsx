import { stroke } from '../../Forms/styles/iconStroke'
import { useNavigate } from 'react-router-dom'

// Placeholder rows - replace with data from the API
const tests = [
  { name: 'Complete Blood Count', code: 'CBC', category: 'Hematology', sample: 'Blood', price: 800, active: true },
  { name: 'Lipid Profile', code: 'LIP', category: 'Biochemistry', sample: 'Blood', price: 1500, active: true },
  { name: 'Urine Routine', code: 'URE', category: 'Pathology', sample: 'Urine', price: 400, active: false },
]

export default function Tests() {

  const navigate = useNavigate()

  const handleClick = () =>{
  navigate('/admin/tests/add')
}

  return (
    <div className="min-h-dvh bg-slate-50 p-6 lg:p-8">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-dark">Tests</h1>
          <p className="mt-1 text-sm text-slate-500">Manage all diagnostic tests offered at the centre.</p>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 sm:w-72">
            <input
              type="search"
              placeholder="Search tests..."
              className="peer w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-light focus:ring-4 focus:ring-brand-light/15"
            />
            <svg viewBox="0 0 24 24" {...stroke} className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400 peer-focus:text-brand">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </div>

          <button 
          onClick={handleClick}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
            <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2} className="size-4">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Test
          </button>
        </div>
      </header>

      {/* Tests table */}
      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
        <table className="w-full min-w-160 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3.5">Test</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Sample</th>
              <th className="px-5 py-3.5">Price</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tests.map((t) => (
              <tr key={t.code} className="transition hover:bg-slate-50/70">
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.code}</p>
                </td>
                <td className="px-5 py-4 text-slate-600">{t.category}</td>
                <td className="px-5 py-4 text-slate-600">{t.sample}</td>
                <td className="px-5 py-4 font-medium text-slate-900">Rs. {t.price}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${t.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {t.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-brand-light transition hover:bg-brand-light/10">Edit</button>
                  <button className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

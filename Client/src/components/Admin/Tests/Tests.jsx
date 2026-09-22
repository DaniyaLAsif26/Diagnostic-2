import { stroke } from '../../Forms/styles/iconStroke'
import { useNavigate } from 'react-router-dom'

import { createColumnHelper, tableFeatures, useTable } from '@tanstack/react-table';
import {useQuery} from '@tanstack/react-query'

import api from '../../../api/api.js'

const features = tableFeatures({}); 
const columnHelper = createColumnHelper()

const columns = columnHelper.columns([
  columnHelper.accessor('name', { header: 'Test Name' }),
  columnHelper.accessor('price', { header: 'Price' }),
  columnHelper.accessor('category', { header: 'Category' }),
  columnHelper.accessor('relevance', { header: 'Relevance' }),
  columnHelper.accessor('preparation', { header: 'Preparation' }),
]);


export default function Tests() {

const allTests = async() =>{
  const res = await api.get('/tests/all')
  return res.data.data.allTests
}

  const {data , isPending ,isError , error} = useQuery({
    queryKey : ['tests'],
    queryFn : allTests
  })

  const navigate = useNavigate()

  const table = useTable({ features, columns, data });

  const handleClick = () =>{
  navigate('/admin/tests/add')
}

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-dvh bg-slate-50 p-6 lg:p-8">
      {/* Header */}
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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

          <div className="relative shrink-0">
            <select className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-brand-light focus:ring-4 focus:ring-brand-light/15">
              <option value="">All Types</option>
              <option value="laboratory">Laboratory</option>
              <option value="radiology">Radiology</option>
            </select>
            <svg viewBox="0 0 24 24" {...stroke} className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400">
              <path d="m6 9 6 6 6-6" />
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

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
        <table className="w-full min-w-160 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-5 py-3.5">
                    <table.FlexRender header={header} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="transition hover:bg-brand-light/[0.03]">
                {row.getAllCells().map((cell) => (
                  <td key={cell.id} className="px-5 py-4 first:font-semibold first:text-slate-900">
                    <table.FlexRender cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

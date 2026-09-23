import { useTable } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom";

export default function DataTable({ data, columns, features }) {
  const navigate = useNavigate()

  const table = useTable({ features, columns, data });

  const slugify = (name) => {
    // name?.toLowerCase()
  return  name.toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g , '-')
      .replace(/(^-|-$)/g, '')
  }

  return (
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
            <tr
              onClick={() => navigate(`/admin/tests/${row.original.id}/${slugify(row.original.name)}`)}
              key={row.id} className="transition hover:bg-brand-light/[0.03]">
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
  )
}
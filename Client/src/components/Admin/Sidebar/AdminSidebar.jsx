import Logo from '../../Logo/Logo'
import { stroke } from '../../Forms/styles/iconStroke'
import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Dashboard', icon: <path d="M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z" /> },
  { label: 'Tests', icon: <path d="M9 2h6M10 2v14a2 2 0 0 0 4 0V2M10 11h4" /> },
  { label: 'Packages', icon: <path d="M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8M7.5 5.5l9 5" /> },
  { label: 'Patients', icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /> },
  { label: 'Reports', icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5" /> },
  { label: 'Settings', icon: <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 14H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 3V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 21 10h.1a2 2 0 0 1 0 4H21a1.7 1.7 0 0 0-1.6 1" /> },
]

export default function AdminSidebar() {
  return (
    <aside className="sticky top-0 flex h-dvh w-69 shrink-0 flex-col bg-brand-dark p-4 text-white">
      <Logo light className="border-b border-white/10 px-2 pb-5 pt-2" />

      <nav className="mt-5 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
        {links.map(({ label, icon }) => (
          <NavLink
            key={label}
            to={label.toLowerCase()}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-light text-white shadow-lg shadow-black/20'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <svg viewBox="0 0 24 24" {...stroke} className="size-4.5">{icon}</svg>
            {label}
          </NavLink>
        ))}
      </nav>

      <button className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/60 transition hover:bg-red-500/10 hover:text-red-400">
        <svg viewBox="0 0 24 24" {...stroke} className="size-4.5">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
        Logout
      </button>
    </aside>
  )
}

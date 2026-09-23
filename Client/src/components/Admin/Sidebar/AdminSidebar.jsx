import { stroke } from '../../Forms/styles/iconStroke'
import { NavLink } from 'react-router-dom'
import LOGO from '../../../assets/logo.png'

const links = [
  { label: 'Dashboard', icon: <path d="M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z" /> },
  { label: 'Tests', icon: <path d="M9 2h6M10 2v14a2 2 0 0 0 4 0V2M10 11h4" /> },
  { label: 'Packages', icon: <path d="M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8M7.5 5.5l9 5" /> },
  { label: 'Patients', icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /> },
  { label: 'Reports', icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5" /> },
  { label: 'Settings', icon: <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 14H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 3V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 21 10h.1a2 2 0 0 1 0 4H21a1.7 1.7 0 0 0-1.6 1" /> },
]

const item = 'flex items-center gap-3 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium transition'

export default function AdminSidebar({ open, onToggle }) {
  // Labels fade in/out while the sidebar width animates
  const text = `transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`

  return (
    <aside className={`flex shrink-0 flex-col overflow-hidden bg-brand-dark px-3 pb-4 text-white transition-[width] duration-300 ${open ? 'w-64' : 'w-18'}`}>
      <div className="flex h-16 shrink-0 items-center border-b border-white/10">
        <button onClick={onToggle} aria-label="Toggle sidebar" className="rounded-xl p-3 text-white/80 transition hover:bg-white/5 hover:text-white">
          <svg viewBox="0 0 24 24" {...stroke} className="size-5"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>

        {/* Branding, visible only when the sidebar is open */}
        <div className={`ml-1 flex shrink-0 items-center gap-2.5 whitespace-nowrap ${text}`}>
          <img src={LOGO} alt="Vision Diagnostic Centre" className="size-9 rounded-full bg-white p-0.5" />
          <p className="text-sm font-bold uppercase leading-tight">Vision Diagnostic<br />Centre</p>
        </div>
      </div>

      <nav className="mt-4 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {links.map(({ label, icon }) => (
          <NavLink
            key={label}
            to={label.toLowerCase()}
            title={label}
            className={({ isActive }) =>
              `${item} ${isActive ? 'bg-brand-light text-white shadow-lg shadow-black/20' : 'text-white/60 hover:bg-white/5 hover:text-white'}`
            }
          >
            <svg viewBox="0 0 24 24" {...stroke} className="size-4.5 shrink-0">{icon}</svg>
            <span className={text}>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button title="Logout" className={`${item} text-white/60 hover:bg-red-500/10 hover:text-red-400`}>
        <svg viewBox="0 0 24 24" {...stroke} className="size-4.5 shrink-0">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
        <span className={text}>Logout</span>
      </button>
    </aside>
  )
}

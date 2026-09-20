import LOGO from '../../assets/logo.png'

/** Seal + divider + stacked name. Pass `light` on dark backgrounds. */
export default function Logo({ light = false, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={LOGO}
        alt="Vision Diagnostic Centre"
        className={`size-18 shrink-0 rounded-full ${light ? 'bg-white p-0.5' : ''}`}
      />
      <span className={`h-16 w-1 shrink-0 ${light ? 'bg-white' : 'bg-brand'}`} />
      <p className={`text-xl font-bold uppercase leading-[1.2] ${light ? 'text-white' : 'text-brand'}`}>
        Vision<br />Diagnostic<br />Centre
      </p>
    </div>
  )
}

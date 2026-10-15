import Icon from '../Icon/Icon'
import { CONTACT, tel, whatsapp } from '../../constants/contact'

// "Need help?" banner at the bottom of the listing pages
export default function HelpBanner({ title, text }) {
    return (
        <div className="mt-14 flex flex-col items-start gap-5 rounded-3xl bg-linear-to-br from-sky-50 to-indigo-50 p-6 ring-1 ring-slate-200/60 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div>
                <h2 className="text-lg font-bold text-brand-dark">{title}</h2>
                <p className="mt-1 text-sm text-slate-600">{text}</p>
            </div>
            <div className="flex flex-wrap gap-3">
                <a href={tel} className="inline-flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid">
                    <Icon name="phone" className="size-4" />{CONTACT.phone}
                </a>
                <a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand ring-1 ring-slate-200 transition hover:ring-brand-light/40">
                    <Icon name="chat" className="size-4" />WhatsApp us
                </a>
            </div>
        </div>
    )
}

import { stroke } from '../Forms/styles/iconStroke'

/** Stroke icons used across the public site. Usage: <Icon name="phone" className="size-4" /> */
const icons = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />,
    mail: <><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m3 6.5 9 6 9-6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="M18 6 6 18M6 6l12 12" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    check: <path d="m5 12 5 5L20 7" />,
    home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    tube: <path d="M9 2h6M10 2v14a2 2 0 0 0 4 0V2M10 11h4" />,
    package: <path d="M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8M7.5 5.5l9 5" />,
    scan: <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10" />,
    upload: <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />,
    download: <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />,
    droplet: <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7Z" />,
    heart: <><path d="M12 20.5S3.5 15.6 3.5 10a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2c0 5.6-8.5 10.5-8.5 10.5Z" /><path d="M4.5 12H8l1.8-3 2.4 6 1.8-3h5.5" /></>,
    thyroid: <><path d="M12 5v15" /><path d="M12 9c-1.5-3-7-3.5-7 1.5 0 4 3.5 7.5 7 7.5s7-3.5 7-7.5c0-5-5.5-4.5-7-1.5Z" /></>,
    liver: <path d="M3 9c0-3 3-5 7-5h8a3 3 0 0 1 3 3c0 6-6 11-12 11-2 0-2 2-3 2-2 0-3-5-3-11Z" />,
    kidney: <><path d="M15.5 3C11 3 8 6.5 8 11c0 2 1.5 3 1.5 4.5S8 18 8 19a2 2 0 0 0 2 2c5 0 10-4.5 10-10 0-4.5-2-8-4.5-8Z" /><path d="M9.5 15.5 4 18" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    thermometer: <path d="M14 4v10.5a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />,
    bone: <path d="M17 10c.7-.7 1.7 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .8.7 1.8 0 2.5l-7 7c-.7.7-1.7 0-2.5 0a2.5 2.5 0 0 0 0 5c.3 0 .5.2.5.5a2.5 2.5 0 1 0 5 0c0-.8-.7-1.8 0-2.5Z" />,
    female: <><circle cx="12" cy="9" r="5" /><path d="M12 14v7M9 18h6" /></>,
    lungs: <path d="M12 4v8M12 12c-1 2-4 2-6 0M12 12c1 2 4 2 6 0M7 8C4 9 3 13 3 17c0 2 1 3 3 3s3-1 3-3v-5M17 8c3 1 4 5 4 9 0 2-1 3-3 3s-3-1-3-3v-5" />,
    xray: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 6v12M8 9h8M7.5 12h9M8 15h8" /></>,
    ultrasound: <path d="M4 18a10 10 0 0 1 16 0M7 15a6 6 0 0 1 10 0M10 12a2.5 2.5 0 0 1 4 0" />,
    activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    flask: <><path d="M9 3h6M10 3v6L5.4 18.8A1.8 1.8 0 0 0 7 21.5h10a1.8 1.8 0 0 0 1.6-2.7L14 9V3" /><path d="M7.6 15h8.8" /></>,
    report: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5" />,
    list: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9Z" />,
    award: <><circle cx="12" cy="8" r="6" /><path d="M15.5 13 17 22l-5-3-5 3 1.5-9" /></>,
    tag: <><path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z" /><circle cx="7.5" cy="7.5" r="1.5" /></>,
    chat: <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5Z" />,
    trend: <path d="M22 7 13.5 15.5l-5-5L2 17M16 7h6v6" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></>,
}

export default function Icon({ name, className = 'size-5' }) {
    return (
        <svg viewBox="0 0 24 24" {...stroke} className={className} aria-hidden="true">
            {icons[name]}
        </svg>
    )
}

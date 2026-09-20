import { stroke } from './iconStroke'

/**
 * Decorative page background for the Forms folder:
 * colour washes, seal rings, a tiled healthcare glyph pattern and an ECG trace.
 * Purely visual - renders nothing interactive.
 */
function FormBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* soft colour washes */}
      <div className="absolute -left-40 -top-40 size-[520px] rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute -bottom-56 -right-40 size-[560px] rounded-full bg-cyan-200/35 blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 size-[420px] rounded-full bg-indigo-200/25 blur-3xl" />

      {/* concentric rings echoing the seal */}
      <div className="absolute left-1/2 top-1/2 size-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/[0.07]" />
      <div className="absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/[0.05]" />

      {/* dot grid + tiled healthcare glyphs */}
      <svg className="absolute inset-0 size-full text-brand" aria-hidden="true">
        <defs>
          <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1.6" cy="1.6" r="1.6" fill="currentColor" opacity="0.1" />
          </pattern>

          <pattern id="glyphs" width="260" height="260" patternUnits="userSpaceOnUse">
            <g {...stroke} opacity="0.11">
              {/* heartbeat */}
              <g transform="translate(20,26) scale(1.5)">
                <path d="M12 20.5S3.5 15.6 3.5 10a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2c0 5.6-8.5 10.5-8.5 10.5Z" />
                <path d="M4.5 12H8l1.8-3 2.4 6 1.8-3h5.5" />
              </g>
              {/* stethoscope */}
              <g transform="translate(150,20) scale(1.5)">
                <path d="M5 3v5a5 5 0 0 0 10 0V3" />
                <path d="M10 13v2a5 5 0 0 0 10 0v-2" />
                <circle cx="20" cy="10" r="2.4" />
              </g>
              {/* test tube */}
              <g transform="translate(40,140) scale(1.5)">
                <path d="M9 2h6M10 2v14a2 2 0 0 0 4 0V2M10 11h4" />
              </g>
              {/* dna */}
              <g transform="translate(120,130) scale(1.5)">
                <path d="M6 3c0 6 12 6 12 12M18 3c0 6-12 6-12 12M6 21h12" />
                <path d="M8 7h8M8 15h8" />
              </g>
              {/* syringe */}
              <g transform="translate(196,150) scale(1.4)">
                <path d="m18 2 4 4M17 7l3-3" />
                <path d="M19 9 8.7 19.3a2.4 2.4 0 0 1-3.4 0l-1.6-1.6a2.4 2.4 0 0 1 0-3.4L14 4" />
                <path d="m9 11 4 4M5 19l-3 3" />
              </g>
              {/* medical cross */}
              <g transform="translate(210,66) scale(1.4)">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M12 8v8M8 12h8" />
              </g>
              {/* flask */}
              <g transform="translate(96,66) scale(1.4)">
                <path d="M9 3h6M10 3v6L5.4 18.8A1.8 1.8 0 0 0 7 21.5h10a1.8 1.8 0 0 0 1.6-2.7L14 9V3" />
                <path d="M7.6 15h8.8" />
              </g>
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
        <rect width="100%" height="100%" fill="url(#glyphs)" />
      </svg>

      {/* ECG trace across the lower third */}
      <svg
        className="absolute inset-x-0 bottom-24 h-24 w-full text-brand/15"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 60h180l24-40 20 74 26-56 18 22h150l24-40 20 74 26-56 18 22h150l24-40 20 74 26-56 18 22h436"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default FormBackdrop

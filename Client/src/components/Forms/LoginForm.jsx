import Logo from '../Logo/Logo'
import LOGO from '../../assets/logo.png'
import FormBackdrop from './styles/FormBackdrop'
import { stroke } from './styles/iconStroke'

import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import api from '../../api/api'

const loginSchema = z.object({
  email:
    z.string()
      .email("Please enter a valid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean()
})

// Shown on the brand panel (desktop only)
const highlights = [
  'Qualified pathologists and radiologists review every report.',
  'Automated analysers with daily calibration and quality controls.',
  'Transparent rates with no hidden charges.',
]

const input ='peer w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 short:py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-light focus:bg-white focus:ring-4 focus:ring-brand-light/15 aria-invalid:border-red-400 aria-invalid:bg-red-50/40 aria-invalid:focus:ring-red-500/15'

const fieldIcon = 'pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-slate-400 transition peer-focus:text-brand'

const label = 'mb-1.5 block text-sm font-medium text-slate-700'

const FieldError = ({ e }) => e && (
  <p role="alert" className="mt-1.5 pl-1 text-xs font-medium text-red-600">{e.message}</p>
)

export default function LoginForm() {

  const navigate = useNavigate()
  const location = useLocation()

  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // 'default' key means /login was opened directly (no in-app history), so go home instead
  const goBack = () => location.key === 'default' ? navigate('/') : navigate(-1)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur'
  })

  const submitLogin = async (data) => {
    setError('')

    try {
      const res = await api.post("/login", data)

      if (res.data.success) {
        navigate('/admin/dashboard')
      }
    }
    catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center bg-slate-50 px-4 py-6 sm:py-10 short:py-3 sm:short:py-3">
      <FormBackdrop />

      <div className="relative grid w-full max-w-md overflow-hidden rounded-2xl bg-white/95 shadow-2xl shadow-brand/10 ring-1 ring-slate-900/5 backdrop-blur sm:rounded-3xl lg:max-w-4xl lg:grid-cols-2">

        {/* Brand panel - desktop only */}
        <aside className="relative hidden flex-col justify-center gap-12 overflow-hidden bg-brand-dark p-11 text-white short:p-9 lg:flex">
          <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-40 -top-40 size-104 rounded-full border border-white/5" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-brand-light/30 blur-3xl" />

          <Logo light className="relative" />

          <div className="relative">
            <h2 className="text-3xl font-bold leading-tight tracking-tight">
              Care and accuracy<br />at every step
            </h2>
            <ul className="mt-8 space-y-4">
              {highlights.map(text => (
                <li key={text} className="flex gap-3 text-sm text-white/75">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/10">
                    <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2.4} className="size-3">
                      <path d="m5 12.5 4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Form panel */}
        <section className="flex flex-col p-6 sm:p-9 lg:p-11 lg:pt-8 short:p-5 sm:short:p-7 lg:short:p-9 lg:short:pt-7">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              className="group flex items-center gap-2 rounded-full py-1.5 pl-2 pr-3.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-brand hover:ring-brand-light/40"
            >
              <svg viewBox="0 0 24 24" {...stroke} strokeWidth={2} className="size-4 transition group-hover:-translate-x-0.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            {/* The brand panel carries the full logo on desktop */}
            <img src={LOGO} alt="Vision Diagnostic Centre" className="size-12 rounded-full short:size-10 lg:hidden" />
          </div>

          <div className="mt-8 sm:mt-10 lg:mt-7 short:mt-4 sm:short:mt-5 lg:short:mt-4">
            <h1 className="text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Log in to your Vision Diagnostic Centre account
            </p>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit(submitLogin)}
            className="mt-7 space-y-5 sm:mt-8 short:mt-4 short:space-y-4 sm:short:mt-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className={label}>Email address</label>
              <div className="relative">
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  placeholder="you@example.com"
                  className={`${input} pr-4`}
                />
                <svg viewBox="0 0 24 24" {...stroke} className={fieldIcon}>
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="m3 6.5 9 6 9-6" />
                </svg>
              </div>
              <FieldError e={errors.email} />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className={label}>Password</label>
                <a href="#forgot" className="mb-1.5 text-sm font-medium text-brand-light hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  placeholder="Enter your password"
                  className={`${input} pr-12`}
                />
                <svg viewBox="0 0 24 24" {...stroke} className={fieldIcon}>
                  <rect x="4" y="10" width="16" height="11" rx="2.5" />
                  <path d="M8 10V7a4 4 0 1 1 8 0v3" />
                </svg>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-brand"
                >
                  <svg viewBox="0 0 24 24" {...stroke} className="size-4.5">
                    <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="3" />
                    {showPassword && <path d="M4 4l16 16" />}
                  </svg>
                </button>
              </div>
              <FieldError e={errors.password} />
            </div>

            <label className="flex w-fit items-center gap-2 text-sm text-slate-600">
              <input
                {...register('rememberMe')}
                type="checkbox"
                className="size-4 rounded accent-brand" />
              Remember me
            </label>

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">
                {error}
              </p>
            )}

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full rounded-xl bg-brand-dark py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3.5 short:py-2.5 sm:short:py-3"
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-slate-400 short:my-3.5">
            <span className="h-px flex-1 bg-slate-200" />
            or
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          {/* UI only - hook up the Google sign-in flow in onClick */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3.5 short:py-2.5 sm:short:py-3"
          >
            <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-slate-500 short:mt-3">
            Don&apos;t have an account?{' '}
            <a href="#signup" className="font-semibold text-brand-light hover:underline">
              Sign up
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}

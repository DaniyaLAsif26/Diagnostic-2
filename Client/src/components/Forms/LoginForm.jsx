import Logo from '../Logo/Logo'
import FormBackdrop from './styles/FormBackdrop'
import { stroke } from './styles/iconStroke'

import { useNavigate } from 'react-router-dom'
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

export default function LoginForm() {

  const navigate = useNavigate()

  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur'
  })

  const submitLogin = async (data) => {
    
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
    <div className="relative flex min-h-dvh items-center justify-center bg-slate-50 px-4 py-8 sm:py-12">
      <FormBackdrop />

      <div className="relative w-full max-w-107 rounded-2xl bg-white/95 p-6 shadow-2xl shadow-brand/10 ring-1 ring-slate-900/5 backdrop-blur sm:rounded-3xl sm:p-9 lg:p-11">
        <Logo className="justify-center" />

        <h1 className="mt-5 text-center text-2xl font-bold tracking-tight text-brand-dark sm:mt-6 sm:text-3xl">
          Log In
        </h1>

        <form
          noValidate
          onSubmit={handleSubmit(submitLogin)}
          className="mt-6 sm:mt-8">
          {/* Email */}
          <div>
            <div className="relative">
              <input
                {...register('email')}
                type="email"
                aria-label="Email address"
                aria-invalid={errors.email ? 'true' : 'false'}
                placeholder="Email address"
                className="peer w-full rounded-xl border border-transparent bg-slate-100/80 py-3 pl-11 pr-4 sm:py-3.5 sm:pl-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-light focus:bg-white focus:ring-4 focus:ring-brand-light/15 aria-invalid:border-red-400 aria-invalid:bg-red-50/40 aria-invalid:focus:ring-red-500/15"
              />
              <svg
                viewBox="0 0 24 24"
                {...stroke}
                className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400 transition peer-focus:text-brand sm:left-4"
              >
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="m3 6.5 9 6 9-6" />
              </svg>
            </div>
            {errors.email && (
              <p role="alert" className="mt-1.5 pl-1 text-xs font-medium text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mt-4">
            <div className="relative">
              <input
                {...register('password')}
                type="password"
                aria-label="Password"
                aria-invalid={errors.password ? 'true' : 'false'}
                placeholder="Password"
                className="peer w-full rounded-xl border border-transparent bg-slate-100/80 py-3 pl-11 pr-11 sm:py-3.5 sm:pl-12 sm:pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-light focus:bg-white focus:ring-4 focus:ring-brand-light/15 aria-invalid:border-red-400 aria-invalid:bg-red-50/40 aria-invalid:focus:ring-red-500/15"
              />
              <svg
                viewBox="0 0 24 24"
                {...stroke}
                className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400 transition peer-focus:text-brand sm:left-4"
              >
                <rect x="4" y="10" width="16" height="11" rx="2.5" />
                <path d="M8 10V7a4 4 0 1 1 8 0v3" />
              </svg>
              <span className="absolute right-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400 sm:right-4">
                <svg viewBox="0 0 24 24" {...stroke}>
                  <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
            </div>
            {errors.password && (
              <p role="alert" className="mt-1.5 pl-1 text-xs font-medium text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me / forgot */}
          <div className="mt-5 flex items-center justify-between gap-2 text-[13px] sm:text-sm">
            <label className="flex shrink-0 items-center gap-2 text-slate-600">
              <input
                {...register('rememberMe')}
                type="checkbox"
                className="size-4 rounded accent-brand" />
              Remember me
            </label>
            <a href="#forgot" className="shrink-0 font-medium text-brand-light hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="mt-7 w-full rounded-xl bg-brand-dark py-3 text-sm sm:py-3.5 font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <a href="#signup" className="font-semibold text-brand-light hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}


import { FieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller } from 'react-hook-form'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../../api/api'
import TagInput from './TagInput'
import { stroke } from '../styles/iconStroke'

import { useMutation, useQueryClient } from '@tanstack/react-query'

const label = 'mb-1.5 block text-sm font-medium text-slate-700'
const input = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-light focus:ring-4 focus:ring-brand-light/15'

const categories = [
    { value: 'LABORATORY', title: 'Laboratory', hint: 'Blood, urine & sample tests', icon: <path d="M9 2h6M10 2v7L4.5 19a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9V2M7 15h10" /> },
    { value: 'RADIOLOGY', title: 'Radiology', hint: 'X-ray, ultrasound & scans', icon: <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10" /> },
]

// Shows a field's validation message (renders nothing when there is no error)
const Err = ({ e }) => e && <p role="alert" className="mt-1.5 pl-1 text-xs font-medium text-red-600">{e.message}</p>

// White card with an icon header, used for each group of fields
const Card = ({ icon, title, hint, children }) => (
    <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
            <span className="grid size-9 place-items-center rounded-lg bg-brand-light/10 text-brand">
                <svg viewBox="0 0 24 24" {...stroke} className="size-4.5">{icon}</svg>
            </span>
            <div>
                <h2 className="font-semibold text-brand-dark">{title}</h2>
                <p className="text-xs text-slate-500">{hint}</p>
            </div>
        </div>
        <div className="space-y-5 p-6">{children}</div>
    </section>
)

export default function AddTestForm() {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [error, setError] = useState('')

    const testSchema = z.object({
        name:
            z.string()
                .min(1, "Test name is required"),

        price:
            z.number({ error: "Enter a number" })
                .positive("Price must be a greater than 0"),

        offerPrice:
            z.number()
                .optional(),

        category:
            z.enum(["LABORATORY", "RADIOLOGY"], { error: "select a category" }),

        isPopular:
            z.boolean()
                .optional(),

        relevance:
            z.array(z.string())
                .min(1, "Add at least one relevance"),

        preparation:
            z.string()
    })

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            relevance: []
        },
        resolver: zodResolver(testSchema),
        mode: 'onBlur'
    })

    const addTestMutation = useMutation({
        mutationFn: (data) => api.post('/tests/add', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tests'] })
            navigate('/admin/tests')
        },
        onError: (err) => {
            setError(err.message)
        }
    })

    const addTest = (data) => addTestMutation.mutate(data)

    return (
        <form noValidate onSubmit={handleSubmit(addTest)} className="p-6 lg:p-8">
            {/* Header */}
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <button type="button" onClick={() => navigate('/admin/tests')} className="flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-brand">
                        <svg viewBox="0 0 24 24" {...stroke} className="size-4"><path d="m15 18-6-6 6-6" /></svg>
                        Back to tests
                    </button>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-brand-dark">Add Test</h1>
                    <p className="mt-1 text-sm text-slate-500">Add a new diagnostic test to the centre.</p>
                </div>

                <div className="flex gap-3">
                    <button type="button" onClick={() => navigate('/admin/tests')} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                        Cancel
                    </button>
                    <button
                        disabled={addTestMutation.isPending}
                        type="submit" className="rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99] disabled:opacity-60">
                        {addTestMutation.isPending ? 'Saving...' : 'Save Test'}
                    </button>
                </div>
            </header>

            {error && <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <Card
                    title="Test details" hint="Name, price and type of the test."
                    icon={<path d="M9 2h6M10 2v14a2 2 0 0 0 4 0V2M10 11h4" />}>

                    <div>
                        <label className={label}>Test Name</label>
                        <input {...register('name')} type="text" placeholder="e.g. Complete Blood Count" className={input} />
                        <Err e={errors.name} />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className={label}>Price</label>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">Rs.</span>
                                <input {...register('price', { valueAsNumber: true })} type="number" placeholder="0" className={`${input} pl-12`} />
                            </div>
                            <Err e={errors.price} />
                        </div>

                        <div>
                            <label className={label}>Offer Price <span className="font-normal text-slate-400">(optional)</span></label>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">Rs.</span>
                                <input {...register('offerPrice', { valueAsNumber: true })} type="number" placeholder="0" className={`${input} pl-12`} />
                            </div>
                            <Err e={errors.offerPrice} />
                        </div>
                    </div>

                    <div>
                        <label className={label}>Category</label>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {categories.map((c) => (
                                <label key={c.value} className="relative cursor-pointer">
                                    <input {...register('category')} type="radio" value={c.value} className="peer sr-only" />
                                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3.5 transition hover:bg-slate-50 peer-checked:border-brand-light peer-checked:bg-brand-light/5 peer-checked:ring-4 peer-checked:ring-brand-light/15">
                                        <span className="grid size-10 place-items-center rounded-lg bg-brand-light/10 text-brand">
                                            <svg viewBox="0 0 24 24" {...stroke} className="size-5">{c.icon}</svg>
                                        </span>
                                        <span>
                                            <span className="block text-sm font-semibold text-slate-900">{c.title}</span>
                                            <span className="block text-xs text-slate-500">{c.hint}</span>
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                        <Err e={errors.category} />
                    </div>

                    {/* Popular toggle */}
                    <label className="relative flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-200 p-3.5 transition hover:bg-slate-50">
                        <span className="flex items-center gap-3">
                            <span className="grid size-10 place-items-center rounded-lg bg-amber-50 text-amber-500">
                                <svg viewBox="0 0 24 24" {...stroke} className="size-5"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z" /></svg>
                            </span>
                            <span>
                                <span className="block text-sm font-semibold text-slate-900">Mark as popular</span>
                                <span className="block text-xs text-slate-500">Highlights this test for patients</span>
                            </span>
                        </span>
                        <input {...register('isPopular')} type="checkbox" className="peer sr-only" />
                        <span className="relative h-6 w-11 shrink-0 rounded-full bg-slate-200 transition after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:bg-brand-light peer-checked:after:translate-x-5" />
                    </label>

                </Card>

                <Card
                    title="Patient information" hint="What the test is for and how to prepare."
                    icon={<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5" />}>

                    <div>
                        <label className={label}>Patient Preparation</label>
                        <textarea {...register('preparation')} rows={4} placeholder="e.g. Fasting for 10-12 hours" className={input} />
                        <Err e={errors.preparation} />
                    </div>

                    <div>
                        <label className={label}>Relevance</label>
                        <Controller
                            name='relevance'
                            control={control}
                            render={({ field }) => (
                                <TagInput
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    rows={2}
                                    placeholder={"Type a relevance & press enter"}
                                    className={input}
                                />
                            )}
                        />
                        <Err e={errors.relevance} />
                    </div>
                </Card>
            </div>
        </form>
    )
}

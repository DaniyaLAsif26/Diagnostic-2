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

const label = 'mb-1.5 block text-sm font-medium text-slate-700'

const field = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-light focus:ring-4 focus:ring-brand-light/15 disabled:border-transparent disabled:bg-slate-50 disabled:text-slate-600'

import { stroke } from "../../Forms/styles/iconStroke"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"

import { testSchema } from '../../../schemas/testSchema.js'

export default function EditTest({ data, testId }) {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [editing, setEditing] = useState(false)
    const [error, setError] = useState('')

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors, isDirty, dirtyFields }
    } = useForm({
        defaultValues: data,
        resolver: zodResolver(testSchema),
        mode: 'onBlur'
    })

    const editTestFn = async () => {
        if (isDirty) {
            const updatedTestValues = Object.keys(dirtyFields).reduce((result, key) => {
                result[key] = getValues(key)
                return result
            }, {})

            return updatedTestValues
        }
        else {
            setError("Please make some edits before saving")
            return
        }
    }

    const updateTest = useMutation({
        mutationFn: editTestFn
    })

   const editTest = () => updateTest.mutate()

    return (
        <form onSubmit={handleSubmit(editTest)} className="p-6 lg:p-8">
            {/* Header */}
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <button type="button" onClick={() => navigate('/admin/tests')} className="flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-brand">
                        <svg viewBox="0 0 24 24" {...stroke} className="size-4"><path d="m15 18-6-6 6-6" /></svg>
                        Back to tests
                    </button>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-brand-dark">{data?.name}</h1>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-brand-light/10 px-2.5 py-1 text-xs font-medium text-brand">{data?.category}</span>
                        {data?.isPopular && <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600">Popular</span>}
                    </div>
                </div>

                <div className="flex gap-3">
                    {editing && (
                        <button type="button" onClick={() => {
                            setEditing(false)
                            reset(data)
                                ;
                        }}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                            Cancel
                        </button>
                    )}
                    {!editing
                        ?
                        <button
                            type="button"
                            onClick={() => setEditing(!editing)}
                            className="flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
                            <svg viewBox="0 0 24 24" {...stroke} className="size-4">
                                {editing
                                    ? <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2M17 21v-8H7v8M7 3v5h8" />
                                    : <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />}
                            </svg>
                            Edit
                        </button>
                        :
                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
                            <svg viewBox="0 0 24 24" {...stroke} className="size-4">
                                {editing
                                    ? <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2M17 21v-8H7v8M7 3v5h8" />
                                    : <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />}
                            </svg>
                            Save
                        </button>
                    }
                </div>
            </header>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <Card
                    title="Test details" hint="Name, price and type of the test."
                    icon={<path d="M9 2h6M10 2v14a2 2 0 0 0 4 0V2M10 11h4" />}>

                    <div>
                        <label className={label}>Test Name</label>
                        <input {...register("name")} type="text" defaultValue={data?.name} disabled={!editing} className={field} />
                        {errors.name && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.name.message}</p>}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className={label}>Price</label>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">Rs.</span>
                                <input {...register("price", { valueAsNumber: true })} type="number" defaultValue={data?.price} disabled={!editing} className={`${field} pl-12`} />
                            </div>
                            {errors.price && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.price.message}</p>}
                        </div>

                        <div>
                            <label className={label}>Offer Price <span className="font-normal text-slate-400">(optional)</span></label>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">Rs.</span>
                                <input {...register("offerPrice", { valueAsNumber: true })} type="number" defaultValue={data?.offerPrice} disabled={!editing} className={`${field} pl-12`} />
                            </div>
                            {errors.offerPrice && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.offerPrice.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className={label}>Category</label>
                        <select {...register("category")} defaultValue={data?.category} disabled={!editing} className={field}>
                            <option value="LABORATORY">Laboratory</option>
                            <option value="RADIOLOGY">Radiology</option>
                        </select>
                        {errors.category && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.category.message}</p>}
                    </div>

                    {/* Popular toggle */}
                    <label className="relative flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3.5 transition has-[:enabled]:cursor-pointer has-[:enabled]:hover:bg-slate-50">
                        <span className="flex items-center gap-3">
                            <span className="grid size-10 place-items-center rounded-lg bg-amber-50 text-amber-500">
                                <svg viewBox="0 0 24 24" {...stroke} className="size-5"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z" /></svg>
                            </span>
                            <span>
                                <span className="block text-sm font-semibold text-slate-900">Marked as popular</span>
                                <span className="block text-xs text-slate-500">Highlights this test for patients</span>
                            </span>
                        </span>
                        <input {...register("isPopular")} type="checkbox" defaultChecked={data.isPopular} disabled={!editing} className="peer sr-only" />
                        <span className="relative h-6 w-11 shrink-0 rounded-full bg-slate-200 transition after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:bg-brand-light peer-checked:after:translate-x-5 peer-disabled:opacity-70" />
                    </label>
                </Card>

                <Card
                    title="Patient information" hint="What the test is for and how to prepare."
                    icon={<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5" />}>

                    <div>
                        <label className={label}>Patient Preparation</label>
                        <textarea {...register("preparation")} rows={4} defaultValue={data?.preparation} disabled={!editing} className={field} />
                        {errors.preparation && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.preparation.message}</p>}
                    </div>

                    <div>
                        <label className={label}>Relevance</label>
                        {/* Swap this block for <TagInput /> while editing */}
                        <div className="flex flex-wrap gap-2 rounded-xl bg-slate-50 p-3">
                            {data?.relevance.map((tag) => (
                                <span key={tag} className="inline-flex items-center gap-1.5 rounded-full bg-brand-light/10 px-3 py-1 text-sm font-medium text-brand">
                                    {tag}
                                    {editing && <button type="button" aria-label={`Remove ${tag}`} className="text-brand/60 transition hover:text-red-500">×</button>}
                                </span>
                            ))}
                        </div>
                        {errors.relevance && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.relevance.message}</p>}
                    </div>
                </Card>
            </div>
        </form>
    )
}
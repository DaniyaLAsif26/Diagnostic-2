import { label, Card, Err, input, field } from "../../Forms/styles/formHelpers.jsx"

import { stroke } from "../../Forms/styles/iconStroke"
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"

import { toast } from 'sonner'

import { testSchema } from '../../../schemas/testSchema.js'
import api from "../../../api/api.js"
import TagInput from "../../Forms/Admin/FormHelpers/TagInput.jsx"
import Category from '../../Forms/Admin/FormHelpers/Category.jsx'
import Price from "../../Forms/Admin/FormHelpers/Price.jsx"
import OfferPrice from "../../Forms/Admin/FormHelpers/OfferPrice.jsx"
import IsPopular from "../../Forms/Admin/FormHelpers/IsPopular.jsx"

export default function EditTest({ data, testId }) {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [editing, setEditing] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        control,
        formState: { errors, isDirty, dirtyFields }
    } = useForm({
        defaultValues: data,
        resolver: zodResolver(testSchema),
        mode: 'onBlur'
    })

    const updateTest = useMutation({
        mutationFn: (updatedTestValues) =>
            api.patch(`/tests/edit/${testId}`, updatedTestValues),
        onSuccess: () => {
            toast.success("Test updated successfully")
            setEditing(false)
            reset(getValues())
            queryClient.invalidateQueries({ queryKey: ['tests', testId] })

            queryClient.invalidateQueries({ queryKey: ['tests'], exact: true })
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || err.message || "Something went wrong")
        }
    })

    const editTest = () => {
        if (!isDirty) {
            toast.info('No changes to save')
            return
        }

        // const updatedTestValues = Object.keys(dirtyFields).reduce((result, key) => {
        //     result[key] = getValues(key)
        //     return result
        // }, {})

        const updatedTestValues = Object.fromEntries(
            Object.keys(dirtyFields).map((key) => [key, getValues(key)])
        )

        updateTest.mutate(updatedTestValues)
    }

    const deleteTest = useMutation({
        mutationFn: (id) => api.delete(`/tests/delete/${id}`),

        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['tests', testId] })
            queryClient.invalidateQueries({ queryKey: ['tests'], exact: true })

            navigate('/admin/tests')
            toast.success("Test deleted Successfully")
        },

        onError: (err) => {
            toast.error(err.response?.data?.message || err.message || "Something went wrong")
        }
    })

    const handleTestDelete = (data) => {
        if (window.confirm(`Delete test ${data.name} ? This can't be undone.`)) {
            deleteTest.mutate(data.id)
        }
    }

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
                        }}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                            Cancel
                        </button>
                    )}
                    {!editing && (
                        <button
                            onClick={() => handleTestDelete(data)}
                            type="button"
                            className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 active:scale-[0.99]">
                            <svg viewBox="0 0 24 24" {...stroke} className="size-4">
                                <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
                            </svg>
                            Delete
                        </button>
                    )}
                    {!editing
                        ?
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setEditing(!editing)
                            }}
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
                            disabled={updateTest.isPending}
                            className="flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
                            <svg viewBox="0 0 24 24" {...stroke} className="size-4">
                                {editing
                                    ? <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2M17 21v-8H7v8M7 3v5h8" />
                                    : <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />}
                            </svg>
                            {updateTest.isPending ? 'Saving' : 'Save'}
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
                        <Err e={errors.name} />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className={label}>Price</label>
                            <Price
                                register={register}
                                data={data}
                                disabled={!editing}
                            />
                            <Err e={errors.price} />
                        </div>

                        <div>
                            <label className={label}>Offer Price <span className="font-normal text-slate-400">(optional)</span></label>
                            <OfferPrice
                                register={register}
                                data={data}
                                disabled={!editing}
                            />
                            <Err e={errors.offerPrice} />
                        </div>
                    </div>

                    <div>
                        <label className={label}>Category</label>
                        <Category
                            register={register}
                            disabled={!editing}
                        />
                        <Err e={errors.category} />
                    </div>

                    {/* Popular toggle */}
                    <label className="relative flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3.5 transition has-[:enabled]:cursor-pointer has-[:enabled]:hover:bg-slate-50">
                        <IsPopular
                            register={register}
                            data={data}
                            disabled={!editing}
                        />
                    </label>
                </Card>

                <Card
                    title="Patient information" hint="What the test is for and how to prepare."
                    icon={<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5" />}>

                    <div>
                        <label className={label}>Patient Preparation</label>
                        <textarea {...register("preparation")} rows={4} defaultValue={data?.preparation} disabled={!editing} className={field} />
                        <Err e={errors.preparation} />
                    </div>

                    <div>
                        <label className={label}>Relevance</label>
                        {/* Swap this block for <TagInput /> while editing */}
                        <Controller
                            name="relevance"
                            control={control}
                            render={({ field }) => (
                                <TagInput
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    rows={2}
                                    placeholder={"Type a relevance & press enter"}
                                    className={input}
                                    disabled={!editing}
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
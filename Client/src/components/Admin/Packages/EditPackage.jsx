import { label, Card, Err, field, input } from "../../Forms/styles/formHelpers.jsx"
import { stroke } from "../../Forms/styles/iconStroke"

import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm, useFieldArray, Controller } from "react-hook-form"

import api from "../../../api/api.js"
import { packageKeys, testKeys } from "../../../api/queryKeys.js"
import { zodResolver } from "@hookform/resolvers/zod"
import { packageSchema } from "../../../schemas/packageSchema.js"

import TagInput from "../../Forms/Admin/FormHelpers/TagInput.jsx"
import Category from '../../Forms/Admin/FormHelpers/Category.jsx'
import Price from "../../Forms/Admin/FormHelpers/Price.jsx"
import OfferPrice from "../../Forms/Admin/FormHelpers/OfferPrice.jsx"
import IsPopular from "../../Forms/Admin/FormHelpers/IsPopular.jsx"
import Description from "../../Forms/Admin/FormHelpers/Description.jsx"
import TestPicker from "../../Forms/Admin/FormHelpers/TestPicker.jsx"

export default function EditPackage({ data, PackageId }) {

    const queryClient = useQueryClient()
    const navigate = useNavigate()

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
        resolver: zodResolver(packageSchema),
        mode: "onBlur"
    })

    const { fields, append, remove } = useFieldArray({ control, name: "tests" })

    const updatePackage = useMutation({
        mutationFn: (updatedPackageValues) =>
            api.patch(`/packages/edit/${PackageId}`, updatedPackageValues),
        onSuccess: () => {
            toast.success("Package updated successfully")
            setEditing(false)
            reset(getValues())
            queryClient.invalidateQueries({ queryKey: packageKeys.all })
            // Test pages list the packages that include them, so refresh them too
            queryClient.invalidateQueries({ queryKey: testKeys.all })
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || err.message || "Something went wrong")
        }
    })

    const editPackage = () => {
        if (!isDirty) {
            toast.info('No changes to save')
            return
        }

        const updatedPackageValues = Object.fromEntries(
            Object.keys(dirtyFields).map((key) => [key, getValues(key)])
        )

        updatePackage.mutate(updatedPackageValues)
    }

    const deletePackage = useMutation({
        mutationFn: (id) => api.delete(`/packages/delete/${id}`),

        onSuccess: () => {
            queryClient.removeQueries({ queryKey: packageKeys.detail(PackageId) })
            queryClient.invalidateQueries({ queryKey: packageKeys.all })
            // Test pages list the packages that include them, so refresh them too
            queryClient.invalidateQueries({ queryKey: testKeys.all })

            navigate('/admin/packages')
            toast.success("Package deleted successfully")
        },

        onError: (err) => {
            toast.error(err.response?.data?.message || err.message || "Something went wrong")
        }

    })

    const handleDeletePackage = (data) => {
        if (window.confirm(`Delete Package ${data.name} ? This can't be undone.`)) {
            deletePackage.mutate(data.id)
        }
    }

    return (
        <form onSubmit={handleSubmit(editPackage)} className="p-6 lg:p-8">
            {/* Header */}
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <button type="button" onClick={() => navigate('/admin/packages')} className="flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-brand">
                        <svg viewBox="0 0 24 24" {...stroke} className="size-4"><path d="m15 18-6-6 6-6" /></svg>
                        Back to packages
                    </button>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-brand-dark">{data.name}</h1>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-brand-light/10 px-2.5 py-1 text-xs font-medium text-brand">{data.category}</span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{data?.tests?.length} tests</span>
                        {data.isPopular && <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600">Popular</span>}
                    </div>
                </div>

                <div className="flex gap-3">
                    {editing ? (
                        <>
                            <button type="button" onClick={() => {
                                setEditing(false)
                                reset(data)
                            }}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={updatePackage.isPending}
                                className="flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99] disabled:opacity-60">
                                <svg viewBox="0 0 24 24" {...stroke} className="size-4"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2M17 21v-8H7v8M7 3v5h8" /></svg>
                                {updatePackage.isPending ? 'Saving' : 'Save'}
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => handleDeletePackage(data)}
                                type="button"
                                className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 active:scale-[0.99]">
                                <svg viewBox="0 0 24 24" {...stroke} className="size-4"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" /></svg>
                                Delete
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setEditing(true)
                                }}
                                className="flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
                                <svg viewBox="0 0 24 24" {...stroke} className="size-4"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
                                Edit
                            </button>
                        </>
                    )}
                </div>
            </header>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <Card
                    title="Package details" hint="Name, price and description of the package."
                    icon={<path d="M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8" />}>

                    <div>
                        <label className={label}>Package Name</label>
                        <input {...register("name")} type="text" defaultValue={data.name} disabled={!editing} className={field} />
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

                    <div>
                        <label className={label}>Description <span className="font-normal text-slate-400">(optional)</span></label>
                        <Description register={register} data={data} disabled={!editing} />
                        <Err e={errors.description} />
                    </div>

                    <div>
                        <label className={label}>Patient Preparation</label>
                        <textarea {...register("preparation")} rows={3} defaultValue={data.preparation} disabled={!editing} className={field} />
                        <Err e={errors.preparation} />
                    </div>

                    <div>
                        <label className={label}>Relevance</label>
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

                    {/* Popular toggle */}
                    <label className="relative flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3.5 transition has-[:enabled]:cursor-pointer has-[:enabled]:hover:bg-slate-50">
                        <IsPopular
                            register={register}
                            disabled={!editing}
                        />
                    </label>
                </Card>

                <Card
                    title="Tests included" hint="Tests bundled in this package."
                    icon={<path d="M9 2h6M10 2v14a2 2 0 0 0 4 0V2M10 11h4" />}>

                    {/* Search + add - only while editing */}
                    {editing && <TestPicker fields={fields} append={append} />}

                    <div>
                        <ul className="space-y-2 rounded-xl bg-slate-50 p-3">
                            {fields.map((t, i) => (
                                <li key={t.id} className="flex items-center gap-3 rounded-lg bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-slate-900/5">
                                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">{i + 1}</span>
                                    <span className={`flex-1 text-sm font-medium ${t.testId ? 'text-brand-light' : 'text-slate-900'}`}>{t.name}</span>
                                    {!t.testId && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">New</span>}
                                    {editing && <button type="button" onClick={() => remove(i)} aria-label={`Remove ${t.name}`} className="text-slate-400 transition hover:text-red-500">×</button>}
                                </li>
                            ))}
                        </ul>
                        <Err e={errors.tests} />
                    </div>
                </Card>
            </div>
        </form>
    )
}

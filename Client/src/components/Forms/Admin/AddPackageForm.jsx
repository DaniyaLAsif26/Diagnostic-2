import { label, input, Card, Err } from '../styles/formHelpers'
import { stroke } from '../styles/iconStroke'
import { useNavigate } from 'react-router-dom'

import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { packageSchema } from '../../../schemas/packageSchema'
import TagInput from './FormHelpers/TagInput'
import Category from './FormHelpers/Category'
import Price from './FormHelpers/Price'
import OfferPrice from './FormHelpers/OfferPrice'
import IsPopular from './FormHelpers/IsPopular'
import Description from './FormHelpers/Description'
import TestPicker from './FormHelpers/TestPicker'

import api from '../../../api/api'

export default function AddPackageForm() {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            relevance: [],
            offerPrice: 0,
            tests: []
        },
        resolver: zodResolver(packageSchema),
        mode: 'onBlur'
    })

    const addPackage = useMutation({
        mutationFn: (data) => api.post('/packages/add', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['packages'] })
            navigate('/admin/packages')
        },
        onError : (err)=> console.log(err.message)
    })

    const { fields, append, remove } = useFieldArray({ control, name: "tests" })

    return (
        <form noValidate className="p-6 lg:p-8" onSubmit={handleSubmit(addPackage.mutate)}>
            {/* Header */}
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <button type="button" onClick={() => navigate('/admin/packages')} className="flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-brand">
                        <svg viewBox="0 0 24 24" {...stroke} className="size-4"><path d="m15 18-6-6 6-6" /></svg>
                        Back to packages
                    </button>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-brand-dark">Add Package</h1>
                    <p className="mt-1 text-sm text-slate-500">Bundle tests together at a package price.</p>
                </div>

                <div className="flex gap-3">
                    <button type="button" onClick={() => navigate('/admin/packages')} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                        Cancel
                    </button>
                    <button type="submit" className="rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
                        Save Package
                    </button>
                </div>
            </header>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <Card
                    title="Package details" hint="Name, price and description of the package."
                    icon={<path d="M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8" />}>

                    <div>
                        <label className={label}>Package Name</label>
                        <input {...register('name')} type="text" placeholder="e.g. Full Body Checkup" className={input} />
                        <Err e={errors.name} />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className={label}>Price</label>
                            <Price
                                register={register}
                            />
                            <Err e={errors.price} />
                        </div>

                        <div>
                            <label className={label}>Offer Price <span className="font-normal text-slate-400">(optional)</span></label>
                            <OfferPrice
                                register={register}
                            />
                            <Err e={errors.offerPrice} />
                        </div>
                    </div>

                    <div>
                        <label className={label}>Category</label>
                        <Category register={register} />
                        <Err e={errors.category} />
                    </div>

                    <div className="">
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

                    <div>
                        <label className={label}>Description <span className="font-normal text-slate-400">(optional)</span></label>
                        <Description register={register} placeholder="What this package covers" />
                        <Err e={errors.description} />
                    </div>

                    <div>
                        <label className={label}>Patient Preparation</label>
                        <textarea {...register('preparation')} rows={4} placeholder="e.g. Fasting for 10-12 hours" className={input} />
                        <Err e={errors.preparation} />
                    </div>

                    {/* Popular toggle */}
                    <label className="relative flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-200 p-3.5 transition hover:bg-slate-50">
                        <IsPopular
                            register={register}
                        />
                    </label>
                </Card>

                <Card
                    title="Tests included" hint="Search saved tests or type a new name to add it."
                    icon={<path d="M9 2h6M10 2v14a2 2 0 0 0 4 0V2M10 11h4" />}>

                    {/* Search + add */}
                    <div>
                        <label className={label}>Add Test</label>
                        <TestPicker fields={fields} append={append} />
                    </div>

                    {/* Picked tests */}
                    <div>
                        <label className={label}>Tests in this package <span className="font-normal text-slate-400">({fields.length})</span></label>
                        <ul className="min-h-32 space-y-2 rounded-xl bg-slate-50 p-3">
                            {fields.map((t, i) => (
                                <li key={t.id} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-slate-900/5">
                                    <span className={`text-sm font-medium ${t.testId ? 'text-brand-light' : 'text-slate-900'}`}>{t.name}</span>
                                    <span className="flex items-center gap-2">
                                        {!t.testId && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">New</span>}
                                        <button type="button" onClick={() => remove(i)} aria-label={`Remove ${t.name}`} className="text-slate-400 transition hover:text-red-500">×</button>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <Err e={errors.tests} />
                        <p className="mt-1.5 pl-1 text-xs text-slate-400">Blue tests are already saved, black ones will be created with the package.</p>
                    </div>
                </Card>
            </div>
        </form>
    )
}

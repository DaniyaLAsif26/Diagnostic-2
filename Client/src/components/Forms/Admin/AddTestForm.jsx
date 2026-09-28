import { label, input, Card, Err } from '../styles/formHelpers'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { stroke } from '../styles/iconStroke'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../../api/api'
import TagInput from './FormHelpers/TagInput'
import Category from './FormHelpers/Category'
import Price from './FormHelpers/Price'
import OfferPrice from './FormHelpers/OfferPrice'
import IsPopular from './FormHelpers/IsPopular'
import { testSchema } from '../../../schemas/testSchema'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function AddTestForm() {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [error, setError] = useState('')

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            relevance: [],
            offerPrice: 0
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
                            <Price register={register} />
                            <Err e={errors.price} />
                        </div>

                        <div>
                            <label className={label}>Offer Price <span className="font-normal text-slate-400">(optional)</span></label>
                            <OfferPrice register={register} />
                            <Err e={errors.offerPrice} />
                        </div>
                    </div>

                    <div>
                        <label className={label}>Category</label>
                        <Category register={register} />
                        <Err e={errors.category} />
                    </div>

                    {/* Popular toggle */}
                    <label className="relative flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-200 p-3.5 transition hover:bg-slate-50">
                        <IsPopular register={register} />
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

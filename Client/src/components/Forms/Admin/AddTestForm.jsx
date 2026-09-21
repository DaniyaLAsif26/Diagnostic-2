import { FieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller } from 'react-hook-form'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../../api/api'
import TagInput from './TagInput'

const label = 'mb-1.5 block text-sm font-medium text-slate-700'
const input = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-light focus:ring-4 focus:ring-brand-light/15'

export default function AddTestForm() {

    const navigate = useNavigate()

    const [error, setError] = useState('')

    const testSchema = z.object({
        name:
            z.string()
                .min(1, "Test name is required"),

        price:
            z.number({ error: "Enter a number" })
                .positive("Price must be a greater than 0"),

        category:
            z.enum(["LABORATORY", "RADIOLOGY"], { error: "select a category" }),

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
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            relevance: []
        },
        resolver: zodResolver(testSchema),
        mode: 'onBlur'
    })

    const addTest = async (data) => {
        try {

            const res = await api.post('/tests/add' , data)

            if(res.data.success){
                navigate('/admin/tests')
            }
        }
        catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="min-h-dvh bg-slate-50 p-6 lg:p-8">
            <h1 className="text-2xl font-bold tracking-tight text-brand-dark">Add Test</h1>
            <p className="mt-1 text-sm text-slate-500">Add a new diagnostic test to the centre.</p>

            <form
                onSubmit={handleSubmit(addTest)}
                className="mt-6 max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                <div>
                    <label className={label}>Name</label>
                    <input
                        {...register('name')}
                        type="text" placeholder="e.g. Complete Blood Count" className={input} />
                </div>
                {errors.name && (
                    <p role="alert" className="mt-1 pl-1 text-xs font-medium text-red-600">
                        {errors.name.message}
                    </p>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="">

                        <div>
                            <label className={label}>Price (Rs.)</label>
                            <input
                                {...register('price', { valueAsNumber: true })}
                                type="number" className={input} />
                        </div>
                        {errors.price && (
                            <p role="alert" className="mt-1.5 pl-1 text-xs font-medium text-red-600">
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    <div className="">

                        <div>
                            <label className={label}>Category</label>
                            <select
                                {...register('category')}
                                className={input}>
                                <option value="">Select category</option>
                                <option value="LABORATORY">Laboratory</option>
                                <option value="RADIOLOGY">Radiology</option>
                            </select>
                        </div>
                        {errors.category && (
                            <p role="alert" className="mt-1.5 pl-1 text-xs font-medium text-red-600">
                                {errors.category.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className={label}>Patient Preparation</label>
                    <textarea
                        {...register('preparation')}
                        rows={3} placeholder="e.g. Fasting for 10-12 hours" className={input} />
                    {errors.preparation && (
                        <p role="alert" className="mt-1.5 pl-1 text-xs font-medium text-red-600">
                            {errors.preparation.message}
                        </p>
                    )}
                </div>

                <div>
                    <Controller
                        name='relevance'
                        control={control}
                        render={({ field }) => (
                            <TagInput
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                rows={3}
                                placeholder={"Type a relevance & press enter"}
                                className={input}
                            />
                        )}
                    />
                    {errors.relevance && (
                        <p role="alert" className="mt-1.5 pl-1 text-xs font-medium text-red-600">
                            {errors.relevance.message}
                        </p>
                    )}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button type="button" className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                        Cancel
                    </button>
                    <button type="submit" className="rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-mid active:scale-[0.99]">
                        Save Test
                    </button>
                </div>
            </form>
        </div>
    )
}

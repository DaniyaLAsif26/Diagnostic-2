import { Link } from 'react-router-dom'

import HeaderBackdrop from '../Header/HeaderBackdrop'
import HelpBanner from '../Listing/HelpBanner'
import CustomPackageCartCard from './CustomPackageCartCard'
import PackageCartCard from './PackageCartCard'
import TestCartCard from './TestCartCard'
import OrderSummary from './OrderSummary'
import CartBookBar from './CartBookBar'
import EmptyCart from './EmptyCart'
import { wrap } from '../../constants/layout'
import { itemMrp, itemPrice } from '../../utils/cart'

const items = [
    {
        id: 'c1',
        type: 'custom',
        name: 'My yearly checkup',
        tests: [
            { id: 1, name: 'Complete Blood Count (CBC)', category: 'LABORATORY', price: 450, offerPrice: 350 },
            { id: 2, name: 'Thyroid Profile (T3, T4, TSH)', category: 'LABORATORY', price: 800, offerPrice: 599 },
            { id: 3, name: 'Chest X-Ray (PA View)', category: 'RADIOLOGY', price: 500, offerPrice: 0 },
        ],
    },
    {
        id: 'p1',
        type: 'package',
        name: 'Full Body Checkup',
        price: 2999,
        offerPrice: 1499,
        tests: ['Complete Blood Count', 'Lipid Profile', 'Liver Function Test', 'Kidney Function Test', 'Thyroid Profile', 'HbA1c', 'Fasting Blood Sugar', 'Vitamin B12', 'Vitamin D', 'Iron Studies', 'Urine Routine', 'ECG']
            .map((name, i) => ({ id: i + 1, name })),
    },
    { id: 't1', type: 'test', name: 'Vitamin D (25-OH)', category: 'LABORATORY', price: 1200, offerPrice: 899 },
    { id: 't2', type: 'test', name: 'Ultrasound Whole Abdomen', category: 'RADIOLOGY', price: 1500, offerPrice: 0 },
]
const coupon = { code: 'HEALTH10', amount: 250 } // null when no coupon is applied
const offers = [
    { code: 'HEALTH10', text: '10% off on orders above ₹999' },
    { code: 'FIRST200', text: '₹200 off on your first booking' },
]

const cards = {
    custom: CustomPackageCartCard,
    package: PackageCartCard,
    test: TestCartCard,
}

export default function Cart() {
    if (items.length === 0) return <EmptyCart />

    const mrp = items.reduce((sum, i) => sum + itemMrp(i), 0)
    const subtotal = items.reduce((sum, i) => sum + itemPrice(i), 0)
    const total = subtotal - (coupon?.amount ?? 0)

    return (
        <>
            <section className="px-2 pb-8 pt-2 sm:px-4 sm:pt-4">
                <div className="relative isolate overflow-clip rounded-[1.75rem] bg-slate-50 ring-1 ring-slate-900/5 sm:rounded-[2.5rem]">
                    <HeaderBackdrop />

                    <div className={`${wrap} pb-28 pt-8 sm:pt-10 lg:pb-12`}>
                        <div className="flex flex-wrap items-end justify-between gap-3">
                            <div>
                                <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
                                    Your cart
                                    <span className="rounded-full bg-brand-light/10 px-2.5 py-0.5 text-sm font-semibold text-brand">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
                                </h1>
                                <p className="mt-1 text-sm text-slate-500">Review your tests and packages before booking.</p>
                            </div>
                            <Link to="/tests" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light transition hover:text-brand">
                                + Add more tests
                            </Link>
                        </div>

                        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-8">
                            <div className="min-w-0">
                                <ul className="space-y-2.5">
                                    {items.map((item) => {
                                        const Card = cards[item.type]
                                        return <Card key={item.id} item={item} />
                                    })}
                                </ul>
                                <button type="button" className="mt-3 text-sm font-semibold text-slate-400 transition hover:text-red-600">Clear cart</button>
                            </div>

                            <OrderSummary
                                count={items.length}
                                mrp={mrp}
                                subtotal={subtotal}
                                total={total}
                                coupon={coupon}
                                offers={offers} />
                        </div>

                        <HelpBanner
                            title="Need help choosing?"
                            text="Call us and our team will help you pick the right tests, or send your prescription on WhatsApp."
                        />
                    </div>
                </div>
            </section>

            <CartBookBar count={items.length} total={total} />
        </>
    )
}

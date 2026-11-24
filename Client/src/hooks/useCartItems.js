import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { useAllTest } from './useTest.js'
import { useAllPackages } from './usePackage.js'

import { selectCartItems, removeFromCart } from "../features/cart/cartSlice";

const byId = (list = []) => new Map(list.map((x) => [String(x.id), x]))

export function useCartItems() {
    const dispatch = useDispatch()
    const entries = useSelector(selectCartItems)

    const testQ = useAllTest()
    const packageQ = useAllPackages()

    const { items, missing } = useMemo(() => {
        const tests = byId(testQ.data)
        const packages = byId(packageQ.data)

        const items = []
        const missing = []

        for (const entry of entries) {
            const source = entry.type === 'test' ? tests : packages
            const found = source.get(String(entry.id))

            found
                ?
                items.push({ ...found, key: entry.key, type: entry.type })
                :
                missing.push(entry.key)
        }

        return { items, missing }
    }, [entries, testQ.data, packageQ.data])

    const isLoading = testQ.isLoading || packageQ.isLoading
    const isError = testQ.isError || packageQ.isError
    const ready = testQ.isSuccess && packageQ.isSuccess

    useEffect(() => {
        if (ready) missing.forEach((key) => dispatch(removeFromCart(key)))
    }, [ready, missing, dispatch])

    return { items, isLoading, isError }
}


import api from "./api";
import { toPackage } from "./package";

export default function searchTests(q, signal) {
    return api.get('/tests/search', {
        params: { q },
        signal
    })
        .then((res) => res.data.data.tests)
}

export const getAllTests = () => api.get('/tests/all').then((res) => res.data.data.allTests)

export const getPopularTests = (limit) => api.get('/tests/popular', { params: { limit } }).then((res) => res.data.data.popularTests)

// `packages` = the packages that include this test, in the same shape the package pages use
export const getTest = (id) => api.get(`/tests/${id}`).then((res) => {
    const test = res.data.data.test

    return { ...test, packages: test.packageItems.map((item) => toPackage(item.pkg)) }
})
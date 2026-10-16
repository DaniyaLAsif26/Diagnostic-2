import api from "./api";

export default function searchTests(q, signal) {
    return api.get('/tests/search', {
        params: { q },
        signal
    })
        .then((res) => res.data.data.tests)
}

export const getAllTests = () => api.get('/tests/all').then((res) => res.data.data.allTests)

export const getPopularTests = (limit) => api.get('/tests/popular', { params: { limit } }).then((res) => res.data.data.popularTests)

export const getTest = (id) => api.get(`/tests/${id}`).then((res) => res.data.data.test)
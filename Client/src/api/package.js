import api from "./api";

// The server returns join rows (items); the UI works with a flat list of tests.
// New tests have no record yet, so they take the package's category.
export const toPackage = (pkg) => ({
    ...pkg,
    tests: pkg.items.map((item) => ({
        testId: item.testId,
        name: item.test?.name ?? item.testName,
        category: item.test?.category ?? pkg.category,
    })),
})

export const getAllPackages = () => api.get('/packages/all')
    .then((res) => res.data.data.allPackages.map(toPackage))

export const getPackage = (id) => api.get(`/packages/${id}`)
    .then((res) => toPackage(res.data.data.getPackage))

export const getPopularPackages = (limit) => api.get('/packages/popular', { params: { limit } })
    .then((res) => res.data.data.popularPackages.map(toPackage))

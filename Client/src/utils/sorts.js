import { finalPrice } from './price'

// Sort options for the results toolbar - shared by /tests, /packages and /search
const common = {
    popular: { label: 'Most popular', compare: (a, b) => Number(b.isPopular) - Number(a.isPopular) || a.name.localeCompare(b.name) },
    'price-asc': { label: 'Price: low to high', compare: (a, b) => finalPrice(a) - finalPrice(b) },
    'price-desc': { label: 'Price: high to low', compare: (a, b) => finalPrice(b) - finalPrice(a) },
}

export const testSorts = {
    ...common,
    name: { label: 'Name: A to Z', compare: (a, b) => a.name.localeCompare(b.name) },
}

export const packageSorts = {
    ...common,
    'tests-desc': { label: 'Most tests included', compare: (a, b) => b.tests.length - a.tests.length },
}

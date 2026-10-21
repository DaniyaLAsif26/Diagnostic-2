import api from './api'
import { toPackage } from './package'

// Same card shape as the listing pages, so results can reuse TestCard / PackageCard
export const searchAll = (q, { limit = 5, signal } = {}) => api.get('/search', { params: { q, limit }, signal })
    .then((res) => ({ ...res.data.data, packages: res.data.data.packages.map(toPackage) }))
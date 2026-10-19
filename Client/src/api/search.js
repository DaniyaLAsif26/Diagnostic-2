import api from './api'

export const searchAll = (q, { limit = 5, signal } = {}) => api.get('/search', { params: { q, limit }, signal }).then((res) => res.data.data)
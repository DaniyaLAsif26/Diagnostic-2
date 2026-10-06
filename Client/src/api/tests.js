import api from "./api";

export default function searchTests( q, signal ) {
    return api.get('/tests/search', {
        params: { q },
        signal
    })
        .then((res) => res.data.data.tests)
}
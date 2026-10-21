export const testKeys = {
    all: ["tests"],
    list: () => [...testKeys.all, "list"],
    populars: () => [...testKeys.all, "popular"],             // every popular list, any limit
    popular: (limit) => [...testKeys.populars(), limit],
    detail: (id) => [...testKeys.all, "detail", String(id)],  // ids from useParams are strings
    search: (term) => [...testKeys.all, "search", term],
}

export const packageKeys = {
    all: ['packages'],
    list: () => [...packageKeys.all, 'list'],
    detail: (id) => [...packageKeys.all, 'detail', String(id)],
    populars: () => [...packageKeys.all, "popular"],
    popular: (limit) => [...packageKeys.populars(), limit],
}

export const searchKeys = {
    all: ["search"],
    search: (term) => [...searchKeys.all, term],
    searchResults: (term) => [...searchKeys.all, 'searchResults', term]
}
export const testKeys = {
    all: ["tests"],
    list: () => [...testKeys.all, "list"],
    populars: () => [...testKeys.all, "popular"],             // every popular list, any limit
    popular: (limit) => [...testKeys.populars(), limit],
    detail: (id) => [...testKeys.all, "detail", String(id)],  // ids from useParams are strings
    search: (term) => [...testKeys.all, "search", term],
}

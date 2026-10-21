import { useQuery, keepPreviousData } from "@tanstack/react-query";
import useDebounce from "./useDebounce";
import { searchKeys } from "../api/queryKeys";
import { searchAll } from "../api/search";

export const useSearch = (search) => {
    const term = search.trim()
    const debounced = useDebounce(term, 300)

    const { data, isFetching } = useQuery({
        queryKey: searchKeys.search(debounced),
        queryFn: ({ signal }) => searchAll(debounced, { limit: 5, signal }),
        enabled: debounced.length >= 2,
        placeholderData: keepPreviousData,
        staleTime: 60 * 1000,
    })

    return {
        tests: data?.tests ?? [],
        packages: data?.packages ?? [],
        hasQuery: term.length >= 2,
        isSearching: isFetching || term !== debounced,
    }
}

export const useSearchResults = (q) => {
    const term = q.trim()
    const enabled = term.length >= 2

    const { data, isPending , isError } = useQuery({
        queryKey: searchKeys.searchResults(q),
        queryFn: ({ signal }) => searchAll(term, { limit: 50, signal }),
        enabled,
    })

    return {
        tests: data?.tests ?? [],
        packages: data?.packages ?? [],
        isPending: enabled && isPending,
        isError,
    }
}
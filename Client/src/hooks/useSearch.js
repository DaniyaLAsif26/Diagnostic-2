import { useQuery, keepPreviousData } from "@tanstack/react-query";
import useDebounce from "./useDebounce";
import { searchKeys } from "../api/queryKeys";
import { searchAll } from "../api/search";

export default function useSearch(search) {
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
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import useDebounce from "./useDebounce";
import searchTests from "../api/tests";
import { testKeys } from "../api/queryKeys";

export default function useTestSearch(search) {

    const term = search.trim()
    const debounced = useDebounce(term, 400)

    const { data: results = [], isPending, isError, isFetching, error } = useQuery({
        queryKey: testKeys.search(debounced),
        queryFn: ({ signal }) => searchTests(debounced, signal),
        enabled: debounced.length >= 2,
        placeholderData: keepPreviousData
    })

    return {
        results,
        isSearching: isFetching || term !== debounced,
        showResults: term.length >= 2 && debounced.length >= 2
    }
}
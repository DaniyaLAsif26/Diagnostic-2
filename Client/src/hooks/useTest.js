import { useQuery } from "@tanstack/react-query";
import { testKeys } from "../api/queryKeys";
import { getAllTests } from "../api/tests";
import { getPopularTests } from "../api/tests";
import { getTest } from "../api/tests";

export const useAllTest = () => useQuery({
    queryKey: testKeys.list(),
    queryFn: getAllTests
})

export const usePopularTests = (limit = 3) => useQuery({
    queryKey: testKeys.popular(limit),
    queryFn: () => getPopularTests(limit)
})

export const useTest = (id) => useQuery({
    queryKey: testKeys.detail(id),
    queryFn: () => getTest(id)
})
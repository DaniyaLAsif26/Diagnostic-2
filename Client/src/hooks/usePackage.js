import { useQuery } from "@tanstack/react-query";
import { packageKeys } from "../api/queryKeys";
import { getAllPackages, getPackage, getPopularPackages } from "../api/package";

export const useAllPackages = () => useQuery({
    queryKey: packageKeys.list(),
    queryFn: getAllPackages
})

export const usePackage = (id) => useQuery({
    queryKey: packageKeys.detail(id),
    queryFn: () => getPackage(id)
})

export const usePopularPackage = (limit = 4) => useQuery({
    queryKey: packageKeys.popular(limit),
    queryFn: () => getPopularPackages(limit)
})

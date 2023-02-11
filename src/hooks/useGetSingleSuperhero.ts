import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { apiClient } from "../App"

// 👁️ RQ automatically passes it's queryKey to it's fetcher function
type QueryKey_TP = [string, string]
const fetchSuperhero = async <Data_TP>({ queryKey }: { queryKey: QueryKey_TP }): Promise<Data_TP[]> => {
    const heroId = queryKey[1]
    const res = await apiClient.get(`/superheroes/${heroId}`)
    return res.data
}
export const useGetSingleSuperhero = <Data_TP>(heroId: string) => {
    return useQuery<Data_TP, Error>(['hero', heroId] as QueryKey_TP, <UseQueryOptions<Data_TP, Error, Data_TP, QueryKey>>fetchSuperhero)
}

// Not best way but it is okay, see => 👁️⬆️

// const fetchSuperhero = async <Data_TP>(heroId: string): Promise<Data_TP[]> => {
//     const res = await apiClient.get(`/superheroes/${heroId}`)
//     return res.data
// }
// export const useGetSingleSuperhero = <Data_TP>(heroId: string) => {
//     return useQuery<Data_TP, Error>(['hero', heroId], () => <Data_TP>fetchSuperhero(heroId))
// }
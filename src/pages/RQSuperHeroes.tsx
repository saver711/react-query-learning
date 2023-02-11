/////////// IMPORTS
///
import { Helmet } from "react-helmet-async"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { apiClient } from "../App"
///
/////////// Types
///

type RQSuperHeroesProps_TP = {
  title: string
}
export type Hero_TP = {
  name: string
  id: string
  alterEgo: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const RQSuperHeroes = ({ title }: RQSuperHeroesProps_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  const { isLoading, isSuccess, isError, data, error, refetch, isFetching } =
    useQuery<Hero_TP[], Error>(["super-heroes"], fetchSuperheroes, {
      cacheTime: 10000, // def: 5min // how long data is cached
      staleTime: 6500, // def: 0    // don't refetch for how long? because the cached data is enough for this period of time
      refetchOnMount: false, //'always'=> refetch irrespective of data is stale or not //def: true => if data is stale
      refetchOnWindowFocus: false, //'always'=> refetch irrespective of data is stale or not //def: true => if data is stale
      // refetchInterval, //def: false // number
      // refetchIntervalInBackground, // when tab is blurred //def: false
      // enabled, //def: false --> true + (refetch) => fetch manually
      onSuccess: (data) => console.log("Success", data),
      onError: (err) => console.log("Failed", err),
      // select: (data)=> data.map(hero=> hero.name), //transform coming data //⚠️type err
      // networkMode,
      // initialData,
      // initialDataUpdatedAt,
      // keepPreviousData,
      // meta,
      // notifyOnChangeProps,
      // onSettled,
      // placeholderData,
      // queryKeyHashFn,
      // refetchOnReconnect,
      // retry,
      // retryOnMount,
      // retryDelay,
      // structuralSharing,
      // suspense,
      // useErrorBoundary,
    })
  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  ///////////
  ///

  ///
  /////////// EVENTS || IF CASES || FUNCTIONS
  ///
  async function fetchSuperheroes(): Promise<Hero_TP[]> {
    const res = await apiClient.get<Hero_TP[]>("/superheroes")
    return res.data
  }
  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isLoading ? (
        <h1>LOADING...</h1>
      ) : (
        data?.map((hero) => (
          <h4 key={hero.id}>
            <Link to={`/rq-superheroes/${hero.id}`}>{hero.name}</Link>
          </h4>
        ))
      )}

      {isError && <h3>{error.message}</h3>}
    </>
  )
}

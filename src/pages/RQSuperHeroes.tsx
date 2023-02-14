/////////// IMPORTS
///
import { Helmet } from "react-helmet-async"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { apiClient } from "../App"
import { useState } from "react"
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

  const {
    isLoading,
    isSuccess,
    isError,
    data,
    error,
    refetch: refetchSuperheroes,
    isFetching,
  } = useQuery<Hero_TP[], Error>(["super-heroes"], fetchSuperheroes, {
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

  const queryClient = useQueryClient()
  // mutation (POST | PUT | ....)
  const {
    data: postData,
    error: postError,
    isError: isErrorPost,
    isIdle,
    isLoading: isLoadingPost,
    isPaused,
    isSuccess: isSuccessPost,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
  } = useMutation({
    mutationFn: postSuperhero,
    onSuccess:
      // different ways to update the superheroes list
      // refetch => waste of network call ⚠️
      // ()=>refetchSuperheroes()
      // refetch => waste of network call ⚠️
      // waste of network call ⚠️
      // () => queryClient.invalidateQueries(["super-heroes"])
      // update query cache without network calls
      ({ data }) =>
        queryClient.setQueryData(["super-heroes"], (oldQueryData: any) => [
          ...oldQueryData,
          data,
        ]),
    // cacheTime,
    // mutationKey,
    // networkMode,
    // onError,
    // onMutate,
    // onSettled,
    // retry,
    // retryDelay,
    // useErrorBoundary,
    // meta,
  })
  console.log(`RQSuperHeroes ~ postData`, postData)

  // mutate(variables, {
  //   onError,
  //   onSettled,
  //   onSuccess,
  // })

  // const { mutate } = useMutation({
  //   mutationFn: (hero) => {
  //     return apiClient.post("/superheroes", hero)
  //   },
  // })
  ///
  /////////// STATES
  ///
  const [name, setName] = useState("")
  const [alterEgo, setAlterEgo] = useState("")
  ///
  /////////// SIDE EFFECTS
  ///

  ///
  ///////////
  ///
  console.log("data", data)

  ///
  /////////// EVENTS || IF CASES || FUNCTIONS
  ///
  async function fetchSuperheroes(): Promise<Hero_TP[]> {
    const res = await apiClient.get<Hero_TP[]>("/superheroes")
    return res.data
  }

  // this is here just to call mutate function
  const addSuperheroHandler = () => {
    const hero = { name, alterEgo }
    mutate(hero)
  }

  function postSuperhero(hero: { name: string; alterEgo: string }) {
    return apiClient.post("/superheroes", hero)
  }

  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <h2>Add superhero</h2>
      <div>
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="alterEgo">alterEgo</label>
        <input
          type="text"
          id="alterEgo"
          onChange={(e) => setAlterEgo(e.target.value)}
        />
      </div>

      <button title="add superhero" onClick={addSuperheroHandler}>
        Add Superhero
      </button>
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

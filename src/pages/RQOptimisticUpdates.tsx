/////////// IMPORTS
///
import { Helmet } from "react-helmet-async"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { apiClient } from "../App"
import { useState } from "react"
import { Hero_TP } from "./RQSuperHeroes"
///
/////////// Types
///
type RQOptimisticUpdatesProps_TP = {
  title: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const RQOptimisticUpdates = ({ title }: RQOptimisticUpdatesProps_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
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
    // onMutate is fired before mutationFn and receives the same args that mutationFn receives
    onMutate: async (newHero) => {
      // cancelQueries => cancel outgoing fetches so they don't overwrite optimistic updates
      await queryClient.cancelQueries(["super-heroes"])
      const prevHeroData: Hero_TP[] | undefined = queryClient.getQueryData(["super-heroes"])

      queryClient.setQueryData(["super-heroes"], (oldQueryData: any) => {
        return [...oldQueryData, { id: oldQueryData?.length + 1, ...newHero }]
      })

      return { prevHeroData }
    },

    onError: (_error, _newHero, context) => {
      queryClient.setQueryData(["super-heroes"], context?.prevHeroData)
    },
    // onSettled => if successful || if error, so in either way we need to fetch the data
    onSettled: () => queryClient.invalidateQueries(["super-heroes"]),
    // cacheTime,
    // mutationKey,
    // networkMode,
    // retry,
    // retryDelay,
    // useErrorBoundary,
    // meta,
  })
  ///
  /////////// STATES
  ///
  const [name, setName] = useState("")
  const [alterEgo, setAlterEgo] = useState("")
  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
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
    </>
  )
}

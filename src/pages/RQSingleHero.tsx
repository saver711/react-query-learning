/////////// IMPORTS
///
//import classes from './RQSingleHero.module.css'
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { useGetSingleSuperhero } from "../hooks/useGetSingleSuperhero"
import { Hero_TP } from "./RQSuperHeroes"
///
/////////// Types
///
type RQSingleHeroProps_TP = {
  title: string
}

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const RQSingleHero = ({ title }: RQSingleHeroProps_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const { heroId } = useParams()

  const { isLoading, data, isError, error } = useGetSingleSuperhero<Hero_TP>(
    heroId!
  )
  ///
  /////////// STATES
  ///
 

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  if (isLoading) <h2>Loading..</h2>
  if (isError) <h2>{error.message}</h2>
  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {data && (
        <>
          <h2>{data.name}</h2>
          <h3>{data.alterEgo}</h3>
        </>
      )}
    </>
  )
}

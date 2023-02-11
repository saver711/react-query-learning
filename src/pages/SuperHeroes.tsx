/////////// IMPORTS
///
//import classes from './SuperHeroes.module.css'
import { useEffect, useState } from "react"
///
/////////// Types
///
type SuperHeroesProps_TP = {
  title: string
}

type Hero_TP = {
  name: string
  id: number
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const SuperHeroes = ({ title }: SuperHeroesProps_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///
  const [loading, setLoading] = useState(true)
  const [heroes, setHeroes] = useState<Hero_TP[]>([])
  ///     
  /////////// SIDE EFFECTS
  ///
  useEffect(() => {
    try {
      (async function getHeroes() {
      const res = await fetch("http://localhost:4000/superheroes")
      const heroes = await res.json()

      setHeroes(heroes)
      setLoading(false)
    })()
    } catch (error) {
      setLoading(false)
    }
    
  }, [])
  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///

  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <>
      {loading ? (
        <h1>LOADING...</h1>
      ) : (
        heroes.map((hero) => <h4 key={hero.id}>{hero.name}</h4>)
      )}
    </>
  )
}

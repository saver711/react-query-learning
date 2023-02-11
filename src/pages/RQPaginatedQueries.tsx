/////////// IMPORTS
///
//import classes from './RQParallel.module.css'
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { apiClient } from "../App"
///
/////////// Types
///
type RQPaginatedQueriesProps_TP = {
  title: string
}

type Color_TP = {
  id: number
  label: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const RQPaginatedQueries = ({ title }: RQPaginatedQueriesProps_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  ///
  /////////// STATES
  ///
  const [pageNumber, setPageNumber] = useState(+localStorage.pageNumber as number||1)
  const { data: colors, isFetching } = useQuery<Color_TP[]>(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true
    }
  )
  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  async function fetchColors(pageNumber: number): Promise<Color_TP[]> {
    const res = await apiClient.get(`/colors?_limit=2&_page=${pageNumber}`)
    return res.data
  }

  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <h2>Paginated Queries</h2>
      <div>
        <button
          disabled={pageNumber === 1 || isFetching}
          onClick={() => setPageNumber((prev) => {
            localStorage.pageNumber = prev - 1
            return prev - 1})}
        >
          Previous
        </button>
        <button
          disabled={pageNumber === 3 || isFetching}
          onClick={() => setPageNumber((prev) => {
            localStorage.pageNumber = prev + 1
            return prev + 1
          })}
        >
          Next
        </button>
      </div>

      {colors && (
        <ul>
          {colors.map((color) => (
            <li key={color.id}>
              {color.id}. {color.label}
            </li>
          ))}
        </ul>
      )}

      {isFetching && "is fetching"}
    </>
  )
}

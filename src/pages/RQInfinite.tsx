/////////// IMPORTS
///
import { useInfiniteQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { apiClient } from "../App"
///
/////////// Types
///
type RQInfiniteProps_TP = {
  title: string
}

type Color_TP = {
  label: string
  id: number
}

/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const RQInfinite = ({ title }: RQInfiniteProps_TP) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const { isLoading, isError, data, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery<Color_TP[], Error>({
      queryKey: ["colors"],
      queryFn: fetchColors,
      getNextPageParam: (lastPage, allPages) => {
        //4 => عندي 8 الوان كل مره بجيب 2
        //المفروض اللوجك يكون داينامك عن كدا
        if (allPages.length >= 4) {
          return undefined
        }

        return allPages.length + 1
      },
    })
  ///
  /////////// STATES
  ///
  console.log(`RQInfinite ~ data`, data)

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///
  async function fetchColors({ pageParam = 1 }) {
    const res = await apiClient.get(`/colors?_limit=2&_page=${pageParam}`)
    return res.data
  }
  ///
  if (isLoading) <h2>Loading..</h2>
  if (isError) <h2>{error.message}</h2>
  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {data &&
        data.pages.map((group, i) => (
          <ul key={i}>
            {group.map((color) => (
              <li key={color.id}>{color.label}</li>
            ))}
          </ul>
        ))}

      <button
        onClick={() => fetchNextPage()}
        title="load more"
        disabled={!hasNextPage}
      >
        Load more
      </button>
    </>
  )
}

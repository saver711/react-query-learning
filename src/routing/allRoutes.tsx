import { createBrowserRouter } from "react-router-dom"
import { ErrorPage } from "./ErrorPage"
import { Root } from "./Root"
import { SuperHeroes } from "../pages/SuperHeroes"
import { Home } from "../pages/Home"
import { RQSuperHeroes } from "../pages/RQSuperHeroes"
import { RQSingleHero } from "../pages/RQSingleHero"
import { RQDependentQueries } from "../pages/RQDependentQueries"
import { RQPaginatedQueries } from "../pages/RQPaginatedQueries"
import { RQInfinite } from "../pages/RQInfinite"
import { RQOptimisticUpdates } from "../pages/RQOptimisticUpdates"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <Home title="Home" />,
      },
      {
        path: "/superheroes",
        element: <SuperHeroes title="SuperHeroes" />,
      },
      {
        path: "/rq-superheroes",
        element: <RQSuperHeroes title="RQ SuperHeroes" />,
      },
      {
        path: "/rq-superheroes/:heroId",
        element: <RQSingleHero title="RQ SuperHeroes" />,
      },
      {
        path: "/rq-dependent-queries",
        element: (
          <RQDependentQueries
            email="zoomgoo711@gmail.com"
            title="RQ DependentQueries"
          />
        ),
      },
      {
        path: "/rq-paginated",
        element: <RQPaginatedQueries title="RQ PaginatedQueries" />,
      },
      {
        path: "/rq-infinite",
        element: <RQInfinite title="RQ infinite" />,
      },
      {
        path: "/optimistic-updates",
        element: <RQOptimisticUpdates title="RQ optimistic updates" />,
      },
    ],
  },
])

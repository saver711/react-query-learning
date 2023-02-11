import { Link, useRouteError } from "react-router-dom"

type Error_TP = {
  statusText: string
  message: string
}
export const ErrorPage = () => {
  const error = useRouteError() as Error_TP
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>

      <Link to="/">HOME</Link>
    </div>
  )
}

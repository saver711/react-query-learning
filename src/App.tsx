import { QueryClient } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"
import { router } from "./routing/allRoutes"
import axios from "axios"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export const queryClient = new QueryClient()

export const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-type": "application/json",
  },
})

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} position={"bottom-right"} />
    </div>
  )
}

export default App

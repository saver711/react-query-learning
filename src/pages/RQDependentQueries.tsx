/////////// IMPORTS
///
//import classes from './RQParallel.module.css'
import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { apiClient } from "../App"
///
/////////// Types
///
type RQDependentQueries = {
  title: string
  email: string
}
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const RQDependentQueries = ({ title, email }: RQDependentQueries) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const { data: user, isFetched: isFetchedUser } = useQuery(
    ["user", email],
    () => fetchUserByEmail(email)
  )
  const { data: channel } = useQuery(
    ["channel", user?.channelId],
    () => fetchChannel(user?.channelId),
    {
      enabled: isFetchedUser,
    }
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
  async function fetchUserByEmail(email: string) {
    const res = await apiClient.get(`/users/${email}`)
    return res.data
  }
  async function fetchChannel(channelId: string) {
    const res = await apiClient.get(`/channels/${channelId}`)
    return res.data
  }
  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <h2>DependentQueries</h2>

      {channel && (
        <ul>
          {channel.courses.map((course: string) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      )}
    </>
  )
}

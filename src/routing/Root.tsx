import { Outlet, NavLink } from "react-router-dom"

export const Root = () => {
  const navItems = [
    {
      to: "/",
      title: "home",
    },
    {
      to: "/superheroes",
      title: "superheroes",
    },
    {
      to: "/rq-superheroes",
      title: "RQ Superheroes",
    },
    {
      to: "/rq-dependent-queries",
      title: "RQ dependent queries",
    },
    {
      to: "/rq-paginated",
      title: "RQ Paginated",
    },
  ]

  return (
    <>
      <nav>
        <ul>
          {navItems.map(({ to, title }) => (
            <li key={title}>
              <NavLink
                to={to}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        {/*Where the children will be rendered*/}
        <Outlet />
      </main>
    </>
  )
}

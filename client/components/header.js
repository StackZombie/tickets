import Link from "next/link"
export default  ({currentUser}) =>{
  const links = [
    !currentUser && {label:"Sign Up", href:"/auth/signup"},
    !currentUser && {label:"Sign In", href:"/auth/signin"},
     currentUser && {label:"Log Out", href:"/auth/logout"},
  ].filter(linkConfig => linkConfig)
  .map(({label,href})=>{
    return <Link className="nav-item" key={href}><a className="nav-link">
      {label}
      </a></Link>
  })
  return <nav className="navbar navbar-light bg-light">
    <Link href="/">
      <a className="navbar-brand" href="/">Tickets</a>
    </Link>
    <div className="d-flex justify-content-end">
      <ul className="nav d-flex align-items-center">
        {links}
      </ul>
    </div>
  </nav>
}
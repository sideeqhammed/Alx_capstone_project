import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="flex text-black justify-between p-5">
      <h1>Book LiBrary</h1>
      <ul className="flex">
        <li className="mr-5"><Link to={'/'}>Search</Link></li>
        <li className="mr-5"><a>Favourites</a></li>
        <li className="mr-5"><a>Contact Us</a></li>
      </ul>
    </div>
  )
}

export default Header
import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="flex flex-wrap md:flex-nowrap text-black justify-between py-5 px-15 text-center items-center">
      <h1><Link to={'/'}>Book LiBrary</Link></h1>
      <ul className="flex ">
        {/* <li className="mr-5 text-blue-500"><Link to={'/'}>Search</Link></li> */}
        {/* <li className="mr-5"><a>Favourites</a></li> */}
        <li className="mr-5"><a>Contact Us</a></li>
      </ul>
    </div>
  )
}

export default Header
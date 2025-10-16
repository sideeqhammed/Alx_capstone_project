import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <h1 className="
          text-amber-600 flex items-center transition-colors hover:text-amber-700"><Link to={'/'}>Book LiBrary</Link></h1>
      <ul className="flex ">
        {/* <li className="mr-5 text-blue-500"><Link to={'/'}>Search</Link></li> */}
        {/* <li className="mr-5"><a>Favourites</a></li> */}
        <li className="mr-5"><Link to={'/contact_us'} className="text-base text-gray-700 hover:text-amber-500 transition-colors duration-200 cursor-pointer ">Contact Us</Link></li>
      </ul>
    </div>
  )
}

export default Header
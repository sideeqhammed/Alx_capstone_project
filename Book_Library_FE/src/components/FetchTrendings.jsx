import { useEffect, useState } from "react"
import axios from "axios"
import LoadingIndicator from "./Loading"
import { Link } from "react-router-dom"

function Trendings() {

  const [trendings, setTrendings] = useState([])
  const [loading, setLoading] = useState(false)

  

  useEffect(() => {
    const fetchTrendings = async() => {
      try {
        setLoading(true)
        const response = await axios.get(`https://openlibrary.org/trending/now.json?limit=20`)
        console.log(response.data)
        setTrendings(response.data.works)
      } catch(err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTrendings()
  }, [])
  
  return(
    <div className="text-center p-4 sm:p-8 bg-gray-50 min-h-screen">
      <hr className="border-amber-400"/>
      <h1 className="text-3xl font-extrabold my-8 text-amber-700 tracking-wide">Trending Books</h1>
      
      {loading ? <LoadingIndicator /> : 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center">
          {console.log(trendings)}
          {trendings ? 
            trendings.map((trending, index) => (
              <div 
                key={index}
                className="flex flex-col items-center bg-amber-50 border border-amber-200 p-4 rounded-xl shadow-xl 
                transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02] w-full max-w-xs"
              >
                {console.log(trending)}
                <Link to={`/book/${trending.key.split('/').pop()}`}>
                  <img src={`https://covers.openlibrary.org/b/id/${trending.cover_i}-M.jpg`} 
                    alt={`Cover of:${trending.title}`} 
                    onError={(e) => (e.target.src = 'https://dreieck.com/en/wp-content/uploads/sites/2/2023/03/opened-book-06-adding-another-outline-850x638.png')}
                    className="w-full h-80 object-cover rounded-lg shadow-md mb-4 mx-auto"
                  />
                </Link>
                <div className="text-center w-full mt-3">
                <Link to={`/book/${trending.key.split('/').pop()}`}><p 
                  className="text-lg font-semibold mb-1 text-gray-800 hover:text-amber-700 hover:underline transition-colors">{trending.title}</p>
                </Link>
                <p className="text-sm text-gray-500">by</p>
                <p className="font-semibold text-sm text-gray-700">{trending.author_name}</p>
                {/* <p>First publised in - {trending.first_publish_year}</p> */}
                <p></p>
                </div>
              </div>
            )) : <p className="text-lg text-gray-600 mt-10">No trending books found.</p>
          }
        </div>
      }
    </div>
  )
}

export default Trendings
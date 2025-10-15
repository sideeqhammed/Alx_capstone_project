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
    <div className="text-center">
      <hr />
      <h1 className="my-10">Trendings</h1>
      
      {loading ? <LoadingIndicator /> : 
        <div className="flex flex-wrap justify-center">
          {console.log(trendings)}
          {trendings ? 
            trendings.map((trending, index) => (
              <div 
                key={index}
                className="bg-amber-100 my-5 mx-10 p-2 w-50 rounded-2xl"
              >
                {console.log(trending)}
                <Link to={`/book/${trending.key.split('/').pop()}`}>
                  <img src={`https://covers.openlibrary.org/b/id/${trending.cover_i}-M.jpg`} 
                    alt={`Cover of:${trending.title}`} 
                    onError={(e) => (e.target.src = 'https://dreieck.com/en/wp-content/uploads/sites/2/2023/03/opened-book-06-adding-another-outline-850x638.png')}
                    className="mr-3 mb-2 mx-auto h-60 rounded-lg"
                  />
                </Link>
                <div>
                <Link to={`/book/${trending.key.split('/').pop()}`}><p className="font-bold">{trending.title}</p></Link>
                <p>by</p>
                <Link to={`/book/${trending.key.split('/').pop()}`}><p>{trending.author_name}</p></Link>
                {/* <p>First publised in - {trending.first_publish_year}</p> */}
                <p></p>
                </div>
              </div>
            )) : ''
          }
        </div>
      }
    </div>
  )
}

export default Trendings
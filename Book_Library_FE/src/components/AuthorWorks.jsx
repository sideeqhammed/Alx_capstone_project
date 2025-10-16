import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LoadingIndicator from "./Loading"
import { Link } from "react-router-dom"

function AuthorWorks() {

  const { id } = useParams()
  const [authorWorks, setAuthorWorks] = useState([])
  const [authorName, setAuthorName] = useState('')
  // const [book, setBook] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorks = async() => {
      try {
        const response = await axios.get(`https://openlibrary.org/authors/${id}/works.json`)
        setAuthorWorks(response.data.entries)
        const entries = response.data.entries

        const authorRes = await axios.get(`https://openlibrary.org/authors/${id}.json`)
        setAuthorName(authorRes.data.name)

        const detailedRes = await Promise.all(
          entries.map(async(entry) => {
            const bookKey = entry.key.split('/').pop()
            const bookRes = await axios.get(`https://openlibrary.org/works/${bookKey}.json`)
            const coverKey = bookRes.data.covers?.[0]
            const coverUrl = coverKey ?
              `https://covers.openlibrary.org/b/id/${coverKey}-M.jpg` :
              'https://dreieck.com/en/wp-content/uploads/sites/2/2023/03/opened-book-06-adding-another-outline-850x638.png'

            return (
             { ...entry, coverUrl }
            )
          })
        )
        setAuthorWorks(detailedRes)

      } catch(err) {
        // console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchWorks()
  }, [id])
  return(
    <div className="bg-white text-black">
      {loading ? 
        <LoadingIndicator /> :
        <div>
          <h1>Works by {authorName}</h1>
          {authorWorks ?
            authorWorks.map((authorWork, index) => {
              const fetchBook = async() => {
                const book = await axios.get(`https://openlibrary.org/works/${authorWork.key}.json`)
              }
              return(
                <div key = {index} className="bg-amber-100 my-5 mx-10 p-2 w-60 rounded-2xl">
                  <Link to={`/book/${authorWork.key.split('/').pop()}`}>
                    <img src={coverUrl} 
                      alt={`Cover of:${authorWork.title}`} 
                      onError={(e) => (e.target.src = 'https://dreieck.com/en/wp-content/uploads/sites/2/2023/03/opened-book-06-adding-another-outline-850x638.png')}
                      className="mr-3 mb-2 mx-auto h-60 rounded-lg "
                    />
                  </Link>
                  <h2>{authorWork.title}</h2>
                
                </div>
              )
            }) :
            <h2>Sorry could not find any work by {authorName}</h2>
          }
        </div>
      }
      {/* {console.log(authorWorks)} */}
      

    </div>

  )
}

export default AuthorWorks
import axios from "axios"
import { use, useEffect, useState } from "react"
import { useParams } from "react-router"
import LoadingIndicator from "./Loading"

function BookDetail() {

  const { id } = useParams()
  const [book, setBook] = useState({})
  const [authorName, setAuthorName] = useState('')
  const [pages, setPages] = useState('')
  const [loading, setLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const subjects  = book.subjects ?
    book.subjects.join(', ') : ''


  useEffect(() => {
    const fetchBook = async() => {
      try {
        const response = await axios.get(`https://openlibrary.org/works/${id}.json`)
        setBook(response.data)

        if(response.data.authors?.length > 0) {
          const authorKey = response.data.authors[0].author.key
          const authorRes = await axios.get(`https://openlibrary.org${authorKey}.json`)
          setAuthorName(authorRes.data.name)
        }

        const editionsResponse = await axios.get(`https://openlibrary.org/works/${id}/editions.json`)
        const editions = editionsResponse.data.entries
        if (editions.length > 0) {
          const firstEdition = editions[0]
          setPages(firstEdition.number_of_pages)
          console.log(firstEdition.number_of_pages)
}
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [id])

  const limit = 150
  const displaySubjects = isExpanded ?
    subjects + '. ' :
    subjects.slice(0, limit) + ' ... '

  return(
    <div className="bg-white m-10 p-10 rounded-lg">
      {loading ? <LoadingIndicator /> : 
        book ? 
          <div className=" flex flex-wrap md:flex-nowrap ">
            <img src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-M.jpg`} 
              alt={`Cover of:${book.title}`} 
              onError={(e) => (e.target.src = 'https://dreieck.com/en/wp-content/uploads/sites/2/2023/03/opened-book-06-adding-another-outline-850x638.png')}
              className="min-w-50 max-h-72 mr-10 mb-10 hover:scale-110 duration-500 ease-in-out rounded-lg"
            />

            <div className="text-black p-5 px-5">
              {console.log(book, book.covers, book.authors[0].author.key)}
              <h1 className="text-3xl mb-3">{book.title}</h1>

              <h2 className="text-xl mb-5">by {authorName}</h2>
              
              <p className="font-bold">Work Description:</p>
              <p className="mb-3">{typeof book.description === 'string' ?
                book.description.split('(').shift() :
                book.description?.value.split('(').shift() || 'No description available.'
              }</p>

              <h3 className="font-bold">Publish Date: {book.created?.value?.split('-').shift()}</h3>

              <h3 className="mt-3 font-bold">Pages: {pages}</h3>

              {/* <h3><span className="font-bold">Current Edition:</span> {book.revision}</h3> */}

              <h3 className="font-bold mt-5">Subjects:</h3>
              <p className="inline">{displaySubjects}</p>
              <button 
                onClick={(e) => {setIsExpanded(!isExpanded)}}
                className="hover:underline hover:text-blue-500"> See more/less
              </button>

            </div>
          </div>
        : ''
      }
    </div>
  )
}

export default BookDetail
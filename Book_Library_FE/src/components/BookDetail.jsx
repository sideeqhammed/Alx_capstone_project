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
          // console.log(firstEdition.number_of_pages)
}
      } catch (err) {
        // console.log(err)
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
    <div className="bg-gray-50 min-h-screen p-4 sm:p-10 mx-auto rounded-lg ">
      {loading ? <LoadingIndicator /> : 
        book ? 
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="w-full sm:w-auto flex justify-center">
              <img src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-M.jpg`} 
                alt={`Cover of:${book.title}`} 
                onError={(e) => (e.target.src = 'https://dreieck.com/en/wp-content/uploads/sites/2/2023/03/opened-book-06-adding-another-outline-850x638.png')}
                className="w-full h-auto max-h-[400px] min-w-[200px] max-w-[250px] shadow-xl 
                transition-transform duration-500 ease-in-out hover:scale-[1.03] rounded-lg"
              />
            </div>

            <div className="text-black p-5 px-5">
              {/* {console.log(book, book.covers, book.authors[0].author.key)} */}
              <h1 className="text-4xl font-extrabold mb-2">{book.title}</h1>

              <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-3 border-amber-100">by {authorName}</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 mb-8 text-sm">
                <div className="flex flex-col">
                    <span className="font-bold text-gray-800">Pages:</span>
                    <span>{pages}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800">Date Added:</span>
                    <span>{book.created?.value?.split('T').shift() || 'N/A'}</span>
                  </div>
              </div>

              <p className="font-bold text-lg mb-2 text-gray-800">Description:</p>
              <p className="mb-3">{typeof book.description === 'string' ?
                book.description.split('(').shift() :
                book.description?.value.split('(').shift() || 'No description available.'
              }</p>

              {/* <h3><span className="font-bold">Current Edition:</span> {book.revision}</h3> */}

              <h3 className="font-bold text-lg mt-5 mb-2 text-gray-800">Subjects:</h3>
              <p className="inline">{displaySubjects}</p>
              <button 
                onClick={(e) => {setIsExpanded(!isExpanded)}}
                className="hover:underline hover:text-blue-500"> See more/less
              </button>

            </div>
          </div>
        : <p className="text-lg text-red-500 text-center">Book details could not be loaded.</p>
      }
    </div>
  )
}

export default BookDetail
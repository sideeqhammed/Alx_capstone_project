import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

function BookDetail() {

  const { id } = useParams()
  const [book, setBook] = useState({})
  // const [subjects, setSubjects] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const subjects  = book.subjects ?
    book.subjects.join(', ') : ''


  useEffect(() => {
    const fetchBook = async() => {
      const response = await axios.get(`https://openlibrary.org/works/${id}.json`)
      setBook(response.data)
      // setSubjects(response.data?.subjects)
    }
    fetchBook()
  }, [id])

  const limit = 150
  const displaySubjects = isExpanded ?
    subjects + ' ' :
    subjects.slice(0, limit) + ' ... '

  return(
    <div className="bg-white m-10 p-10">
      {book ? 
        <div className=" flex flex-wrap md:flex-nowrap ">
          <img src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-M.jpg`} 
            alt={`Cover of:${book.title}`} 
            onError={(e) => (e.target.src = 'https://dreieck.com/en/wp-content/uploads/sites/2/2023/03/opened-book-06-adding-another-outline-850x638.png')}
            className="min-w-50 max-h-72 mr-10 mb-10 hover:scale-110 duration-500 ease-in-out"
          />
          <div className="text-black p-5 px-5">
            {console.log(book, book.covers)}
            <h1 className="text-3xl mb-5">{book.title}</h1>
            
            <p className="font-bold">Work Description:</p>
            <p className="mb-3">{typeof book.description === 'string' ?
              book.description.split('(').shift() :
              book.description?.value.split('(').shift()
            }</p>
            <h3 className="font-bold "><span className="font-bold">Edition:</span> {book.revision}</h3>
            <h3 className="font-bold mt-5">Subjects:</h3>
            <p className="inline">{displaySubjects}</p>
            <button 
              onClick={(e) => {!isExpanded ? setIsExpanded(true) : setIsExpanded(false)}} 
              className="hover:underline hover:text-blue-500"> See more/less
            </button>
          </div>
        </div>
        : 'Loading...'
      }

    </div>
  )
}

export default BookDetail
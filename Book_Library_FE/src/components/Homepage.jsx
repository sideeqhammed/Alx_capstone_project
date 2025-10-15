import { useState } from "react"
import SearchBook from "./SearchResult"
import LoadingIndicator from "./Loading"
import Recoomendations from "./FetchTrendings"
import { Link } from "react-router"
import Trendings from "./FetchTrendings"

function Homepage() {
  const [bookName, setBookName] = useState('')
  const [books, setBooks] = useState([])
  const [searchOption, setSearchOption] = useState('title')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const search = async (e) => {
    e.preventDefault()
    setLoading(true)
    setBooks([])
    setError('')
    try {
      const trimBookName = bookName.trim()
      if (!trimBookName) {
        setError('Please enter a book title')
        setLoading(false)
        return
      } else {
        const result = await SearchBook(searchOption, bookName)
        setBooks(result)
      }
    } catch(error) {
      setError('Sorry, couldn,t find any book that')
    } finally {
      setLoading(false)
    }
  }


  return(
    <div className="bg-amber-50 text-center text-black p-10 mx-10 rounded-lg">
      <h1 className="font-bold">Book Library</h1>
      <form onSubmit={search} className="mb-50">
        <div className="block mt-5">
          <label>Search using: </label>
          <select name='search_option' value={searchOption} onChange={(e) => setSearchOption(e.target.value)} className="border-2 rounded-sm">
            <option value='title'>Book Title</option>
            <option value='author'>Author</option>
            <option value='first_publish_year'>First publish year</option>
          </select>
        </div>
        <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} placeholder={`Search ${searchOption.replace(/_/g, ' ')}`}
          className="border-2 p-2 mt-5 rounded-sm"
        />
        <button type="submit" className="border-2 m-3 px-3 py-2 bg-amber-200 rounded-md">Search</button>
      </form>
      
      {loading ? <LoadingIndicator /> : ''}

      {books && books.length > 0 ? 
        books.map((book, index) => (
          <div 
            key={index}
            className="bg-amber-100 my-5 mx-10 p-4 text-left flex flex-wrap md:flex-nowrap md:w-3/4"
          >
            <Link to={`/book/${book.key.split('/').pop()}`}>
              <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} 
                alt={`Cover of:${book.title}`} 
                onError={(e) => (e.target.src = 'https://dreieck.com/en/wp-content/uploads/sites/2/2023/03/opened-book-06-adding-another-outline-850x638.png')}
                className="w-30 mr-3 mb-2"
              />
            </Link>
            <div>
            <Link to={`/book/${book.key.split('/').pop()}`}><p>{book.title}</p></Link>
            <Link to={`/book/${book.key.split('/').pop()}`}><p>by {book.author_name}</p></Link>
            <p>First publised in - {book.first_publish_year}</p>
            <p></p>
            </div>
          </div>
        )) 
        : <Trendings />
      } 

      {error ? <p className="text-red-600">{error}</p> : ''}
    </div>
  )
}

export default Homepage
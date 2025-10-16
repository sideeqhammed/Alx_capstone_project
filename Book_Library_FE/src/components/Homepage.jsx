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
    <div className="bg-gray-50 min-h-screen text-black text-center p-5 sm:p-10  rounded-xl shadow-2xl">
      <h1 className="text-4xl font-extrabold mb-8 text-amber-700">Book Library</h1>
      <form onSubmit={search} className="mb-12 bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto border border-amber-200">
        <div className="flex items-center justify-center space-x-3">
          <label className="font-semibold">Search by: </label>
          <select name='search_option' 
            value={searchOption} onChange={(e) => setSearchOption(e.target.value)} 
            className="border border-gray-300 rounded-md px-2 py-1 focus:ring-amber-400 focus:border-amber-400"
          >
            <option value='title'>Book Title</option>
            <option value='author'>Author</option>
            <option value='isbn'>ISBN</option>
            <option value='first_publish_year'>First publish year</option>
          </select>
        </div>
        <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} placeholder={`Search ${searchOption.replace(/_/g, ' ')}`}
          className="border w-full m-3 p-2 rounded-md focus:ring-amber-400 focus:border-amber-400"
        />
        <button type="submit" className="w-full mt-3 bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 rounded-md transition-colors">Search</button>
      </form>

      {error ? 
        <p className="w-full max-w-xl mx-auto mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md font-medium">{error}</p> 
        : ''
      }
      
      {loading ? <LoadingIndicator /> : ''}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center">
      {books && books.length > 0 ? 
        books.map((book, index) => (
          <div 
            key={index}
            className="flex flex-col items-center bg-amber-50 border border-amber-100 p-4 rounded-xl shadow-xl 
              transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02] w-full max-w-xs"
          >
            <Link to={`/book/${book.key.split('/').pop()}`}>
              <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} 
                alt={`Cover of:${book.title}`} 
                onError={(e) => (e.target.src = 'https://dreieck.com/en/wp-content/uploads/sites/2/2023/03/opened-book-06-adding-another-outline-850x638.png')}
                className="mx-auto h-80 w-full object-cover rounded-lg shadow-md"
              />
            </Link>
            <div className="text-center w-full mt-3">
            <Link to={`/book/${book.key.split('/').pop()}`}>
              <p className="text-lg font-semibold mt-3 mb-1 hover:text-amber-700 hover:underline">{book.title}</p>
            </Link>
            <p className="text-sm text-gray-500">by</p>
            <p className="text-sm text-gray-700 font-semibold">{book.author_name}</p>
            <p className="text-xs text-gray-500 mt-2">First publised in - {book.first_publish_year}</p>
            <p></p>
            </div>
          </div>
        )) 
        : ''
      } 
      </div>

      

      {books && books.length > 0 ? '': <Trendings /> }

    </div>
  )
}

export default Homepage
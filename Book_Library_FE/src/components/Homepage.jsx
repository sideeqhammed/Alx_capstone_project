import { useState } from "react"
import SearchBook from "./SearchResult"

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
      setError('Sorry, couldn,t find your book')
    } finally {
      setLoading(false)
    }
  }
  return(
    <div className="bg-amber-50 text-center">
      <h1>Home</h1>
      <form onSubmit={search}>
        <div className="block mt-5">
          <label>Search using: </label>
          <select name='search_option' value={searchOption} onChange={(e) => setSearchOption(e.target.value)} className="border-2">
            <option value='title'>Book Title</option>
            <option value='author'>Author</option>
            <option value='first_publish_year'>First publish year</option>
          </select>
        </div>
        <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} placeholder="Search Book Title"
          className="border-2 p-2"
        />
        <button type="submit" className="border-2 m-3 px-3 py-2 bg-amber-200">Search</button>
      </form>
      
      {loading ? <p>Loading...</p> : ''}

      {books && books.length > 0 ? 
        books.map((book, index) => (
          <div 
            key={index}
            className="bg-amber-100 my-5 mx-10 p-4 text-left flex flex-wrap md:flex-nowrap md:w-3/4"
          >
            <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} 
              alt={`Cover of:${book.title}`} 
              onError={(e) => (e.target.src = 'https://dreieck.com/en/wp-content/uploads/sites/2/2023/03/opened-book-06-adding-another-outline-850x638.png')}
              className="w-30 mr-3 mb-2"
            />
            <div>
            <p>{book.title}</p>
            <p>by {book.author_name}</p>
            <p>First publised in - {book.first_publish_year}</p>
            </div>
          </div>
        )) 
        : ''
      } 

      {error ? <p className="text-red-600">{error}</p> : ''}
    </div>
  )
}

export default Homepage
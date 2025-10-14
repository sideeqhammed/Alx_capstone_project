import { useState } from "react"

function Homepage() {
  const [bookName, setBookName] = useState('')
  const search = (e) => {
    e.preventDefault()
  }
  return(
    <div className="bg-amber-50">
      <h1>Home</h1>
      <form onSubmit={search}>
        <input type="text" value={bookName} onChange={setBookName} placeholder="Search Book Title" 
          className="border-2"
        />
      </form>
      <
    </div>
  )
}

export default Homepage
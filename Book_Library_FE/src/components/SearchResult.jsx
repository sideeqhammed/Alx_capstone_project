import axios from "axios"
import { useState } from "react"

async function SearchBook(option, query) {

  try {

    if (query) {
      const url = `https://openlibrary.org/search.json?${option}=${encodeURIComponent(query)}`
      const response = await axios.get(url)
          
      return (
        response.data.docs
      )
    }
  }catch(err) {
    throw(err)
  }
}

export default SearchBook
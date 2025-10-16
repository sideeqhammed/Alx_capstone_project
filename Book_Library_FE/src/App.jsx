import './App.css'
import Header from './components/Header'
import Homepage from './components/Homepage'
import BookDetail from './components/BookDetail'
import { BrowserRouter, Routes, Route } from 'react-router'
import AuthorWorks from './components/AuthorWorks'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/book/:id' element={<BookDetail />} />
          <Route path='/author/:id' element={<AuthorWorks />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

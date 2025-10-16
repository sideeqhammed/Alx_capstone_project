import './App.css'
import Header from './components/Header'
import Homepage from './components/Homepage'
import BookDetail from './components/BookDetail'
import { BrowserRouter, Routes, Route } from 'react-router'
import Contact from './components/Contact'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/book/:id' element={<BookDetail />} />
          <Route path='/contact_us' element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

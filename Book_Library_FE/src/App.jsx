import './App.css'
import Header from './components/Header'
import Homepage from './components/Homepage'
import BookDetail from './components/BookDetail'
import { BrowserRouter, Routes, Route } from 'react-router'

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/book/:id' element={<BookDetail />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App

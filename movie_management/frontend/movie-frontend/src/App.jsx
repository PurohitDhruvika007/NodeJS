
import { Route, Routes } from 'react-router'
import './App.css'
import AddMovie from './components/addMovie/addMovie'
import MovieList from './components/MovieList/MovieList'
import DetailMovie from './components/DetailMovie/DetailMovie'
import UpdateMovie from './components/UpdateMovie/UpdateMovie'
import Navbar from './components/Navbar/Navbar'


function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/detail" element={<DetailMovie />} />
        <Route path="/detail/update" element={<UpdateMovie />} />
      </Routes>

    </>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LikedSongs from './pages/LikedSongs'
import NavBar from './components/NavBar'
import './css/global.css'
import ListPage from './pages/ListPage'


function App() {

  return (
    <div >
      <NavBar/>
      <main className='main-content '>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/liked' element={<LikedSongs/>}/>
          <Route path='/list' element={<ListPage/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App

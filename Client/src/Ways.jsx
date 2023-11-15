import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import LoginRegister from './pages/loginRegister'

function Ways() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/loginregister' element={<LoginRegister />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Ways

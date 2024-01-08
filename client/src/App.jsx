import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import { BrowserRouter, Routes,Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Next from './Sign_Next'
import Land from './land_pg' 
import Check from './Check'
import Pfp from './Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/sign_next' element={<Next/>}></Route>
        <Route path='/land' element = {<Land/>}></Route>
        <Route path='/check' element = {<Check/>}></Route>
        <Route path='/profile' element = {<Pfp/>}></Route>



      </Routes>
    </BrowserRouter>
  )
}

export default App
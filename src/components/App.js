import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginAction } from '../config/redux/actions'



import Login from './users/Login.jsx'
import Register from './users/Register.jsx'
import Home from './users/Home.jsx'
import Register_dokter from './users/Register_dokter'


export default function App() {

  const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
 
    useEffect(() => {
       const user = JSON.parse(localStorage.getItem('user'))
 
       if(user) dispatch(loginAction(user)) 
       setLoading(false)
 
    }, [])

    return loading ? (
      <h1 className="text-center">L O A D I N G ...</h1>
   ) : (
    <div>
      <BrowserRouter>
       <Route path="/" exact component={Home} />
       <Route path="/login" exact component={Login} />
       <Route path="/register" exact component={Register} />
       <Route path="/register_dokter" exact component={Register_dokter} />
     </BrowserRouter>
    </div>
  )
}
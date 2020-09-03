import React, {useRef} from 'react'
import axios from '../../config/api'
import {Redirect,Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import './style.css'

export default function Register() {
    const username = useSelector(state => state.auth.username)

   const usernameRef = useRef()
   const checkPasswordRef = useRef()
   const passwordRef = useRef()

   const registerUser = (e) => {
      e.preventDefault()

      const username = usernameRef.current.value
      const password = passwordRef.current.value
      const checkPassword = checkPasswordRef.current.value

      if(password == checkPassword){
        const body = {
            username, password
         }
   
         axios.post('/register', body)
            .then(res => {
               alert(res.data.message)
            })
            .catch(err => {
               alert(err.response.data.message)
            })
      } else {
          alert("Password Salah")
      }
      
   }
    return !username ? (
            <div className="container-fluid b">
            <div className="row">
                <div className="col-12 m ">
                <div className="card w-50 mx-auto">
                    <div className="card-header">
                        <h1 className="text-center">Register</h1>
                    </div>
                    <div className="card-body">
                    <form onSubmit={registerUser}>
                        <div className="form-group">
                            <label>Username</label>
                            <input required className="form-control" ref={usernameRef} type="text" placeholder="Masukkan Username"/>
                            <label>Password</label>
                            <input required className="form-control" ref={passwordRef} type="password" placeholder="Masukkan Password"/>
                            <label>Check Password</label>
                            <input required className="form-control" ref={checkPasswordRef} type="password"placeholder="Ulangi Password"/>
                        </div>
                    </form>
                    <div className="d-flex justify-content-between">   
                        <div>
                            <Link to="/login">
                                    <p>ke halaman login</p>
                            </Link>
                            <Link to="/register_dokter">
                                    <a>Register sebagai dokter</a>
                            </Link>  
                        </div>
                            
                                     <input onClick={registerUser} type="button" value="Registrasi" className="btn btn-success px-2 py-0 my-2"/>
                                
                        </div>
 
                    </div>
                </div>
                </div>
            </div>
            </div>  
    ) : (
        <Redirect to='/' />
    )
}

import React, {useState, useRef, useEffect} from 'react'
import axios from '../../config/api'
import {Redirect,Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import './style.css'
import { Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardTitle, CardText,CardBody,
} from 'reactstrap';

export default function Register_dokter() {
    const username = useSelector(state => state.auth.username)
    const [spesialis,setSpecial] = useState([])
    const spesialisIDRef = useRef()
    const usernameRef = useRef()
    const checkPasswordRef = useRef()
    const passwordRef = useRef()

    const getData = () => {
        axios.get('/spesialis')
        .then(res => setSpecial(res.data))
        .catch(err => console.log({err}))
    }

    useEffect(() => {
        getData()
     }, [])

    const registerDokter = (e) => {
      e.preventDefault()

      const username = usernameRef.current.value
      const password = passwordRef.current.value
      const checkPassword = checkPasswordRef.current.value
      const spesialis_id = spesialisIDRef.current.value
      const role_id = "2"

      if(password == checkPassword){
        const body = {
            username, password, spesialis_id, role_id
         }
   
         axios.post('/register_dokter', body)
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


   const funSpesialis = () => {
    return (
        spesialis.map((spec) =>
                (
                        <option value={spec.id}>{spec.spesialis}</option>
                )
            )
         )
}
    return !username ? (
            <div className="container-fluid b">
            <div className="row">
                <div className="col-12 mk ">
                <div className="card w-50 mx-auto">
                    <div className="card-header">
                        <h1 className="text-center">Register</h1>
                    </div>
                    <div className="card-body">
                    <form onSubmit={registerDokter}>
                        <div className="form-group">
                            <label>Username</label>
                            <input required className="form-control" ref={usernameRef} type="text" placeholder="Masukkan Username"/>
                            <label>Spesialis</label> 
                                <select ref={spesialisIDRef} className="form-control">
                                    {funSpesialis()}
                                </select>
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
                            <Link to="/register">
                                    <a>Register sebagai pasien</a>
                            </Link>  
                        </div>
                                     <input onClick={registerDokter} type="button" value="Registrasi" className="btn btn-success px-2 py-0 my-2"/>                          
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
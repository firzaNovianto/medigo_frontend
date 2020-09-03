import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Link,Redirect} from 'react-router-dom'
import axios from '../../config/api'
import {loginAction} from '../../config/redux/actions/'
import './style.css'

export default function Login() {
    const username = useSelector(state => state.auth.username)
    const dispatch = useDispatch()           
    const usernameRef = useRef()
    const passwordRef = useRef()

    const onButtonClick = () => {
        const username = usernameRef.current.value
        const password = passwordRef.current.value

        axios.post('/user/login', {username, password})
        .then(({data : {token, user : {id, username, role_id }}}) => {
           
           // simpan ke redux
           dispatch(loginAction({id, username, token, role_id}))

        })
        .catch(err => alert(err.response.data.message))
    }
    return !username ? (
        <div className="container-fluid b">
            <div className="row">
                <div className="col-12 m ">
                <div className="card w-50 mx-auto">
                    <div className="card-header">
                        <h1 className="text-center">LOGIN</h1>
                    </div>
                    <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control"ref={usernameRef} placeholder="Masukkan Username"/>
                            <label>Password</label>
                            <input type="password" className="form-control"ref={passwordRef} placeholder="Masukkan Password"/>
                        </div>
                    </form>
                        <div className="d-flex justify-content-between">   
                            <Link to="/register">
                                <div>
                                <a>belum punya akun?</a>
                                </div>
                                
                            </Link> 
                            
                                <input onClick={onButtonClick} type="button" value="Login" className="btn btn-success px-4"/>
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

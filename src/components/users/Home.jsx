import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Link,Redirect} from 'react-router-dom'
import {logoutAction} from '../../config/redux/actions'
import axios from '../../config/api'
import {
    Modal, ModalBody
  } from 'reactstrap';
 

export default function Home() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const role_id = useSelector(state => state.auth.role_id)
    const [profile, setProfile] = useState({})
    const [jadwal, setJadwal] = useState([])
    const [pasien, setPasien] = useState([])
    const [dokter,setDokter] = useState([])
    const [bio, setBio] = useState({})
    const [modal, setModal] = useState(false)
    const funModal = () => setModal((prevState) => !prevState)
    const [modal2, setModal2] = useState(false)
    const toggle2 = () => setModal2(!modal2)
    const nameRef = useRef()
    const alamatRef = useRef()
    const genderRef = useRef()
    const teleponRef = useRef()
    const emailRef = useRef()
    const avatarRef = useRef()
    const statusRef = useRef()
    

    
    
    const config = {headers: {Authorization: token}}
    const getProfile = () => {
        axios.get(`/user/profile/`,config)
        .then(res => setProfile(res.data))
        .catch(err => console.log({err}))
        }

    const getBio = () => {
        axios.get(`/user/profile/`,config)
        .then(res => setBio(res.data.results[0]))
        .catch(err => console.log({err}))
        }

    const getDokter = () => {
        axios.get(`/cari_dokter/`)
        .then(res => setDokter(res.data))
        .catch(err => console.log({err}))
        }

    const getJadwal = () => {
        axios.get(`/jadwal_kunjungan`,config)
        .then(res => setJadwal(res.data))
        .catch(err => console.log({err}))
        }

    const getPasien = () => {
        axios.get(`/pasien`,config)
        .then(res => setPasien(res.data))
        .catch(err => console.log({err}))
        }
    
    const funFinish = (id) => {
        axios.delete(`/finish/${id}`,config)
        .then(getPasien())
        .catch(err => console.log({err}))
    }     
    
    useEffect(() => {
        getJadwal()  
        }, [jadwal])
    

    useEffect(() => {
            getProfile()
            getBio()
            getDokter()
            getPasien()
            
         }, [])

         const funLogout = () => {
            axios.delete('/logout', config)
            .then(dispatch(logoutAction())) 
            
        }

        const onButtonClick = () => {
            const name = nameRef.current.value   
            const alamat = alamatRef.current.value 
            const gender = genderRef.current.value 
            const email = emailRef.current.value 
            const telepon = teleponRef.current.value 
            
            const body = {
                name, alamat, gender, email, telepon
            }
            const config = {headers: {Authorization: token}}
            axios.patch(`/user/profile`, body, config)
            .then((res) => { 
                getBio()
            }).catch((err) => {
               console.log(err)
            })
        }

        const savePhoto = () => {
            const avatar = avatarRef.current.files[0]
            const data = new FormData()
            data.append("avatar", avatar)
            const config = {headers: {Authorization: token}}
            axios.post('/user/avatar',data, config)
            .then(res => {
             console.log(res.data.message)
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
        }

        
        const funDaftar = (id) => {
            const dokter_id = id
            const body = {dokter_id}
            const config = {headers: {Authorization: token}}
            axios.post('daftar',body,config)
            .then(res => {
                alert(res.data.message)
                    })
                    .catch(err => {
                        console.log(err.response.data.message)
                    })
        }

        const funStatus = () => {
            const status = statusRef.current.value
            const body = {status}
            const config = {headers: {Authorization: token}}
            axios.patch(`/status`,body,config)
            .then(res => {
                console.log(res.data.message)
               })
               .catch(err => {
                   console.log(err.response.data.message)
               })
        }


        const renderDokter = dokter.map((doc) => {
            const docPic = `http://localhost:2022/user/avatar/${doc.id}`
                return (
                    <div className="card w-75v mb-2 border border-info">
                        <div className="card-body">
                           <div className="container-fluid">
                                <div className="row">
                                    <div className="col-3">
                                    <img className="card-img w-50 my-1 mx-1" src={docPic} alt="Card image"/>
                                    </div>
                                    <div className="col-9">
                                        <h5 className="card-title">Nama :{doc.name}</h5>
                                        <h5 className="card-title">Spesialis :{doc.spesialis}</h5>
                                        <h5 className="card-title">Gender :{doc.gender}</h5>
                                        <div class="d-flex justify-content-end">
                                        <button type="button" onClick={() => {funDaftar(doc.id)}} className="btn btn-info">Daftar</button>
                                        </div>
                                        
                                    </div>
                                </div>
                           </div>
                        </div>
                    </div>
                )
            })  

            const renderPasien = pasien.map((pas) => {
                const pasPic = `http://localhost:2022/user/avatar/${pas.user_id}`
                    return (
                        <div className="card w-75v mb-2 border border-info">
                            <div className="card-body">
                               <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-3">
                                        <img className="card-img w-50 my-1 mx-1 rounded" src={pasPic} alt="Card image"/>
                                        </div>
                                        <div className="col-9">
                                            <h5 className="card-title">nama :{pas.name}</h5>
                                            <h5 className="card-title">gender :{pas.gender}</h5>
                                            <h5 className="card-title">tgl_daftar :{pas.tql_daftar}</h5>
                                            <div class="d-flex justify-content-end">
                                            <button type="button" onClick={() => {funFinish(pas.user_id)}} className="btn btn-info">Finish</button>
                                            </div>
                                            
                                        </div>
                                    </div>
                               </div>
                            </div>
                        </div>
                    )
                })  

            const renderJadwal = jadwal.map((jad) => {
                
                return (
                    <div className="card w-75v mb-2 border border-info">
                        <div className="card-body">
                           <div className="container-fluid">
                                <div className="row">
                                    <div className="col-3">
                                    
                                    </div>
                                    <div className="col-9">
                                        <h5 className="card-title">dokter : {jad.name}</h5>
                                        <h5 className="card-title">spesialis: {jad.spesialis}</h5>
                                        <h5 className="card-title">tgl_daftar :{jad.tql_daftar}</h5>                                        
                                    </div>
                                </div>
                           </div>
                        </div>
                    </div>
                )
            }) 
        
    const srcPic = `http://localhost:2022/user/avatar/${bio.user_id}`
    if(role_id == 1){
        return (
            <div>
                <div className="container-fluid">
                    <div className="row mt-5">
                        <div className="col-1"></div>
                        <div className="col-sm-4 cols-12">
                            <div className="card w-100 mt-5 border border-info">
                                <div className="card-header p-0 ">
                                <div className="d-flex justify-content-between">
                                    <h3 className="font-label mt-2 ml-3">Hai , {bio.username}</h3>
                                </div>
                             </div>
                                <div className="card-body row ">
                                <div className="w-100 col-5">
                                     <img className="card-img w-100 my-1 mx-1" src={srcPic} alt="Card image"/>
                                </div>
                                <div className="col-7">
                                    <ul className="list-group list-group-flush ml-2 mt-3 w-100">
                                        <li className="list-group-item">{bio.name}</li>
                                        <li className="list-group-item">{bio.telepon}</li>
                                        <li className="list-group-item">{bio.email}</li>
                                        <li className="list-group-item">{bio.alamat}</li>
                                        <li className="list-group-item"></li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            <div className="card mt-4 border border-info">
                                <div className="card-body">
                                    <h5 className="card-title font-label">Intro</h5>
                                        <div className="container-fluid">
                                            <div classname="mx-auto">
                                            <input onClick={toggle2} type="button" value="Jadwal kunjung" className="btn btn-info w-100 btn-m mb-3"/>
                                                <input onClick={funModal} type="button" value="Edit Profile" className="btn btn-info w-100 btn-m mb-3"/>
                                                <Link to="/login">
                                                    <input onClick={funLogout} type="button" value="Logout" className="btn btn-info w-100 btn-m"/>
                                                </Link>
                                            </div>
                                        </div>
                                </div>
                            </div>        
                        </div>
                        <div className="col-sm-6 col-12">
                            <h1 className="text-center mt-5">Dokter Tersedia</h1>
                            {renderDokter}
                        </div>
                        <div className="col-1"></div>
                    </div>
                </div>
                    <Modal isOpen={modal} toggle={funModal}>
                        <ModalBody>
                            <div className="border-bottom border-secondary card-title">
                                    <h1>Edit Profile</h1>
                            <form>
                                <div className="form-group">
                                    <label>Nama</label>
                                    <input required className="form-control" type="text" ref={nameRef} />
                                    <label>Gender</label>
                                    <select ref={genderRef} className="form-control">
                                        <option value="Pria">Pria</option>
                                        <option value="Wanita">Wanita</option>
                                        </select>
                                    <label>Alamat</label>
                                    <input required className="form-control" type="text" ref={alamatRef} />
                                    <label>email</label>
                                    <input required className="form-control" type="email" ref={emailRef} />
                                    <label>telepon</label>
                                    <input required className="form-control" type="text" ref={teleponRef}/>
                                    <label>foto</label>
                                    <div className="row">
                                        <input required className="form-control col-8 ml-3 mr-2 " type="file" ref={avatarRef} />
                                        <input onClick={savePhoto} className=" btn btn-success col-3" type="button" value="Simpan foto"/>
                                   </div>
                                </div>
                            </form>
                                
                                </div>
                                <div class="d-flex justify-content-end">
                                    <input className="btn btn-success px-2" type="button" value="Perbarui profile" onClick={onButtonClick}/>
                                </div>
                                    
                                                
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={modal2} toggle={toggle2}>
                            <ModalBody>
                                    <div>
                                        <label >Jadwal Kunjungan Besok</label>
                                        {renderJadwal}
                                    </div>
                                </ModalBody>
                                </Modal>
            </div>
        )
    } if (role_id == 2){
        return(
            <div>
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-1 col-sm-1"></div>
                    <div className="col-sm-4 col-12">
                        <div className="card w-100 mt-5 border border-info">
                            <div className="card-header p-0 ">
                            <div className="d-flex justify-content-between">
                                <h3 className="font-label mt-2 ml-3">Hai Dokter , {bio.username}</h3>
                            </div>
                         </div>
                            <div className="card-body row ">
                            <div className="w-100 col-5">
                                 <img className="card-img w-100 my-1 mx-1" src={srcPic} alt="Card image"/>
                            </div>
                            <div className="col-7">
                                <ul className="list-group list-group-flush ml-2 mt-3 w-100">
                                    <li className="list-group-item">{bio.name}</li>
                                    <li className="list-group-item">{bio.telepon}</li>
                                    <li className="list-group-item">{bio.email}</li>
                                    <li className="list-group-item">{bio.alamat}</li>
                                    <label className="mt-3 ml-3">Status besok</label>
                                    <select ref={statusRef} onChange={funStatus} className="form-control">
                                    <option value="luang">Hadir</option>
                                    <option value="sibuk">Izin</option>
                                    </select>
                                </ul>
                            </div>
                            </div>
                        </div>
                        <div className="card mt-4 border border-info">
                            <div className="card-body">
                                <h5 className="card-title font-label">Intro</h5>
                                    <div className="container-fluid">
                                        <div classname="mx-auto">
                                            <input onClick={funModal} type="button" value="Edit Profile" className="btn btn-info w-100 btn-m mb-3"/>
                                            <Link to="/login">
                                                <input onClick={funLogout} type="button" value="Logout" className="btn btn-info w-100 btn-m"/>
                                            </Link>
                                        </div>
                                    </div>
                            </div>
                        </div>        
                    </div>
                    <div className="col-sm-6 col-12">
                        <h1 className="text-center mt-5">Pasien yang akan hadir besok</h1>
                        {renderPasien}
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
                <Modal isOpen={modal} toggle={funModal}>
                    <ModalBody>
                        <div className="border-bottom border-secondary card-title">
                                <h1>Edit Profile</h1>
                        <form>
                            <div className="form-group">
                                <label>Nama</label>
                                <input required className="form-control" type="text" ref={nameRef} />
                                <label>Gender</label>
                                <select ref={genderRef} className="form-control">
                                    <option value="Pria">Pria</option>
                                    <option value="Wanita">Wanita</option>
                                    </select>
                                <label>Alamat</label>
                                <input required className="form-control" type="text" ref={alamatRef} />
                                <label>email</label>
                                <input required className="form-control" type="email" ref={emailRef} />
                                <label>telepon</label>
                                <input required className="form-control" type="text" ref={teleponRef}/>
                                <label>foto</label>
                                <div className="row">
                                    <input required className="form-control col-8 ml-3 mr-2 " type="file" ref={avatarRef} />
                                    <input onClick={savePhoto} className=" btn btn-success col-3" type="button" value="Simpan foto"/>
                               </div>
                            </div>
                        </form>
                            
                            </div>
                            <div class="d-flex justify-content-end">
                                <input className="btn btn-success px-2" type="button" value="Perbarui profile" onClick={onButtonClick}/>
                            </div>
                                
                                            
                    </ModalBody>
                </Modal>
                
        </div>
        )
        
    } if (!token) {
        return(
        <Redirect to='/login' />        
        )
        
    }
    
}

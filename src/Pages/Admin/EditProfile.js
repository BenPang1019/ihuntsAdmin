import React,{useState,useContext} from 'react'
import edit from '../../Images/Edit.svg'
import flower from '../../Images/Flower.jpg'
import home from "../../Images/Home.svg"

import '../Admin/Admin.css'
import {Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import Swal from 'sweetalert2'

export const EditProfile = () => {
    const navigate = useNavigate();

    const navigatetohome= () =>{
        navigate('/adminMainPage');
        };

    


    const {currentAdmin,adminLogout} = useContext(AuthContext);

    const logout = () => {
        Swal.fire({
            title: 'Sign Out',
            text: "Are you sure you want to sign out? You’ll need to sign in again.",
            width:'700px',
            height:'300px',
            showCancelButton: true,
            confirmButtonText: 'YES',
            confirmButtonColor:"white",
            cancelButtonText:'NO',
            cancelButtonColor:"white",
            customClass:{
                confirmButton:'confirmButton grow',
                cancelButton:'confirmButton grow',
                title:'title',
                popup:'popup',
                validationMessage:'title'
            },
            allowOutsideClick:false,
            }).then((result) => {
            if (result.isConfirmed) {
                adminLogout()
            }
            })
      
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0)
      }

    return(

        <div className='admin'>
        {currentAdmin ? 
      (
        <>
            <section className="EDfirstsection">
                <div className="EDfirstcontainer">
                    <div className="EDcolumn-30 grow" onClick={scrollToTop}>
                        <iconbutton onClick={navigatetohome}><img src={home}/></iconbutton>
                    </div>
                    
                    <div className="EDcolumn-30 right grow" onClick={scrollToTop}>
                        <button className='EDbacktbtn' onClick={() => navigate(-1)}>BACK</button>
                    </div>
                </div>
            </section>

            <section className='secondsection'>
                <div className='center-container'>
                    <div className='container-2'>
                        <img src={flower} className='imgstyle'></img>
                            <div className='col-secondcontainer'>
                                <h1 className='h1Text'>Admin</h1>
                            </div>
                        <iconbutton><img src={edit} className='profilebtnTwo grow'/></iconbutton>
                    </div>
                </div>
            </section>

            <div>
                     
            </div>

            

            </>
        ) : 
      (
        setTimeout(() => {
          navigate('/')
        }, 5)
      )
      }                
        </div>

    )

}
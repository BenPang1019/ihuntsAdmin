import React,{useState,useContext} from 'react'
import searchLogo from '../../Images/searchLogo.svg'
import product from '../../Images/product.svg'
import post from '../../Images/Post.svg'
import stats from '../../Images/Stats.svg'
import sales from '../../Images/Sales.svg'
import settings from '../../Images/Setting.svg'
import Question from '../../Images/Question.svg'
import reviews from '../../Images/Review.svg'
import promotion from '../../Images/Promotion.svg'
import media from '../../Images/Media.svg'
import PopUp from '../../Images/Pop-up.svg'
import contact from '../../Images/contactAdmin.svg'
import profile from '../../Images/Profile.svg'
import add from '../../Images/Add.svg'
import logo from '../../Images/wdalogo.svg'
import flower from '../../Images/Flower.jpg'
import signout from '../../Images/signout.svg'

import '../Admin/Admin.css'
import {Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import Swal from 'sweetalert2'

export const Admin = () => {
    const navigate = useNavigate();

    const navigatetoProduct= () =>{
        navigate('/adminProduct');
    };

    const navigatetoPosts= () =>{
        navigate('/adminGuide');
    };

    const navigatetoeditProfile= () =>{
        navigate('/editProfile');
    };

    const navigatetoMedia= () =>{
        navigate('/media');
    };

    const navigatetoRegister= () =>{
        navigate('/registerUser');
    };

    const navigatetoQuestion= () =>{
        navigate('/adminQuestion');
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
            backdrop:`rgba(40, 111, 180, 0.8)`,
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
            <section className='secondsection'>
                <div className='center-container'>
                    <div className='container-2'>
                        <img src={flower} className='imgstyle'></img>
                            <div className='col-secondcontainer'>
                                <h1 className='h1Text'>Hi Admin, welcome back!</h1>
                            </div>
                        <iconbutton><img src={profile}  className='profilebtn grow' /></iconbutton>
                        <iconbutton><img src={signout} className='addbtn grow' onClick={logout}/></iconbutton>
                    </div>
                </div>
            </section>

            <section className='thirdsection'>
                <h2 className='h3-color'>QUICK ACTIONS</h2>
                <div className='thirdcontainer'>
                    <iconbutton onClick={navigatetoProduct}><img src={product} className='actionbtn grow'/></iconbutton>

                    <iconbutton onClick={navigatetoPosts}><img src={post} className='actionbtn actionbtn-Lf grow'/></iconbutton>

                    <iconbutton onClick={navigatetoRegister}><img src={stats} className='actionbtn actionbtn-Lf grow'/></iconbutton>

                    <iconbutton onClick={navigatetoQuestion}><img src={Question} className='actionbtn actionbtn-Lf grow'/></iconbutton>

                    <iconbutton onClick={navigatetoMedia}><img src={media} className='actionbtn actionbtn-Lf grow'/></iconbutton>

                    {/* <iconbutton><img src={settings} className='actionbtn actionbtn-Lf grow'/></iconbutton> */}
                </div>
            </section>

            <section className='fifthsection'>
                <div className='center-fifthContainer'>
                    <div className='container-5'>
                        <div className='column-40'>
                            <iconbutton><img src={logo}/></iconbutton>
                        </div>
                        <div className='column-60'>
                            <h1 className='h1Text'>Need some help?</h1>
                            <p className='helptext'>Feel free to leave a message regarding issues you are facing. We will get in touch with you as soon as posible.</p>
                        </div>
                        {/* <div className='col-secondcontainer'>
                            
                        </div> */}
                    </div>
                </div>
            </section>

            <section className='fromsection'>
                <form className="contact-form fromcontainer">
                    <div className='container-5'>
                        <div className='column'>
                            <div className="form-field">
                                <label className="label" for="name">NAME</label>
                                <input
                                id="name"
                                className="input-text "
                                type="text"
                                required
                                />
                            </div>

                            <div className="form-field">
                                <label className="label" for="phone">PHONE</label>
                                <input
                                id="phone"
                                className="input-text "
                                type="text"
                                required
                                />
                            </div>
                        </div>
                        <div className='column'>
                            <div className="form-field space-5">
                                <label className="label" for="message">MESSAGE</label>
                                <textarea
                                id="message"
                                className="input-text-2"
                                type="text"
                                required
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </section>

            <div className='sendBtncontainer'>
                <button className='sendtBtn grow'>SEND</button>
            </div>

            <div className='ViewBtncontainer'>
                <a href="https://www.ihunts.co/" style={{ textDecoration:'none' }} target='_blank'><button className='ViewBtn' >View Site</button></a>
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
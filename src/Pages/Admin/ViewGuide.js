import React,{useContext} from "react";
import home from "../../Images/Home.svg"
import eye from '../../Images/Eye.svg'
import dele from '../../Images/Delete.svg'
import pencel from '../../Images/Pencel.svg'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";

import Swal from 'sweetalert2'

import '../Admin/Edit.css'
import { AuthContext } from "../../Context/AuthContext";

export const ViewGuide = () => {
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL,});

  const [guide, setGuide] = useState("");

  const location = useLocation();
  const productId=location.state.guide.id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/product/getGuide/${productId}`);
        setGuide(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [productId]);



  const handleDelete = async ()=>{
    Swal.fire({
      title: 'Delete Product',
      text: "Are you sure you want to delete? Your product will be cleared forever.",
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
        try {
          axiosInstance.delete(`/product/deleteGuide/${productId}`);
        } catch (err) {
          console.log(err);
        }
          Swal.fire({
            title: 'Delete Successfully',
            text: "Your product has been removed successfully. Press OK to continue.",
            width:'700px',
            height:'300px',
            confirmButtonText: 'OK',
            confirmButtonColor:"white",
            customClass:{
                confirmButton:'confirmButton grow',
                title:'title',
                popup:'popup',
                validationMessage:'title'
            },
            allowOutsideClick:false,
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/adminProduct");
              }
            })
      }
      })

  };


  const {currentAdmin,adminLogout} = useContext(AuthContext);


  const navigate = useNavigate();
  const navigatetohome= () =>{
    navigate('/adminMainPage');
  };

    return(

        <div className="editProduct">
        {currentAdmin ? 
      (
        <>
            <section className="EDfirstsection">
                <div className="EDfirstcontainer">
                    <div className="EDcolumn-30 grow">
                        <iconbutton onClick={navigatetohome}><img src={home}/></iconbutton>
                    </div>

                    <div className="EDcolumn-40 ">
                        <Link to={`/updateGuide`} state={{ guide:location.state.guide }}><iconbutton><img src={pencel} className="btnstyle grow" /></iconbutton></Link>
                        <iconbutton onClick={handleDelete}><img src={dele} className="btnstyle1 grow"/></iconbutton>
                    </div>

                    <div className="EDcolumn-30 right">
                        <button className='EDbacktbtn grow' onClick={() => navigate(-1)}>BACK</button>
                    </div>
                </div>
            </section>

            <section className="EDsecondsection">
                <div className="ED2-center-container">
                    <img src={location.state.guide.newsImage} className="guideImage" name="guideImage"/>
                    <br/><br/>
                    <section className="detailsection">
                        <div className="EDsecondColumn-30 left">
                            <h1 className="EDh1Text">author</h1>
                            <span className="EDText">{location.state.guide.postBy}</span>
                        </div>

                        <div className="EDcolumn left">
                            <h1 className="EDh1Text">title</h1>
                            <span className="EDText">{location.state.guide.title}</span>
                            <h1 className="EDh1Text">sub-title</h1>
                            <span className="EDText">{location.state.guide.subTitle}</span>   
                            <h1 className="EDh1Text">Description</h1>
                            <span className="EDText">{location.state.guide.description}</span>
                        </div>
                    </section>
                </div>
            </section>

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
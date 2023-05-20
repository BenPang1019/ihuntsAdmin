import React, { useEffect } from "react";
import home from "../../Images/Home.svg"
import eye from '../../Images/Eye.svg'
import pencel from '../../Images/Pencel.svg'
import dele from '../../Images/Delete.svg'

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";

import '../Admin/Edit.css'

import Swal from 'sweetalert2'

export const ViewProduct = () => {
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL,});

  const location = useLocation();

  const productId=location.state.product.id

  const [error,setError] = useState(false);


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
          axiosInstance.delete(`/product/deleteProduct/${productId}`);
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

  const navigate = useNavigate();
  const navigatetohome= () =>{
    navigate('/adminMainPage');
  };




    return(

        <div className="editProduct">    
                <section className="EDfirstsection">
                    <div className="EDfirstcontainer">
                        <div className="EDcolumn-30 grow">
                            <iconbutton onClick={navigatetohome}><img src={home}/></iconbutton>
                        </div>
                        <div className="EDcolumn-40">
                            <Link to={`/updateProduct`} state={{ product:location.state.product }}><iconbutton><img src={pencel} className="btnstyle grow" /></iconbutton></Link>
                            <iconbutton onClick={handleDelete}><img src={dele} className="btnstyle1 grow"/></iconbutton>
                        </div>
                        <div className="EDcolumn-30 right">
                            <button className='EDbacktbtn grow' onClick={() => navigate(-1)}>BACK</button>
                        </div>
                    </div>
                </section>

                <section className="EDsecondsection">
                    <div className="EDcenter-container">
                        <div className="EDsecondColumn-30 left">
                            <h1 className="EDh1Text">featured image</h1>
                            <img src={location.state.product.productImageOne?location.state.product.productImageOne:null} className='imgstyle'></img>
                            <h1 className="EDh1Text">Name</h1>
                            <span className="EDText">{location.state.product.productName}</span>
                            <h1 className="EDh1Text">Categories</h1>
                            <span className="EDText">{location.state.product.category}</span>
                            
                        </div>
                        <div className="EDcolumn left">
                            <h1 className="EDh1Text">Images</h1>
                            <div className="imagecontainer">
                            <img src={location.state.product.productImageTwo?location.state.product.productImageTwo:null} className='otherImgstyle'></img>
                            <img src={location.state.product.productImageThree?location.state.product.productImageThree:null} className='otherImgstyle'></img>
                            <img src={location.state.product.productImageFour?location.state.product.productImageFour:null} className='otherImgstyle'></img>
                            </div>
                            
                            <h1 className="EDh1Text">Spec</h1>
                            <table className="">
                                <tr className="">
                                    <td></td>
                                    <td className="test">1</td>
                                    <td>2</td>
                                    <td>2</td>
                                    <td>4</td>
                                    <td>5</td>
                                    <td>6</td>
                                </tr>
                                <tr className="tableLeft">
                                    <td>Diameter</td>
                                    <td ><span >{location.state.product.diameterOne}</span></td>
                                    <td ><span >{location.state.product.diameterTwo}</span></td>
                                    <td ><span >{location.state.product.diameterThree}</span></td>
                                    <td ><span >{location.state.product.diameterFour}</span></td>
                                    <td ><span >{location.state.product.diameterFive}</span></td>
                                    <td ><span >{location.state.product.diameterSix}</span></td>
                                </tr>
                                <tr className="tableLeft">
                                    <td>Length</td>
                                    <td ><span >{location.state.product.lengthOne}</span></td>
                                    <td ><span >{location.state.product.lengthTwo}</span></td>
                                    <td ><span >{location.state.product.lengthThree}</span></td>
                                    <td ><span >{location.state.product.lengthFour}</span></td>
                                    <td ><span >{location.state.product.lengthFive}</span></td>
                                    <td ><span >{location.state.product.lengthSix}</span></td>
                                </tr>
                                <tr className="tableLeft">
                                    <td>Ds</td>
                                    <td ><span >{location.state.product.dsOne}</span></td>
                                    <td ><span >{location.state.product.dsTwo}</span></td>
                                    <td ><span >{location.state.product.dsThree}</span></td>
                                    <td ><span >{location.state.product.dsFour}</span></td>
                                    <td ><span >{location.state.product.dsFive}</span></td>
                                    <td ><span >{location.state.product.dsSix}</span></td>
                                </tr>
                                <tr className="tableLeft">
                                    <td>Hl</td>
                                    <td ><span >{location.state.product.hlOne}</span></td>
                                    <td ><span >{location.state.product.hlTwo}</span></td>
                                    <td ><span >{location.state.product.hlThree}</span></td>
                                    <td ><span >{location.state.product.hlFour}</span></td>
                                    <td ><span >{location.state.product.hlFive}</span></td>
                                    <td ><span >{location.state.product.hlSix}</span></td>
                                </tr>
                            </table>
                            <h1 className="EDh1Text">Materials</h1>
                            <span className="EDText">{location.state.product.materials}</span>
                            <h1 className="EDh1Text">Standards</h1>
                            <span className="EDText">{location.state.product.standards}</span>
                            <h1 className="EDh1Text">Finisher</h1>
                            <span className="EDText">{location.state.product.finisher}</span>
                            <h1 className="EDh1Text">Description</h1>
                            <span className="EDText">{location.state.product.description}</span>

                          
                        </div>
                    </div>
                </section>

                <br/>
                <br/>
                <br/>
                
           </div> 
    )
}


    
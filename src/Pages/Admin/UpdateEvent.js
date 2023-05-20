import React, { useEffect } from "react";
import home from "../../Images/Home.svg"
import eye from '../../Images/Eye.svg'
import pencel from '../../Images/Pencel.svg'
import dele from '../../Images/Delete.svg'
import xIcon from '../../Images/xIcon.png'

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";

import Swal from 'sweetalert2'

import '../Admin/Edit.css'

export const UpdateProduct = () => {
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL,});

  
  const [productdata, setproductdata] = useState("");
  const [event, setEvent] = useState({
    title:"",
    type:"",
    startTime:"",
    location:"",
    endTime:"",
    minPax:"",
    price:"",
    priceWorth:"",
    description:"",
    image:"",
    availableMonday:"",
    availableTuesday:"",
    availableWednesday:"",
    availableThursday:"",
    availableFriday:"",
    availableSaturday:"",
    availableSunday:"",
});

const optionsLocation = [
  {id:"1",location:"Johor"},
  {id:"2",location:"Kedah"},
  {id:"3",location:"Kelantan"},
  {id:"4",location:"Melaka"},
  {id:"5",location:"Negeri Sembilan"},
  {id:"6",location:"Pahang"},
  {id:"7",location:"Perak"},
  {id:"8",location:"Perlis"},
  {id:"9",location:"Pulau Pinang"},
  {id:"10",location:"Sabah"},
  {id:"11",location:"Sarawak"},
  {id:"12",location:"Selangor"},
  {id:"13",location:"Terangganu"},
  {id:"14",location:"Kuala Lumpur"},
  {id:"15",location:"Labuan"},
  {id:"16",location:"Putrajaya"},
];

const optionsCategory = [
  {id:"1",name:"Test"},
  {id:"2",name:"Test"},
  {id:"3",name:"Test"},
  {id:"4",name:"Test"},
  {id:"5",name:"Test"},
  {id:"6",name:"Test"},
  {id:"7",name:"Test"},
  {id:"8",name:"Test"},
  {id:"9",name:"Test"},
  {id:"10",name:"Test"},
  {id:"11",name:"Test"},
];



  const [fileOne, setFileOne] = useState('');

  const locationData = useLocation();

  const[Category, setcategory] = useState([]); 
  const[location, setLocation] = useState([]); 
  
  const productId=locationData.state.product.id

  useEffect(()=>{
    setcategory(optionsCategory);
  },[]) 


  useEffect(()=>{
    setLocation(optionsLocation);
  },[]) 


  const handleChange = (e) => {
    setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/event/getEvent/${productId}`);
        setproductdata(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [productId]);

  const [activeImageOne , setActiveImageOne] = useState(true)

  const deleteImageOne =  () => {
    // setActiveImageOne(false)
    setFileOne("")
    setproductdata(prevState => ({
      ...prevState,
      productImageOne: ""
      }));
  }


  // const handleDelete = async ()=>{
  //   Swal.fire({
  //     title: 'Delete Product',
  //     text: "Are you sure you want to delete? Your product will be cleared forever.",
  //     width:'700px',
  //     height:'300px',
  //     showCancelButton: true,
  //     confirmButtonText: 'YES',
  //     confirmButtonColor:"white",
  //     cancelButtonText:'NO',
  //     cancelButtonColor:"white",
  //     customClass:{
  //         confirmButton:'confirmButton grow',
  //         cancelButton:'confirmButton grow',
  //         title:'title',
  //         popup:'popup',
  //         validationMessage:'title'
  //     },
  //     allowOutsideClick:false,
  //     }).then((result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         axiosInstance.delete(`/product/deleteProduct/${productId}`);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //         Swal.fire({
  //           title: 'Delete Successfully',
  //           text: "Your product has been removed successfully. Press OK to continue.",
  //           width:'700px',
  //           height:'300px',
  //           confirmButtonText: 'OK',
  //           confirmButtonColor:"white",
  //           customClass:{
  //               confirmButton:'confirmButton grow',
  //               title:'title',
  //               popup:'popup',
  //               validationMessage:'title'
  //           },
  //           allowOutsideClick:false,
  //           }).then((result) => {
  //             if (result.isConfirmed) {
  //               navigate("/adminProduct");
  //             }
  //           })
  //     }
  //     })

  // };

  const navigate = useNavigate();
  const navigatetohome= () =>{
    navigate('/adminMainPage');
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  return(

    <div className="editProduct">
        <section className="EDfirstsection">
            <div className="EDfirstcontainer">
                <div className="EDcolumn-30 " onClick={scrollToTop}>
                    <iconbutton onClick={navigatetohome} ><img src={home} className=' grow'/></iconbutton>
                </div>
                
                <div className="EDcolumn-30 right " onClick={scrollToTop}>
                    <button className='EDbacktbtn grow' onClick={() => navigate(-1)}>BACK</button>
                </div>
            </div>
        </section>

        <section className="EDsecondsection">
            <div className="EDcenter-container">
                <div className="EDsecondColumn-30 left">
                  <h1 className="EDh1Text">featured image</h1>
                    {productdata.productImageOne && activeImageOne==true || fileOne?
                    <img src={xIcon} onClick={deleteImageOne} className='xIconOne grow'/>
                    :
                    null
                    }

                  <img src={fileOne?fileOne:productdata.image} className='imgstyle'></img><br/><br/>
                  <input type="text"  className="EDinput" onChange={handleChange} name="image"/>
                    <br/><br/>
                    <h1 className="EDh1Text">Title</h1>
                    <input type="text"  className="EDinput" onChange={handleChange} name="eventTitle" defaultValue={productdata.eventTitle}/>
                    <h1 className="EDh1Text">Type</h1>
                    <select className="selectStyles" onChange= {handleChange} name="type" > 
                        <option value="" >{productdata.type}</option>
                        {
                            Category && 
                            Category !== undefined ?
                            Category.map((optionCat,index) => {
                                return(
                                    <option key={index} value={optionCat.name} >{optionCat.name}</option>
                                )
                            })
                            : "No Category"
                        }
                    </select>

                    <h1 className="EDh1Text">Start Time</h1>
                    <input type="text"  className="EDinput" onChange={handleChange} name="eventStartTime" defaultValue={productdata.eventStartTime}/>

                    <h1 className="EDh1Text">End Time</h1>
                    <input type="text"  className="EDinput" onChange={handleChange} name="eventEndTime" defaultValue={productdata.eventEndTime}/>
{/* 
                    <h1 className="EDh1Text">ac</h1>
                    <input type="text"  className="EDinput" onChange={handleChange} name="active"/> */}


                    

                </div>
      
                <div className="EDcolumn left">
                    <h1 className="EDh1Text">Location</h1>
                    <select className="selectStyles" onChange= {handleChange} name="location"> 
                        <option value="">{productdata.location}</option>
                        {
                            location && 
                            location !== undefined ?
                            location.map((location,index) => {
                                return(
                                    <option key={index} value={location.location}>{location.location}</option>
                                )
                            })
                            : "No Category"
                        }
                    </select>

                    <h1 className="EDh1Text">Min Pax</h1>
                    <input type="text"  className="EDinput" onChange={handleChange} name="minPax" defaultValue={productdata.minPax}/>
                    
                    <h1 className="EDh1Text">Price</h1>
                    <input type="text"  className="EDinput" onChange={handleChange} name="price" defaultValue={productdata.price}/>

                    <h1 className="EDh1Text">Price Worth</h1>
                    <input type="text"  className="EDinput" onChange={handleChange} name="priceWorth" defaultValue={productdata.priceWorth}/>

                    <h1 className="EDh1Text">Time Slot</h1>
                    <input type="checkbox" value="1" name="availableMonday" onChange={handleChange} defaultValue={productdata.availableMonday}/><label>Monday</label>
                    <input type="checkbox" value="2" name="availableTuesday" onChange={handleChange}/><label>Tuesday</label>
                    <input type="checkbox" value="3" name="availableWednesday" onChange={handleChange}/><label>Wednesday</label>
                    <input type="checkbox" value="4" name="availableThursday" onChange={handleChange}/><label>Thursday</label>
                    <input type="checkbox" value="5" name="availableFriday" onChange={handleChange}/><label>Friday</label>
                    <input type="checkbox" value="6" name="availableSaturday" onChange={handleChange}  checked={productdata.availableMonday=6}/><label>Saturday</label>
                    <input type="checkbox" value="7" name="availableSunday" onChange={handleChange}/><label>Sunday</label>
              
                    <h1 className="EDh1Text">Description</h1>
                    <textarea rows="3" cols="75"  className="EDinput" onChange={handleChange} name="description"/>
                </div>
            </div>
        </section>

        <section className="EDthirdsection">
            <button className='EDbacktbtn grow' >UPDATE</button>
        </section>
    </div>
)
}
import React, { useEffect,useContext } from "react";
import home from "../../Images/Home.svg"
import xIcon from '../../Images/xIcon.png'
import add from '../../Images/Add.svg'
import dele from '../../Images/delete.png'
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import Swal from 'sweetalert2'


import '../Admin/Edit.css'
import { AuthContext } from "../../Context/AuthContext";

export const AddEvent = () => {
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL,});


    const [event, setEvent] = useState({
          eventTitle:"",
          type:"",
          startTime:"",
          location:"",
          eventEndTime:"",
          eventStartTime:"",
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
          active:"",
    });


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

    const optionsStartTime = [
      {id:"1",time:"0800"},
      {id:"2",time:"0900"},
      {id:"3",time:"1000"},
      {id:"4",time:"1100"},
      {id:"5",time:"1200"},
      {id:"6",time:"1300"},
      {id:"7",time:"1400"},
      {id:"8",time:"1500"},
      {id:"9",time:"1600"},
      {id:"10",time:"1700"},
      {id:"11",time:"1800"},
  ];

  const optionsLocation = [
    {id:"1",location:"Johor"},
    {id:"2",location:"Kedah"},
    {id:"3",location:"Kelantan"},
    {id:"4",location:"Melaka"},
    {id:"5",location:"Negeri Sembilan"},
    {id:"6",location:"Pahang"},
    {id:"7",location:"Perak"},
    {id:"8",location:"Perlis"},
    {id:"9",location:"Penang"},
    {id:"10",location:"Sabah"},
    {id:"11",location:"Sarawak"},
    {id:"12",location:"Selangor"},
    {id:"13",location:"Terangganu"},
    {id:"14",location:"Kuala Lumpur"},
    {id:"15",location:"Labuan"},
    {id:"16",location:"Putrajaya"},
];


      const[Category, setcategory] = useState([]); 
      const[startTime, setStartTime] = useState([]); 
      const[location, setLocation] = useState([]); 

      useEffect(()=>{
        setcategory(optionsCategory);
      },[]) 

      useEffect(()=>{
        setStartTime(optionsStartTime);
      },[]) 

      useEffect(()=>{
        setLocation(optionsLocation);
      },[]) 

    
      const navigate = useNavigate();

      // const state = {
      //   file: null,
      //   base64URL: ""
      // };

      // const getBase64 = file => {
      //   return new Promise(resolve => {
      //     let fileInfo;
      //     let baseURL = "";
      //     // Make new FileReader
      //     let reader = new FileReader();
    
      //     // Convert the file to base64 text
      //     reader.readAsDataURL(file);
    
      //     // on reader load somthing...
      //     reader.onload = () => {
      //       // Make a fileInfo Object
      //       baseURL = reader.result;
      //       resolve(baseURL);
      //     };
      //   });
      // };
    
      const handleChange = (e) => {
        setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

      // const handleChangeOne = (e) => {

      //   let { file } = state;

      //   file = e.target.files[0];

      //   getBase64(file)
      //   .then(result => {
      //       file["base64"] = result;
      //       setFileOne(result)
      //   })
      //   .catch(err => {
            
      //   });
      // };
 
      
      // const deleteImageOne =  () => {
      //   setFileOne("")
      // }
    

    const handleClick = async e => {
        e.preventDefault();
        event.active="None"
            try {
              await axiosInstance.post("/event/addEvent", event);
              Swal.fire({
                title: 'ADD SUCESSFULLY',
                text: "Your product has been included successfully. Press OK to continue.",
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
            } catch (err) {
              
            }
        
        
        
    }

    const {currentAdmin,adminLogout} = useContext(AuthContext);

    const navigatetohome= () =>{
    navigate('/adminMainPage');
    };

    const scrollToTop = () => {
        window.scrollTo(0, 0)
      }

      const [checkbox, setCheckbox] = useState(false);  
    const [selectedIds, setSelectedIds] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [media, setMedia] = useState([]);

    const [fileOne, setFileOne] = useState('');


    const [uploadImage, setUploadImage] = useState({
        image:"",
    });

    const [popupOpen, setPopupOpen] = useState(false);


    const handleOpenPopup = () => {
    setPopupOpen(true);
    window.scrollTo(0,0)
    };

    const handleClosePopup = () => {
    setPopupOpen(false);
    };

    const handleChangeOne = async (e) => {
    setUploadImage((prev) => ({ ...prev, [e.target.name]: e.target.value }));    
    };

    const handleUplaod = async e => {
        try {
            await axiosInstance.post("/auth/uploadImage", uploadImage)
                .then(res => {
                Swal.fire({
                    title: 'ADD SUCESSFULLY',
                    text: "Your image has been uploaded successfully. Press OK to continue.",
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
                        window.location.reload()
                    }
                    })
                })
                .catch(err => {
                Swal.fire({
                    title: 'ADD UNSUCESSFULLY',
                    text: `${err.response.data}`,
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
                        window.location.reload()
                    }
                    })
                });
            } catch (err) {
            console.log(err);
            }
    }

    const handleCheckboxChange = (event) => {
      const id = event.target.value;
      if (event.target.checked) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
      }
    };

      const deleteImageOne =  () => {
        setFileOne("")
      }
      const handleDelete = async () => {
        try {
          const response = await axiosInstance.delete('/auth/deleteAdminImage', {
            data: { ids: selectedIds},
          });
          setSelectedIds([]);
          Swal.fire({
                      title: 'DELETE SUCESSFULLY',
                      text: "Your image has been deleted successfully. Press OK to continue.",
                      width:'700px',
                      height:'300px',
                      confirmButtonText: 'OK',
                      confirmButtonColor:"white",
                      backdrop:`rgba(40, 111, 180, 0.8)`,
                      customClass:{
                          confirmButton:'confirmButton grow',
                          title:'title',
                          popup:'popup',
                          validationMessage:'title'
                      },
              
                      allowOutsideClick:false,
                      }).then((result) => {
                      if (result.isConfirmed) {
                          
                      }
                      })
        } catch (error) {
          console.error(error);
        }
      };

      const handleImageClick = (media) => {
        if (media.image === fileOne) {
          setFileOne("");
        } else if (!fileOne) {
          setFileOne(media.image);
        } 
      };

      const displayImage = media.map((media) => {
        let counter = 0;
        if (media.image === fileOne) {
          counter = 1;
        }
  
        return (
          <div className="inline" key={media.id}>
            {checkbox?
                <input
                  type="checkbox"
                  value={media.id}
                  onChange={handleCheckboxChange}
                  className='deleteCheckbox'
                />
                :
                null
                }
            <img
              src={media.image ? media.image : null}
              className="mediaImage"
              onClick={() => handleImageClick(media)}
            />
            {checkbox?
            <></>
            :
            <>
            {counter > 0 && (
              <div className="counterImage" >
                {counter}
              </div>
            )}
            </>
            }
          </div>
        );
      });

      useEffect(() => {
        fetchProducts();
    }, [currentPage,media]);

      const fetchProducts = async () => {
        try {
          const response = await axiosInstance.get("/auth/getAllImage", {
            params: {
              limit:18,
              page: currentPage,
            },
          });
          setMedia(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
  
    useEffect(() => {
        fetchTotalPages();
      }, []);
    
      const fetchTotalPages = async () => {
        try {
          const response = await axiosInstance.get("/auth/getAllImageTotalPages", {
            params: {
              limit:18,
            },
          }); 
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.log(error);
        }
      };
    
      const renderPageNumbers = () => {
        const pageNumbers = [];
        let startPage = 1;
        let endPage = Math.min(totalPages, 10);
      
        if (currentPage > 6) {
          startPage = currentPage - 5;
          endPage = Math.min(currentPage + 4, totalPages);
        }
      
        if (endPage - startPage < 9 && endPage < totalPages) {
          endPage = Math.min(startPage + 9, totalPages);
          if (endPage - startPage < 9) {
            startPage = Math.max(endPage - 9, 1);
          }
        }
      
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(
            <li
              key={i}
              className={currentPage === i ? "active" : ""}
              onClick={() => {handlePageChange(i)  }}
            >
              {i}
            </li>
          );
        }
      
        if (startPage > 1) {
          pageNumbers.unshift(
            <li key="ellipsis-start" className="ellipsis">
              ...
            </li>
          );
          pageNumbers.unshift(
            <li
              key={1}
              className={currentPage === 1 ? "active" : ""}
              onClick={() => {handlePageChange(1) }}
            >
              1
            </li>
          );
        }
      
        if (endPage < totalPages) {
          pageNumbers.push(
            <li key="ellipsis-end" className="ellipsis">
              ...
            </li>
          );
          pageNumbers.push(
            <li
              key={totalPages}
              className={currentPage === totalPages ? "active" : ""}
              onClick={() => {handlePageChange(totalPages)  }}
            >
              {totalPages}
            </li>
          );
        }
      
        return pageNumbers;
      };
    

    return(

        <div className="editProduct">
        {currentAdmin ? 
      (
        <>
            <section className="EDfirstsection">
                <div className="EDfirstcontainer">
                    <div className="EDcolumn-30 " onClick={scrollToTop}>
                        <iconbutton onClick={navigatetohome}><img src={home} className="grow"/></iconbutton>
                    </div>
                    
                    <div className="EDcolumn-30 right grow" onClick={scrollToTop}>
                        <button className='EDbacktbtn' onClick={() => navigate(-1)}>BACK</button>
                    </div>
                </div>
            </section>

            <section className="EDsecondsection">
                <div className="EDcenter-container">
                    <div className="EDsecondColumn-30 left">
                        <h1 className="EDh1Text">featured image</h1>
                        {fileOne?
                        <img src={xIcon} onClick={deleteImageOne} className='xIconOne'/>
                        :
                        null
                        }
                        <img src={fileOne} className='imgstyle'></img><br/><br/>
                        <label for="productImageOne" className="labelButton grow" onClick={handleOpenPopup}>
                            Upload Image
                        </label>

                        {popupOpen &&
                        <div className="mediaContainerOverlay">
                          <section className="mediaContainer">
                          <div>
                          <input className='EDinputMediaTwo' type='text' onChange={handleChangeOne} name='image' placeholder="Insert Image Link"></input>
                          </div>
                            <div className='mediacontainerOne '>
                                <h1 className='media'>Media</h1>
                                <h1 className='add'>Please Select You Image</h1>
                            </div>

                            <div className="EDcolumn-30Product  " onClick={scrollToTop}>
                            {checkbox?
                      <label for="uploadImage" className="mediaUploadButton ">
                                <img src={add} className="" style={{ opacity:'0.5' }}/>
                                <button
                                    name="image"
                                    id="uploadImage"
                                    className="fileButton"
                                    onClick={handleUplaod}
                                    disabled
                                />
                        </label>
                    :
                        <label for="uploadImage" className="mediaUploadButton grow">
                                <img src={add} className="grow"/>
                                <button
                                    name="image"
                                    id="uploadImage"
                                    className="fileButton"
                                    onClick={handleUplaod}
                                />
                        </label>
                    }
                                <iconbutton ><img src={dele} className="grow" onClick={()=>{setCheckbox(!checkbox)}}/></iconbutton>
                            </div>


                            <div className='mediacontaierTwo'>
                                {displayImage}
                            </div>

                            <div className="pagination">
                              {renderPageNumbers()}
                            </div> 

                            {checkbox?
                            <div className='mediacontainerThreeProduct'>
                                <button className='donebtn grow' onClick={handleDelete}>CONFIRM</button>
                                <button className='cancelbtn grow' onClick={()=>{setCheckbox(!checkbox)}}>CANCEL</button>
                            </div>
                            :
                            <div className='mediacontainerThreeProduct'>
                                <button className='cancelbtn grow' onClick={handleClosePopup}>CLOSE</button>
                            </div>
                            }
                        </section>
                        </div>
                        }
                        <br/><br/>
                        <h1 className="EDh1Text">Title</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="eventTitle"/>
                        <h1 className="EDh1Text">Type</h1>
                        <select className="selectStyles" onChange= {handleChange} name="type"> 
                            <option value="">Please Choose One</option>
                            {
                                Category && 
                                Category !== undefined ?
                                Category.map((optionCat,index) => {
                                    return(
                                        <option key={index} value={optionCat.name}>{optionCat.name}</option>
                                    )
                                })
                                : "No Category"
                            }
                        </select>

                        <h1 className="EDh1Text">Start Time</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="eventStartTime"/>

                        <h1 className="EDh1Text">End Time</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="eventEndTime"/>
{/* 
                        <h1 className="EDh1Text">ac</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="active"/> */}


                        

                    </div>
          
                    <div className="EDcolumn left">
                        <h1 className="EDh1Text">Location</h1>
                        <select className="selectStyles" onChange= {handleChange} name="location"> 
                            <option value="">Please Choose One</option>
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
                        <input type="text"  className="EDinput" onChange={handleChange} name="minPax"/>
                        
                        <h1 className="EDh1Text">Price</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="price"/>

                        <h1 className="EDh1Text">Price Worth</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="priceWorth"/>

                        <h1 className="EDh1Text">Time Slot</h1>
                        <input type="checkbox" value="1" name="availableMonday" onChange={handleChange}/><label>Monday</label>
                        <input type="checkbox" value="2" name="availableTuesday" onChange={handleChange}/><label>Tuesday</label>
                        <input type="checkbox" value="3" name="availableWednesday" onChange={handleChange}/><label>Wednesday</label>
                        <input type="checkbox" value="4" name="availableThursday" onChange={handleChange}/><label>Thursday</label>
                        <input type="checkbox" value="5" name="availableFriday" onChange={handleChange}/><label>Friday</label>
                        <input type="checkbox" value="6" name="availableSaturday" onChange={handleChange}/><label>Saturday</label>
                        <input type="checkbox" value="7" name="availableSunday" onChange={handleChange}/><label>Sunday</label>
                  
                        <h1 className="EDh1Text">Description</h1>
                        <textarea rows="3" cols="75"  className="EDinput" onChange={handleChange} name="description"/>
                    </div>
                </div>
            </section>

            <section className="EDthirdsection">
                <button className='EDbacktbtn grow' onClick={handleClick}>ADD</button>
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
import React, { useEffect } from "react";
import home from "../../Images/Home.svg"
import eye from '../../Images/Eye.svg'
import pencel from '../../Images/Pencel.svg'
import dele from '../../Images/Delete.svg'
import deleImage from '../../Images/delete.png'
import xIcon from '../../Images/xIcon.png'
import add from '../../Images/Add.svg'
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";

import Swal from 'sweetalert2'

import '../Admin/Edit.css'

export const UpdateQuestion = () => {
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL,});

  const [updateProduct, setUpdateProduct] = useState({
    location:"",
    questions:"",
    hintOne:"",
    hintTwo:"",
    answerA:"",
    answerB:"",
    answerC:"",
    answerD:"",
    answer:"",
    answerPhoto:"",
    referencePhoto:"",
    questionPhoto:"",
    category:"",
    mode:"",
    score:"",
  })

  const optionsLocation = [
    {id:"1",location:"Gat Lebuh Chulia"},
    {id:"2",location:"Gat Lebuh Gereja"},
    {id:"3",location:"Gat Lebuh Melayu"},
    {id:"4",location:"Jalan Argyll"},
    {id:"5",location:"Jalan Buckingham"},
    {id:"6",location:"Jalan Masjid Kapitan Keling"},
    {id:"7",location:"Jalan Tun Syed Sheh Barakbah"},
    {id:"8",location:"Lebuh Acheh"},
    {id:"9",location:"Lebuh Ah Quee"},
    {id:"10",location:"Lebuh Armenian"},
    {id:"11",location:"Lebuh Bishop"},
    {id:"12",location:"Lebuh Cannon"},
    {id:"13",location:"Lebuh Carnarvon"},
    {id:"14",location:"Lebuh China"},
    {id:"15",location:"Lebuh Chulia"},
    {id:"16",location:"Lebuh Farquhar"},
    {id:"17",location:"Lebuh Gereja"},
    {id:"18",location:"Lebuh Kimberly"},
    {id:"19",location:"Lebuh King"},
    {id:"20",location:"Lebuh Light"},
    {id:"21",location:"Lebuh Melayu"},
    {id:"22",location:"Lebuh Muntri"},
    {id:"23",location:"Lebuh Pantai"},
    {id:"24",location:"Lebuh Pasar"},
    {id:"25",location:"Lebuh Penang"},
    {id:"26",location:"Lebuh Queen"},
    {id:"27",location:"Lebuh Union"},
    {id:"28",location:"Lebuh Victoria"},
    {id:"29",location:"Lorong Carnarvon"},
    {id:"30",location:"Lorong China"},
    {id:"31",location:"Lorong Ikan"},
    {id:"32",location:"Lorong Prangin"},
    {id:"33",location:"Lorong Seckchuan"},
    {id:"34",location:"Love Lane"},
    {id:"35",location:"Pengkalan Weld"},
];

const optionsCategory = [
    {id:"1",category:"Fill in the blank"},
    {id:"2",category:"MCQ"},

];

      const[location, setLocation] = useState([]); 
      const[category, setCategory] = useState([]); 


      useEffect(()=>{
        setLocation(optionsLocation);
      },[]) 

      useEffect(()=>{
        setCategory(optionsCategory);
      },[]) 

    const scrollToTop = () => {
        window.scrollTo(0, 0)
      }

  const [activeImageOne , setActiveImageOne] = useState(true)
  const [activeImageTwo , setActiveImageTwo] = useState(true)
  const [activeImageThree , setActiveImageThree] = useState(true)
  
  const [productdata, setproductdata] = useState("")

  const locationData = useLocation();
  const questionId=locationData.state.question.id
  const [error,setError] = useState(false);


  const [fileOne, setFileOne] = useState('');

  const [fileTwo, setFileTwo] = useState('');

  const [fileThree, setFileThree] = useState('');


  useEffect(()=>{
    setCategory(optionsCategory);
  },[]) 

  const handleChange = (e) => {
    setUpdateProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/auth/getQuestion/${questionId}`);
        setproductdata(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [questionId]);

  const handleClick = async (e) => {

    if(updateProduct.questions==""){
        setUpdateProduct(updateProduct.questions=productdata.questions) 
    }
    if(updateProduct.location==""){
        setUpdateProduct(updateProduct.location=productdata.location) 
    }
    if(updateProduct.category==""){
        setUpdateProduct(updateProduct.category=productdata.category) 
    }
    if(updateProduct.mode==""){
        setUpdateProduct(updateProduct.mode=productdata.mode) 
    }
    if(updateProduct.score==""){
        setUpdateProduct(updateProduct.score=productdata.score) 
    }
    if(updateProduct.hintOne==""){
        setUpdateProduct(updateProduct.hintOne=productdata.hintOne) 
    }
    if(updateProduct.hintTwo==""){
        setUpdateProduct(updateProduct.hintTwo=productdata.hintTwo) 
    }
    if(updateProduct.answerA==""){
        setUpdateProduct(updateProduct.answerA=productdata.answerA) 
    }
    if(updateProduct.answerB==""){
        setUpdateProduct(updateProduct.answerB=productdata.answerB) 
    }
    if(updateProduct.answerC==""){
        setUpdateProduct(updateProduct.answerC=productdata.answerC) 
    }
    if(updateProduct.answerD==""){
        setUpdateProduct(updateProduct.answerD=productdata.answerD) 
    }
    if(updateProduct.answer==""){
        setUpdateProduct(updateProduct.answer=productdata.answer) 
    }
    
    if(activeImageOne==false && updateProduct.questionPhoto==""){
        setUpdateProduct(updateProduct.questionPhoto="")
      }
      else if(updateProduct.questionPhoto==""){
        setUpdateProduct(updateProduct.questionPhoto=productdata.questionPhoto)
      }else if(updateProduct.questionPhoto!==""){
        setUpdateProduct(updateProduct.questionPhoto=fileOne)
      }
  
      if(activeImageTwo==false && updateProduct.referencePhoto==""){
        setUpdateProduct(updateProduct.referencePhoto="")
      }
      else if(updateProduct.referencePhoto==""){
        setUpdateProduct(updateProduct.referencePhoto=productdata.referencePhoto)
      }else if(updateProduct.referencePhoto!==""){
        setUpdateProduct(updateProduct.referencePhoto=fileTwo)
      }
  
      if(activeImageThree==false && updateProduct.answerPhoto==""){
        setUpdateProduct(updateProduct.answerPhoto="")
      }
      else if(updateProduct.answerPhoto==""){
        setUpdateProduct(updateProduct.answerPhoto=productdata.answerPhoto)
      }else if(updateProduct.answerPhoto!==""){
        setUpdateProduct(updateProduct.answerPhoto=fileThree)
      }
    

    try {
      await axiosInstance.put(`/auth/updateQuestion/${questionId}`, updateProduct);
      Swal.fire({
        title: 'Edit Successfully',
        text: "Your question has been modified successfully. Press OK to continue.",
        width:'700px',
        height:'300px',
        
  
        confirmButtonText: 'OK',
        confirmButtonColor:"white",
  
        customClass:{
            confirmButton:'confirmButton',
            title:'title',
            popup:'popup',
            validationMessage:'title'
        },
  
        allowOutsideClick:false,
        }).then((result) => {
        if (result.isConfirmed) {
            navigate("/adminQuestion");
        }
        })
    } catch (err) {
      console.log(err);
      setError(true)
    }   
  };
  
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
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();
  const navigatetohome= () =>{
    navigate('/adminMainPage');
  };

  const deleteImageOne =  () => {
    // setActiveImageOne(false)
    setFileOne("")
    setproductdata(prevState => ({
      ...prevState,
      questionPhoto: ""
      }));
  }

  const deleteImageTwo =  () => {
    // setActiveImageTwo(false)
    setFileTwo("")
    setproductdata(prevState => ({
      ...prevState,
      referencePhoto: ""
      }));
  }

  const deleteImageThree =  () => {
    // setActiveImageThree(false)
    setFileThree("")
    setproductdata(prevState => ({
      ...prevState,
      answerPhoto: ""
      }));
  }

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTwoOpen, setPopupTwoOpen] = useState(false);
  const [popupThreeOpen, setPopupThreeOpen] = useState(false);

    const handleOpenPopup = () => {
      setPopupOpen(true);
      window.scrollTo(0,0)
    };
  
    const handleClosePopup = () => {
      setPopupOpen(false);
    };

    const handleOpenPopupTwo = () => {
      setPopupTwoOpen(true);
      window.scrollTo(0,0)
    };
  
    const handleClosePopupTwo = () => {
      setPopupTwoOpen(false);
    };

    const handleOpenPopupThree = () => {
    setPopupThreeOpen(true);
    window.scrollTo(0,0)
    };

    const handleClosePopupThree = () => {
    setPopupThreeOpen(false);
    };

    const [media, setMedia] = useState([]);
    const [mediaTwo, setMediaTwo] = useState([]);
    const [mediaThree, setMediaThree] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [uploadImage, setUploadImage] = useState({
      image:"",
    });

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

      useEffect(() => {
        fetchProducts();
      }, [currentPage]);

      const [checkbox, setCheckbox] = useState(false);  
    const [selectedIds, setSelectedIds] = useState([]);

    const handleCheckboxChange = (event) => {
      const id = event.target.value;
      if (event.target.checked) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
      }
    };

    const handleDeleteImage = async () => {
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
        setMediaTwo(response.data);
        setMediaThree(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const handleImageClick = (media) => { 
      if (media.image === productdata.questionPhoto) {
        setFileOne('')
        setproductdata(prevState => ({
          ...prevState,
          questionPhoto: ""
          }));
      } else if (!fileOne && !productdata.questionPhoto) {
        setFileOne(media.image);
        setproductdata(prevState => ({
          ...prevState,
          questionPhoto: media.image
          }));
      }
    };

    const handleImageClickTwo = (mediaTwo) => {
      if (mediaTwo.image === productdata.referencePhoto) {
        setFileTwo('')
        setproductdata(prevState => ({
          ...prevState,
          referencePhoto: ""
          }));
      } else if (!fileTwo && !productdata.referencePhoto) {
        setFileTwo(mediaTwo.image);
        setproductdata(prevState => ({
          ...prevState,
          referencePhoto: mediaTwo.image
          }));
      } 
    };

    const handleImageClickThree = (mediaThree) => {
        if (mediaThree.image === productdata.answerPhoto) {
          setFileThree('')
          setproductdata(prevState => ({
            ...prevState,
            answerPhoto: ""
            }));
        } else if (!fileThree && !productdata.answerPhoto) {
          setFileThree(mediaThree.image);
          setproductdata(prevState => ({
            ...prevState,
            answerPhoto: mediaThree.image
            }));
        } 
      };
    
    const displayImage = media.map((media) => {
      let counter = 0;

      if (media.image === productdata.questionPhoto ) {
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

    const displayImageTwo = mediaTwo.map((mediaTwo) => {
      let counterTwo = 0;

      if (mediaTwo.image === productdata.referencePhoto ) {
        counterTwo = 2;
      }

      return (
        <div className="inline" key={mediaTwo.id}>
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
            src={mediaTwo.image ? mediaTwo.image : null}
            className="mediaImage"
            onClick={() => handleImageClickTwo(mediaTwo)}
          />
          {checkbox?
          <></>
          :
          <>
          {counterTwo > 0 && (
            <div className="counterImage" >
              {counterTwo}
            </div>
          )}
          </>
          }
        </div>
      );
    });

    const displayImageThree = mediaThree.map((mediaThree) => {
        let counterThree = 0;
  
        if (mediaThree.image === productdata.answerPhoto ) {
          counterThree = 3;
        }
  
        return (
          <div className="inline" key={mediaThree.id}>
            {checkbox?
                <input
                  type="checkbox"
                  value={mediaThree.id}
                  onChange={handleCheckboxChange}
                  className='deleteCheckbox'
                />
                :
                null
                }
            <img
              src={mediaThree.image ? mediaThree.image : null}
              className="mediaImage"
              onClick={() => handleImageClickThree(mediaThree)}
            />
            {checkbox?
            <></>
            :
            <>
            {counterThree > 0 && (
              <div className="counterImage" >
                {counterThree}
              </div>
            )}
            </>
            }
          </div>
        );
      });
  

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
            <section className="EDfirstsection">
                <div className="EDfirstcontainer">
                    <div className="EDcolumn-30" onClick={scrollToTop}>
                        <iconbutton onClick={navigatetohome}><img src={home} className="grow"/></iconbutton>
                    </div>
                    
                    <div className="EDcolumn-30 right " onClick={scrollToTop}>
                        <button className='EDbacktbtn grow' onClick={() => navigate(-1)}>BACK</button>
                    </div>
                </div>
            </section>

            <section className="EDsecondsection">
                <div className="EDcenter-container">
                    <div className="EDsecondColumn-30 left">
                        <h1 className="EDh1Text">Question Image</h1>
                        {productdata.questionPhoto && activeImageOne==true || fileOne?
                        <img src={xIcon} onClick={deleteImageOne} className='xIconOne grow'/>
                        :
                        null
                        }
                        <img src={fileOne?fileOne:productdata.questionPhoto} className='imgstyle'></img><br/><br/>
                        <label for="productImageOne" className="labelButton grow" onClick={handleOpenPopup}>
                            Upload Image
                        </label>
                        
                        <h1 className="EDh1Text">Reference Image</h1>
                        {productdata.referencePhoto && activeImageTwo==true || fileTwo?
                        <img src={xIcon} onClick={deleteImageTwo} className='xIconOne grow'/>
                        :
                        null
                        }
                        <img src={fileTwo?fileTwo:productdata.referencePhoto} className='imgstyle'></img><br/><br/>
                        <label for="productImageOne" className="labelButton grow" onClick={handleOpenPopupTwo}>
                            Upload Image
                        </label>

                        <h1 className="EDh1Text">Answer Image</h1>
                        {productdata.answerPhoto && activeImageThree==true || fileThree?
                        <img src={xIcon} onClick={deleteImageThree} className='xIconOne grow'/>
                        :
                        null
                        }
                        <img src={fileThree?fileThree:productdata.answerPhoto} className='imgstyle'></img><br/><br/>
                        <label for="productImageOne" className="labelButton grow" onClick={handleOpenPopupThree}>
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
                                <iconbutton ><img src={deleImage} className="grow" onClick={()=>{setCheckbox(!checkbox)}}/></iconbutton>
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


                        {popupTwoOpen &&
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
                                <iconbutton ><img src={deleImage} className="grow" onClick={()=>{setCheckbox(!checkbox)}}/></iconbutton>
                            </div>


                            <div className='mediacontaierTwo'>
                                {displayImageTwo}
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
                                <button className='cancelbtn grow' onClick={handleClosePopupTwo}>CLOSE</button>
                            </div>
                            }
                        </section>
                        </div>
                        }

                        {popupThreeOpen &&
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
                                <iconbutton ><img src={deleImage} className="grow" onClick={()=>{setCheckbox(!checkbox)}}/></iconbutton>
                            </div>


                            <div className='mediacontaierTwo'>
                                {displayImageThree}
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
                                <button className='cancelbtn grow' onClick={handleClosePopupThree}>CLOSE</button>
                            </div>
                            }
                        </section>
                        </div>
                        }
                    </div>
          
                    <div className="EDcolumn left">
                        <h1 className="EDh1Text">Question Title</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="questions" defaultValue={productdata.questions}/>
                        
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

                        <h1 className="EDh1Text">Category</h1>
                        <select className="selectStyles" onChange= {handleChange} name="category"> 
                            <option value="">{productdata.category}</option>
                            {
                                category && 
                                category !== undefined ?
                                category.map((category,index) => {
                                    return(
                                        <option key={index} value={category.category}>{category.category}</option>
                                    )
                                })
                                : "No Category"
                            }
                        </select>

                        <h1 className="EDh1Text">Mode</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="mode" defaultValue={productdata.mode}/>

                        <h1 className="EDh1Text">Score</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="score" defaultValue={productdata.score}/>

                        <h1 className="EDh1Text">Hint One</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="hintOne" defaultValue={productdata.hintOne}/>

                        <h1 className="EDh1Text">Hint Two</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="hintTwo" defaultValue={productdata.hintTwo}/>

                        <h1 className="EDh1Text">Option A (MCQ Question)</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="answerA" defaultValue={productdata.answerA}/>

                        <h1 className="EDh1Text">Option B (MCQ Question)</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="answerB" defaultValue={productdata.answerB}/>

                        <h1 className="EDh1Text">Option C (MCQ Question)</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="answerC" defaultValue={productdata.answerC}/>

                        <h1 className="EDh1Text">Option D (MCQ Question)</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="answerD" defaultValue={productdata.answerD}/>

                        <h1 className="EDh1Text">Answer</h1>
                        <input type="text"  className="EDinput" onChange={handleChange} name="answer" defaultValue={productdata.answer}/>

                    </div>
                </div>
            </section>

            <section className="EDthirdsection">
                <button className='EDbacktbtn grow' onClick={handleClick}>UPDATE</button>
            </section>
        </div>
    )
}


    
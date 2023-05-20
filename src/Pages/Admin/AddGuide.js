import React,{useContext} from "react";
import home from "../../Images/Home.svg"
import xIcon from '../../Images/xIcon.png'
import add from '../../Images/Add.svg'
import dele from '../../Images/delete.png'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";

import Swal from 'sweetalert2'

import '../Admin/Edit.css'
import { AuthContext } from "../../Context/AuthContext";

export const AddGuide = () => {
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL,});
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }
    const [guide, setGuide] = useState({
        newsImage:"",
        title:"",
        postBy:"",
        description:""
  });

  const handleChange = (e) => {
    setGuide((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();

    try {
        await axiosInstance.post("/news/addNews", guide);
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
                navigate("/adminGuide");
            }
            })
    } catch (err) {
        console.log(err);
    }
    
}

  const {currentAdmin,adminLogout} = useContext(AuthContext);


  const navigate = useNavigate();
  const navigatetohome= () =>{
    navigate('/adminMainPage');
  };

  const [popupOpen, setPopupOpen] = useState(false);
  const [media, setMedia] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [fileOne, setFileOne] = useState('');
  const [uploadImage, setUploadImage] = useState({
    image:"",
    });

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
    
        useEffect(() => {
            fetchProducts();
        }, [currentPage,media]);
    
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
    
          const deleteImageOne =  () => {
            setFileOne("")
          }

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

                    <div className="EDcolumn-30 right">
                        <button className='EDbacktbtn grow' onClick={() => navigate(-1)}>BACK</button>
                    </div>
                </div>
            </section>

            <section className="EDsecondsection">
                <div className="ED2-center-container">
                {fileOne?
                        <img src={xIcon} onClick={deleteImageOne} className='xIconOneNews'/>
                        :
                        null
                        }
                    <img src={fileOne} className="guideImage" name="guideImage"/>
                    <label for="productImageOne" className="labelButton grow" onClick={handleOpenPopup}>
                            Upload Image
                        </label>
                        {popupOpen &&
                        <div className="mediaContainerOverlay">
                          <section className="mediaContainer">
                          <div>
                          <input className='EDinputMediaThree' type='text' onChange={handleChangeOne} name='image' placeholder="Insert Image Link"></input>
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
                    <section className="detailsection">
                        <div className="EDsecondColumn-30 left">
                            <h1 className="EDh1Text">author</h1>
                            <input type="text"  className="EDinput" onChange={handleChange} name="postBy"/>
                        </div>

                        <div className="EDcolumn left">
                            <h1 className="EDh1Text">title</h1>
                            {/* <p className="EDText">Cheese Cake</p> */}
                            <input type="text"  className="EDinput" onChange={handleChange} name="title"/>
                            <h1 className="EDh1TextTwo">DESCRIPTION (Use "\n" as a blank line)</h1>
                            {/* <p className="EDText">When I was first married there was a woman at my church who made the most incredible desserts. My favorite of her creations were her mini chocolate cheesecakes – they were as delicious as they were cute. She was generous enough to share her recipe with me.</p> */}
                            <textarea className="EDinput" onChange={handleChange} name="description"/>
                        </div>
                    </section>
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
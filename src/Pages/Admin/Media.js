import React,{useState,useContext,useEffect} from 'react'
import home from "../../Images/Home.svg"
import add from '../../Images/Add.svg'
import dele from '../../Images/delete.png'
import profile from '../../Images/Profile.svg'
import '../Admin/Admin.css'
import {Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import Swal from 'sweetalert2'

import axios from "axios";

export const Media = () => {
    const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL,});
    
    const navigate = useNavigate();

    const navigatetohome= () =>{
        navigate('/adminMainPage');
    };

    const {currentAdmin,adminLogout} = useContext(AuthContext);

    const scrollToTop = () => {
        window.scrollTo(0, 0)
      }

    const [fileOne, setFile] = useState('')

    const [data, setData] = useState([])

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [media, setMedia] = useState({
        image:"",
    });

    const handleChangeOne = async (e) => {
        setMedia((prev) => ({ ...prev, [e.target.name]: e.target.value }));    
    };

    const handleUplaod = async e => {
        try {
            await axiosInstance.post("/auth/uploadImage", media)
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
    
    const fetchProducts = async () => {
    try {
        const response = await axiosInstance.get("/auth/getAllImage", {
        params: {
            limit:18,
            page: currentPage,
        },
        });
        setData(response.data);
    } catch (error) {
        console.log(error);
    }
    };

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

    const displayImage = data
    .map(data => {
        return(
            <div className='inline' key={data.id}>
            {checkbox?
            <input
              type="checkbox"
              value={data.id}
              onChange={handleCheckboxChange}
              className='deleteCheckbox'
            />
            :
            null
            }
               
                <img src={data.image?data.image:null} className={`mediaImage ${checkbox?'':''}`}/>
            </div>
        )
    })
    
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

        <div className='admin'>
        {currentAdmin ? 
      (
        <>
            <section className="EDfirstsection">
                <div className="EDfirstcontainer">
                    <div className="EDcolumn-30 " onClick={scrollToTop}>
                        <iconbutton onClick={navigatetohome}><img src={home} className="grow"/></iconbutton>
                    </div>

                    <input className='EDinputMedia' type='text' onChange={handleChangeOne} name='image'></input>
                    
                    <div className="EDcolumn-30 right " onClick={scrollToTop}>
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
                </div>
            </section>

            <section>
                <div className='mediacontainerOneImage'>
                    <h1 className='media'>Media</h1>
                    <h1 className='add'>Insert the image link and click '+'</h1>
                </div>

                <div className='mediacontaierTwoImage'>
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
                null
                }

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
import React, { useEffect, useState,useContext} from "react";
import menu from "../../Images/Menu.svg"
import home from "../../Images/Home.svg"
import profile from '../../Images/Profile.svg'
import add from '../../Images/Add.svg'
import edit from '../../Images/Edit.svg'
import searchLogo from '../../Images/searchLogo.svg'
import filter from '../../Images/Filter.svg'
import flower from '../../Images/Flower.jpg'
import eye from '../../Images/Eye.svg'
import pencel from '../../Images/Pencel.svg'
import dele from '../../Images/Delete.svg'
import ReactPaginate from "react-paginate";
import '../Admin/AdminProduct.css'
import { Link,useNavigate,createSearchParams } from 'react-router-dom'

import axios from 'axios'
import { AuthContext } from "../../Context/AuthContext";

import Swal from 'sweetalert2'

export const AdminQuestion = () => {
    const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL,});
    
    const [question, setQuestion] = useState([]);
    const [pageNumber, setPageNumber] = useState(0)
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const {currentAdmin} = useContext(AuthContext);

    useEffect(() => {
      fetchProducts();
      }, [currentPage]);
      
      const fetchProducts = async () => {
      try {
          const response = await axiosInstance.get("/auth/getAllQuestion", {
          params: {
              limit:18,
              page: currentPage,
          },
          });
          setQuestion(response.data);
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
          const response = await axiosInstance.get("/auth/getAllQuestionTotalPages", {
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

    

    const handleDelete = async (id)=>{
        Swal.fire({
          title: 'Delete Product',
          text: "Are you sure you want to delete? Your Question will be cleared forever.",
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
              axiosInstance.delete(`/auth/deleteQuestion/${id}`);
            } catch (err) {
              console.log(err);
            }
              Swal.fire({
                title: 'Delete Successfully',
                text: "Your question has been removed successfully. Press OK to continue.",
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
          }
          })
    
      };

    const scrollToTop = () => {
        window.scrollTo(0, 0)
      }

      console.log(question)

    const displayProduct = question
        .filter((question)=>{
            if (searchTerm == ""){
                return question
            }else if(question.questions.replaceAll(/\s/g,'').toLowerCase().includes(searchTerm.toLowerCase().replaceAll(/\s/g,''))){
                return question
            }
        })
        .map(question => {
        return(
            <div className="questionContainer" key={question.id}><br/>
                <h2 className="questionTitle inline">{question.questions}</h2>
                <Link to={`/viewQuestion`} state={{ question:question }} onClick={scrollToTop}><iconbutton><img src={eye} className='grow'/></iconbutton></Link>
                <Link to={`/updateQuestion`} state={{ question:question }} onClick={scrollToTop}><iconbutton><img src={pencel} className='grow'/></iconbutton></Link>
                <iconbutton onClick={() => handleDelete(question.id)}><img src={dele} className='grow'/></iconbutton> 
            </div>    
        )
    })

    const changePage = ({selected}) =>{
        setPageNumber(selected)
    }

    const navigate = useNavigate();

    const navigatetohome= () =>{
        navigate('/adminMainPage');
    };

    const navigatetoadd= () =>{
        navigate('/addQuestion');
    };
    
    

    

    return(

        <div className="adminProduct">
        {currentAdmin ? 
      (
        <>
            <section className="APfirstsection">
                <div className="APfirstcontainer">
                    <iconbutton onClick={navigatetohome}><img src={home} className="grow"/></iconbutton>
                    <button className='backtbtn grow' onClick={() => navigate(-1)}>BACK</button>
                </div>
            </section>

            <section className='APsecondsection'>
                <div className='APcenter-container'>
                    <div className='APcontainer-2'>
                        <img src={flower} className='imgstyle'></img>
                        <div className='col-secondcontainer'>
                            <h1 className="h1Text">Questions</h1>
                            <p className='APwebtext'>manage and add new questions here</p>
                        </div>
                        <iconbutton onClick={navigatetoadd}><img src={add} className='APaddbtn grow'/></iconbutton>
                    </div>
                </div>
            </section>

            <section className='APthirdsection'>
                <div className='APthirdcontainer'>
                    <input className='APsearchinput' type='text' placeholder='SEARCH QUESTION...' onChange={event => {setSearchTerm(event.target.value)}}></input>
                    <iconbutton><img src={searchLogo} className='btn grow'/></iconbutton>
                    <iconbutton><img src={filter} className='btn grow'/></iconbutton>
                </div>
            </section>

            <div className='productContainer'>
                {displayProduct}
            </div>

            <div className="pagination">
              {renderPageNumbers()}
            </div> 
            </>
        ) : 
      (
        setTimeout(() => {
          navigate('/adminLogin')
        }, 3)
      )
      }
        </div>

    )

}
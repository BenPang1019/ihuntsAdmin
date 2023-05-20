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

export const ViewQuestion = () => {
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL,});


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

  const navigate = useNavigate();
  const navigatetohome= () =>{
    navigate('/adminMainPage');
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
                        <img src={productdata.questionPhoto} className='imgstyle'></img><br/><br/>
                        
                        <h1 className="EDh1Text">Reference Image</h1>
                        <img src={productdata.referencePhoto} className='imgstyle'></img><br/><br/>

                        <h1 className="EDh1Text">Answer Image</h1>
                        <img src={productdata.answerPhoto} className='imgstyle'></img><br/><br/>
                    </div>
          
                    <div className="EDcolumn left">
                        <h1 className="EDh1Text">Question Title</h1>
                        <input type="text"  className="EDinput" name="questions" defaultValue={productdata.questions} disabled/>
                        
                        <h1 className="EDh1Text">Location</h1>
                        <select className="selectStyles"  name="location"> 
                            <option value="">{productdata.location}</option>
                        </select>

                        <h1 className="EDh1Text">Category</h1>
                        <select className="selectStyles"  name="category"> 
                            <option value="">{productdata.category}</option>
                        </select>

                        <h1 className="EDh1Text">Mode</h1>
                        <input type="text"  className="EDinput"  name="mode" defaultValue={productdata.mode} disabled/>

                        <h1 className="EDh1Text">Score</h1>
                        <input type="text"  className="EDinput" name="score" defaultValue={productdata.score} disabled/>

                        <h1 className="EDh1Text">Hint One</h1>
                        <input type="text"  className="EDinput" name="hintOne" defaultValue={productdata.hintOne} disabled/>

                        <h1 className="EDh1Text">Hint Two</h1>
                        <input type="text"  className="EDinput" name="hintTwo" defaultValue={productdata.hintTwo} disabled/>

                        <h1 className="EDh1Text">Option A (MCQ Question)</h1>
                        <input type="text"  className="EDinput"  name="answerA" defaultValue={productdata.answerA} disabled/>

                        <h1 className="EDh1Text">Option B (MCQ Question)</h1>
                        <input type="text"  className="EDinput"  name="answerB" defaultValue={productdata.answerB} disabled/>

                        <h1 className="EDh1Text">Option C (MCQ Question)</h1>
                        <input type="text"  className="EDinput"  name="answerC" defaultValue={productdata.answerC} disabled/>

                        <h1 className="EDh1Text">Option D (MCQ Question)</h1>
                        <input type="text"  className="EDinput"  name="answerD" defaultValue={productdata.answerD} disabled/>

                        <h1 className="EDh1Text">Answer</h1>
                        <input type="text"  className="EDinput"  name="answer" defaultValue={productdata.answer} disabled/>

                    </div>
                </div>
            </section>
        </div>
    )
}


    
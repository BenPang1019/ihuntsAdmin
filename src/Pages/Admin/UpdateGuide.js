import React,{useContext} from "react";
import home from "../../Images/Home.svg"
import eye from '../../Images/Eye.svg'
import dele from '../../Images/Delete.svg'

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";

import Swal from 'sweetalert2'

import '../Admin/Edit.css'
import { AuthContext } from "../../Context/AuthContext";

export const UpdateGuide = () => {
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL,});

  const [guide, setGuide] = useState("");

  const [updateGuide, setUpdateGuide] = useState({
    newsImage:"",
    title:"",
    subTitle:"",
    postBy:"",
    description:""
   });

  const [fileOne, setFileOne] = useState('');

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

  const state = {
    file: null,
    base64URL: ""
  };

  const getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleChangeOne = (e) => {
    setUpdateGuide((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    let { file } = state;

    file = e.target.files[0];

    getBase64(file)
    .then(result => {
        file["base64"] = result;
        setFileOne(result)
    })
    .catch(err => {
        
    });
  };

  const handleChange = (e) => {
    setUpdateGuide((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async () => {
    if(updateGuide.newsImage==""){
        setUpdateGuide(updateGuide.newsImage=guide.newsImage)
    }else if(updateGuide.newsImage!==""){
        setUpdateGuide(updateGuide.newsImage=fileOne)
    }

    if(updateGuide.title==""){
        setUpdateGuide(updateGuide.title=guide.title)
    }

    if(updateGuide.subTitle==""){
        setUpdateGuide(updateGuide.subTitle=guide.subTitle)
    }

    if(updateGuide.description==""){
        setUpdateGuide(updateGuide.description=guide.description)
    }

    if(updateGuide.postBy==""){
        setUpdateGuide(updateGuide.postBy=guide.postBy)
    }

    try {
        await axiosInstance.put(`/product/updateGuide/${productId}`, updateGuide);
        Swal.fire({
          title: 'Edit Successfully',
          text: "Your product has been modified successfully. Press OK to continue.",
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
              navigate("/adminGuide");
          }
          })
      } catch (err) {
        console.log(err);
      }
  }

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
                        <Link to={`/viewGuide`} state={{ guide:location.state.guide }}><iconbutton><img src={eye} className="btnstyle grow"/></iconbutton></Link>
                        <iconbutton onClick={handleDelete}><img src={dele} className="btnstyle1 grow"/></iconbutton>
                    </div>

                    <div className="EDcolumn-30 right">
                        <button className='EDbacktbtn grow' onClick={() => navigate(-1)}>BACK</button>
                    </div>
                </div>
            </section>

            <section className="EDsecondsection">
                <div className="ED2-center-container">
                    <img src={fileOne?fileOne:guide.newsImage} className="guideImage" name="guideImage"/>
                    <br/><br/>
                    <label for="imageGuide" className="labelButton grow">
                                Upload Image
                            <input
                                id="imageGuide"
                                name="newsImage"
                                className="fileButton"
                                onChange={handleChangeOne}
                                type="file"
                                accept=".jpg, .jpeg, .png"
                            />
                    </label>
                    <section className="detailsection">
                        <div className="EDsecondColumn-30 left">
                            <h1 className="EDh1Text">author</h1>
                            <input type="text"  className="EDinput" onChange={handleChange} defaultValue={guide.postBy} name="postBy"/>
                        </div>

                        <div className="EDcolumn left">
                            <h1 className="EDh1Text">title</h1>
                            {/* <p className="EDText">Cheese Cake</p> */}
                            <input type="text"  className="EDinput" onChange={handleChange} defaultValue={guide.title} name="title"/>
                            <h1 className="EDh1Text">sub-title</h1>
                            {/* <p className="EDText">When I was first married there was a woman at my church who made the most incredible desserts. My favorite of her creations were her mini chocolate cheesecakes – they were as delicious as they were cute. She was generous enough to share her recipe with me.</p> */}
                            <input type="text"  className="EDinput" onChange={handleChange} defaultValue={guide.subTitle} name="subTitle"/>
                            <h1 className="EDh1TextTwo">DESCRIPTION (Use "\n" as a blank line)</h1>
                            {/* <p className="EDText">When I was first married there was a woman at my church who made the most incredible desserts. My favorite of her creations were her mini chocolate cheesecakes – they were as delicious as they were cute. She was generous enough to share her recipe with me.</p> */}
                            <textarea className="EDinput" onChange={handleChange} defaultValue={guide.description} name="description"/>
                        </div>
                    </section>
                </div>
            </section>

            <section className="EDthirdsection">
                <button className='EDbacktbtn grow' onClick={handleClick}>UPDATE</button>
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
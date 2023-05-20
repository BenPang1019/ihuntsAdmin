import React,{useContext} from "react";
import home from "../../Images/Home.svg"
import eye from '../../Images/Eye.svg'
import dele from '../../Images/Delete.svg'
import pencel from '../../Images/Pencel.svg'
import axios from "axios";
import flower from '../../Images/Flower.jpg'
import { useEffect, useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";

import Swal from 'sweetalert2'

import '../Admin/Edit.css'
import { AuthContext } from "../../Context/AuthContext";

export const RegisterUserDetails = () => {
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL,});

  const [userDetails, setUserDetails] = useState("");

  const location = useLocation();
  const id=location.state.user.id
  const uid=location.state.user.id
  const teamId = location.state.user.teamId

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/book/userDetails/${id}`);
        setUserDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const [ticket,setTicket]=useState([])
   
  useEffect(() => {
    const fetchData = async () => {
        try {
        const res = await axios.get(`/book/userTicket/${uid}`); 
            console.log(res)
            setTicket(res.data);
        } catch (err) {
        console.log(err);
        }
    };
    fetchData();
  }, []);

 console.log(ticket)

  const displayTicket = ticket
    .map(ticket => {
      return(
        <div key={ticket.uid}>
              <li className='userTicketTitle titleUserTicket inline'>{ticket.eventTitle}</li>
              <li className='userTicketTitle inline'>{ticket.date}</li>
        </div>
      )
  })

  const [teamMember,setTeamMember]=useState([])

  useEffect(() => {
    const fetchData = async () => {
        try {
        const res = await axiosInstance.get(`/book/userTeamMember/${teamId}`); 
            console.log(res)
            setTeamMember(res.data);
        } catch (err) {
        console.log(err);
        }
    };
    fetchData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const displayTeamMember = teamMember
    .map(teamMember => {
      return(
        <div className="userContainer" key={teamMember.id}><br/>
                <img src={flower} className='imgstyle inline'></img>
                 <h4 className="inline username">{teamMember.username}</h4>   
                <div className="inline iconContainerTwo">
                 {/* <Link to={``}  onClick={scrollToTop}><iconbutton><img src={eye} className='grow'/></iconbutton></Link>
                <Link to={``}  onClick={scrollToTop}><iconbutton><img src={pencel} className='grow'/></iconbutton></Link>
                <iconbutton ><img src={dele} className='grow'/></iconbutton>  */}
                </div>
            </div>    
      )
  })



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
                    <div className="EDcolumn-30 ">
                        <iconbutton onClick={navigatetohome}><img src={home} className="grow"/></iconbutton>
                    </div>

                    <div className="EDcolumn-40 ">
                        {/* <Link to={``} ><iconbutton><img src={pencel} className="btnstyle grow" /></iconbutton></Link>
                        <iconbutton ><img src={dele} className="btnstyle1 grow"/></iconbutton> */}
                    </div>

                    <div className="EDcolumn-30 right">
                        <button className='EDbacktbtn grow' onClick={() => navigate(-1)}>BACK</button>
                    </div>
                </div>
            </section>

            <section className="EDsecondsectionUser">
                <div className="userContainerOne">
                    <img src={flower} className='imgstyle inline'></img>
                    <h1 className="EDh1Text usernameUserDetails inline">Username</h1>
                    <span className="EDText usernameUserDetailsTwo inline">{location.state.user.username}</span>
                </div>

                <div className="userContainerTwo">
                    <h1 className="EDh1Text  ">Fullname</h1>
                    <span className="EDText  ">{location.state.user.fullname}</span>

                    <h1 className="EDh1Text  ">Email</h1>
                    <span className="EDText  ">{location.state.user.email}</span>

                    <h1 className="EDh1Text  ">Contact</h1>
                    <span className="EDText  ">{location.state.user.phone}</span>
                </div>
            </section>

            <section className="sectionTicket">
                <div>
                    <h1 className="inline event">Event</h1>
                    <h1 className="inline date">Date</h1>
                </div>
                <div>
                    {displayTicket}
                </div>
            </section>

            <section className="sectionTeam">
            <div style={{ textAlign:'center' }}>
            <h1>Team Member</h1>
            <h1>{location.state.user.teamId}</h1>
            </div>
            <div className='productContainer'>
                {displayTeamMember}
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
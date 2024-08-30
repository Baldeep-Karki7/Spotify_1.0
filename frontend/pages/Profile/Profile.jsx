import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopTracks from "../../components/TopTracks/TopTracks.jsx";
import './Profile.css';
import { getProfileData } from "../../controllers/index.js";


function Profile()
{
    const params = useParams();
    const token = params.token;
    const [name,setName] = useState(null);
    const [email,setEmail] = useState(null);
    const [country,setCountry] = useState(null);
    const [type,setType]= useState(null);
    const [imageUrl,setImageUrl] = useState();

    const profilePicStyle = {
        height : "80px",
        width : "80px",
    }
    
    useEffect(()=>
    {

        const populateUI = async()=>
        {
            const data = await getProfileData(token);
            setName(data.display_name);
            setEmail(data.email);
            setType(data.type);
            setCountry(data.country);
            setImageUrl(data.images[0].url);
        }

        populateUI();
       
    },[token]);


    return(
        <div className="container">
            <div className="top">
                <div className="left">
                    <img src={imageUrl} alt="profile pic"/>
                </div>

                <div className="right">
                    <div className="profile-title">Profile</div>
                    <div className="name">{name}</div>
                </div>
            </div>
             <TopTracks Token={token}/>
        </div>
    )

}
export default Profile
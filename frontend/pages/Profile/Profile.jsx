import React, { useContext, useState, useEffect } from "react";
import TopTracks from "../../components/TopTracks/TopTracks.jsx";
import './Profile.css';
import { tokenContext } from "../../src/App.jsx";


function Profile()
{
    const token = useContext(tokenContext);
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
        async function getData(Token)
        {
        try{
            const response = await fetch("https://api.spotify.com/v1/me",
                {
                    method : 'GET',
                    headers : {
                        Authorization : `Bearer ${Token}`  
                    }

                });
            const result = await response.json();
            console.log(result);
            return result;
        }
        catch(error)
        {
            console.log(error);
        }
        }

        const populateUI = async()=>
        {
            const data = await getData(token);
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
            <TopTracks/>
        </div>
    )

}
export default Profile
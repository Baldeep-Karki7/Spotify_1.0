import { useState,useContext,useEffect,createContext} from "react";
import { Link } from "react-router-dom";
import { tokenContext } from "../../src/App.jsx";
import { getProfileData } from "../../controllers/index.js";
import search from '../../src/assets/search-button-svgrepo-com.svg';
import './Home.css';
import TopResult from "../../components/TopResult/TopResult.jsx";
import SimSongs from "../../components/SimSongs/SimSongs.jsx";
import Artist from "../../components/Artist/Artist.jsx";
import Albums from "../../components/Albums/Albums.jsx";



function Home()
{   
    const access_token = useContext(tokenContext);
    const [value,setValue] = useState(null);
    const [query,setQuery] = useState(null);
    const [profileImg,setProfileImg] = useState();
    const [profileName,setProfileName] = useState();

    useEffect(()=>
    {
        const fetchProfile = async()=>
        {
            const response = await getProfileData(access_token);
            setProfileImg(response.images[0].url);
            setProfileName(response.display_name);
        }

        try{
            fetchProfile();
        }
        catch(error)
        {
            console.log(error);
        }
    },[access_token]);

    return(
        <div className="Home">
            {/*///////////////////////////////////////////// */}
            <div className="HomeTop">
                <div className="HomeTopLeft">
                    <div className="searchContainer">
                    <input type="text" placeholder="What do you want to play?" onChange={(e)=>
                        {setValue(e.target.value);}
                    } onKeyDown={(e)=>{
                        if(e.key === 'Enter'){
                            setQuery(value);}}
                    }/>
                    <img src={search} alt="search" className="searchBtn" />
                    </div>
                </div>

                <div className="HomeTopRight">
                      
                       <div className="HTR-profile-container">
                       <span className="HTR-name">{profileName}</span>
                         <img src={profileImg} alt="image" className="HTR-profile-image"/>
                       </div>
                </div>
            </div>
            {/*/////////////////////////////////////////// */}

            <div className="HomeMiddle-songs">
                 {value && <TopResult value={value}/>}
                 {!value && <TopResult/>}
                {value && <SimSongs value={value}/>}
                {!value && <SimSongs/>}
                </div>
            
          
                <div className="HomeMiddle-artist" >
                   {value && <Artist value={value}/>}
                   {!value && <Artist/>}
                </div>

                {<div className="HomeMiddle-Albums">
                    {value && <Albums value={value}/>}
                    {!value && <Albums/>}
                </div> }
        </div>

    )
}

export default Home
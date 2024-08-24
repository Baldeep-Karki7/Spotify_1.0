import { useState,useContext,useEffect,createContext} from "react";
import { tokenContext } from "../../src/App.jsx";
import search from '../../src/assets/search-button-svgrepo-com.svg';
import { getSong } from "../../controllers";
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
                </div>
            </div>
            {/*/////////////////////////////////////////// */}

            <div className="HomeMiddle">
                 {value && <TopResult value={value}/>}
                 {!value && <TopResult/>}
                {value && <SimSongs value={value}/>}
                {!value && <SimSongs/>}
                </div>
            
          
                <div className="HomeMiddle-artist" >
                   {value && <Artist value={value}/>}
                   {!value && <Artist/>}
                </div>

                <div className="HomeMiddle-Albums">
                    {value && <Albums value={value}/>}
                </div>
        </div>

    )
}

export default Home
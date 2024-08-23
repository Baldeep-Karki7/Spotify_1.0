import { useState,useContext,useEffect,createContext} from "react";
import { tokenContext } from "../../src/App.jsx";
import search from '../../src/assets/search-button-svgrepo-com.svg';
import { getSong } from "../../controllers";
import './Home.css';
import TopResult from "../../components/TopResult/TopResult.jsx";
import SimSongs from "../../components/SimSongs/SimSongs.jsx";
import Artist from "../../components/Artist/Artist.jsx";



function Home()
{   
    const access_token = useContext(tokenContext);
    const [value,setValue] = useState(null);
    const [query,setQuery] = useState(null);
    const [song,setSong] = useState(null);
    const [similarSongs,setSimilarSongs] = useState(null);


    useEffect(()=>
        {
            async function Song()
            {
                try{
                    const result = await getSong(value,access_token);
                    setSong(result[0]);
                    console.log(result[0]);
                    const simSongs = result.slice(0,4);
                    console.log(simSongs);
                    setSimilarSongs(simSongs);
                }
                catch(error)
                {
                    console.log(error); 
                }
            }
            Song();
        },[value]);


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
                <TopResult song={song}/>
                <SimSongs SimSongs={similarSongs}/>
                </div>
            
          
                <div className="HomeMiddle-artist" >
                   {value && <Artist value={value}/>}
                   {!value && <Artist/>}
                </div>
        </div>

    )
}

export default Home
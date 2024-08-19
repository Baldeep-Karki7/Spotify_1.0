import { useState,useEffect,useContext} from "react";
import { getTopTracks } from "../controllers";
import { tokenContext } from "../src/App";
import './TopTracks.css';

function TopTracks()
{
    const access_token = useContext(tokenContext);
    const [topTracks,setTopTracks] = useState([]);
    
    
    useEffect(()=>
        {
            const getTopTracks = async(id,accessToken)=>
                {
                    try{
                        const response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks`,
                            {
                                method : "GET",
                                headers : {
                                    Authorization : "Bearer "+ accessToken,
                                }
                            }
                        );
                        const result = await response.json();
                        return result;
                    }
                    catch(error)
                    {
                        console.log(error);
                    }
                }
    
            const populateTracks = async()=>
            {
                const data = await getTopTracks('06HL4z0CvFAxyc27GXpf02',access_token);
                if(data)
                {
                console.log(data);
                setTopTracks(data.tracks);
                } 
            }

            populateTracks();
                
        },[]);

    return(
        <div className="topTracksContainer">
            <div className="topTracks-title">
                <h1>Top Tracks Of : </h1> </div>
            <div className="topTracks">
            {
                topTracks.map((track,index)=>
                {
                    return(
                        <div key={index} className="track-card">
                            <p><img src={track.album.images[1].url} style={{
                                height : "200px",
                                width: "200px"
                            }}/></p>
                            <p>Song name : {track.name}</p>    
                        </div>
                    )
                })
            }
        </div>
        </div>
    )
}

export default TopTracks
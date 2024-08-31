import { useState,useEffect,useContext} from "react";
import { debounce } from "lodash";
import { Link } from 'react-router-dom';
import search from '../../src/assets/search.webp';
import { getArtistIdByName } from "../../controllers";
import playBtn from '../../src/assets/playBtn.png';
import homeBtn from '../../src/assets/spotify-home.png';
import './TopTracks.css';

function TopTracks({Token})
{
    const access_token = Token;
    const [topTracks,setTopTracks] = useState([]);
    const [artist,setArtist] = useState('shiloh');
    const [artistId,setArtistId] = useState('1wxPItEzr7U7rGSMPqZ25r');  //so that error doesnot come


     useEffect(()=>
        {
            const getId = debounce(async()=>
            {
                try{
                    const id = await getArtistIdByName(artist,access_token);
                    setArtistId(id);
                    console.log(id);
                }
                catch(error)
                {
                    console.log(error);
                }
            },200);

            getId();

            return ()=>getId.cancel();

        },[artist]);

    
    useEffect(()=>
        {
            const getTopTracks = async()=>
                {
                    try{
                        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
                            {
                                method : "GET",
                                headers : {
                                    "Authorization" : "Bearer "+ access_token,
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
                const data = await getTopTracks();
                if(data)
                {
                console.log(data);
                setTopTracks(data.tracks);
                } 
            }
            populateTracks();
        },[artistId]);



    return(
        access_token && <div className="topTracksContainer">
            <div className="topTracks-title">

                <div className="ttt-left">
                    <h1>Top Tracks Of : {function upper()
                    {
                        return artist.toUpperCase();
                    }()} </h1> 
                </div>


                <div className="ttt-right">

                    <div className="searchbar-container">
                    <input type="text" placeholder="Artist name" onChange={(e)=>
                        {
                            setArtist(e.target.value);
                        }
                    }/>
                    <button onClick={(e)=>
                        {
                            console.log(artist);
                        }
                    }><img src={search} alt="Search" style={{
                        width : "20px",
                        height : "20px"
                    }}/></button>
                    </div>
                    
                </div>
                </div>


            <div className="topTracks">
            {
                topTracks && topTracks.map((track,index)=>
                {
                    return(
                        <div key={index} className="track-card">
                            <p className="img-p"><img src={track.album.images[1].url} style={{
                                height : "200px",
                                width: "200px"
                            }}/> 
                                <a href={track.uri}><img src={playBtn} className="playButton"/></a>
                            </p>
                            <p className="trackName"> {track.name}</p>   
                            
                        </div>
                    )
                })
            }
        </div>
        </div>
    )
}

export default TopTracks
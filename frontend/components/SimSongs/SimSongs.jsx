import {useState, useEffect, useContext} from 'react';
import { tokenContext } from '../../src/App';
import { getSimilarSongs } from '../../controllers';
import { debounce } from 'lodash';
import './SimSongs.css';
import play from '../../src/assets/Polygon_1.png';


function SimSongs({value})
{
    const access_token = useContext(tokenContext);
    const [Value,setValue] = useState(value);
    const [similarSongs,setSimilarSongs] = useState();

    useEffect(()=>
    {
        setValue(value);
    },[value]);

    useEffect(()=>{
        const fetchSongs = debounce(async(token)=>  //as the fetchSong function is inside the useEffect it is recreated every time useEffect is fired, which is a waste of memory and causes ERROR : [maximum call size stack exceeded ] 
        {
            try{
                const response = await getSimilarSongs(Value,token);
                setSimilarSongs(response);
            }
            catch(error)
            {
                console.log(error);
            }
        },200);

        fetchSongs(access_token);

        return ()=>fetchSongs.cancel();  //debounce causes the function to be fired only after 200ms after the user stops typing -> reduces no of calls
        
        //fetchSongs.cancel ensures that if 'Value' changes before the debounce is over, the previous call is cancelled. //efficient memmory utilization
    },[Value]);

    function getDurationInMin(time)
    {
        //in milisecond
    
            const min = parseInt(parseInt(time) / (60*1000));
            const sec = parseInt(parseInt(time)/1000 - min * 60);
            
            return String(sec).length === 2 ? min +':'+sec : min +':0'+sec;
       
}
    return(
         <div className="simSongs">
            <h2 className='ss-title'>Songs</h2>
                {similarSongs && similarSongs.map((song,index)=>
                    {
                        return (<div className='simSongs-each' key={index}>
                            <div className="sse-left">
                                <img src={song.album.images[2].url} alt="image" className='songImage'/>
                                <a href={song.uri}><img src={play} className='play'/></a>
                            </div>
                            <div className="sse-middle">
                                <div className="sseM-top">{song.name}</div>
                                <div className="sseM-bottom"><span className='sseM-bottom-span'>{song.artists[0].name}</span></div>
                            </div>
                            <div className="sse-right">
                            <div className="sseR-left"><span>&#x2295;</span></div>
                            <div className="sseR-middle">{getDurationInMin(parseInt(song.duration_ms))}</div>
                            <div className="sseR-right"><span>&#8230;</span></div>
                            </div>
                        </div>);
                    })
                }
                </div>     
    );
}

export default SimSongs
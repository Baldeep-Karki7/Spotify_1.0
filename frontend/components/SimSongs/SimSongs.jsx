import './SimSongs.css';
import play from '../../src/assets/Polygon_1.png';

function SimSongs({SimSongs})
{

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
                { SimSongs && SimSongs.map((song,index)=>
                    {
                        return (<div className='simSongs-each' key={index}>
                            <div className="sse-left">
                                <img src={song.album.images[2].url} alt="image" className='songImage'/>
                                <img src={play} className='play'/>
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
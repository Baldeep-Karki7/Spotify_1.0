import {useState,useEffect,useContext} from 'react';
import playBtn from '../../src/assets/playBtn.png';
import './TopResult.css';

function TopResult({song})
{
    return(
        <div className="topResult">
            <div className='tR-header'>
            Top Result
            </div>
                    {song && <div className="tR-Main">

                       
                        <p className="imageContainer">
                         <img src={song.album.images[1].url}alt="image" />
                     </p>
                       
                        <p className="tR-songName">{song.name}</p>
                        <p className="tR-artist"><span className='tRa-left'>Song</span> &#x2022; <span className="tRa-right">{song.artists[0].name}</span></p>

                        <img src={playBtn} alt="play" className='tR-playBtn'/>
                    </div> }
                </div>
    )
}
export default TopResult
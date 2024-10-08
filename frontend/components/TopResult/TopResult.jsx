import {useState,useEffect,useContext} from 'react';
import playBtn from '../../src/assets/playBtn.png';
import { tokenContext } from '../../src/App';
import { getSong } from '../../controllers';
import {debounce} from 'lodash';
import './TopResult.css';

function TopResult({value})
{
    const access_token = useContext(tokenContext);
    const [Value,setValue] = useState(value);
    const [song,setSong ] = useState();

    useEffect(()=>
    {
        setValue(value);
    },[value]);

    useEffect(()=>
    {
        const getTopResult = debounce(async(token)=>
        {
            try{
                const response = await getSong(Value,token);
                console.log(response);
                setSong(response);
            }
            catch(error)
            {
                console.log(error);
            }
        },200);

        getTopResult(access_token);

        return ()=>getTopResult.cancel(); ///cleaning function if value of 'Value' changes before debounce is over//

    },[Value]);

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

                        <a href={song.uri}><img src={playBtn} alt="play" className='tR-playBtn'/></a>
                    </div> }
                </div>
    )
}
export default TopResult
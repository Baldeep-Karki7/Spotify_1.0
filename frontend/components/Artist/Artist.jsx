import { useState,useEffect, useContext} from 'react';
import { tokenContext } from '../../src/App';
import { getAllArtists } from '../../controllers';
import { dummyArtists } from '../../../dummy';
import {debounce} from 'lodash';
import btn from '../../src/assets/playBtn.png';
import noImage from '../../src/assets/noImage.png';
import './Artist.css';

function Artist({value})
{   
    const access_token = useContext(tokenContext);
    const [Value,setValue] = useState(value);
    const [artists,setArtists] = useState();

    useEffect(()=>
    {
        setValue(value);
    },[value]);

    useEffect(()=>
    {
        const fetchArtists = debounce(async(token)=>
        {
            try{
                const response = await getAllArtists(Value,token);
                const result = response.slice(0,7);
                setArtists(result);
            }
            catch(error)
            {
                console.log(error);
            }
        },200);

        fetchArtists(access_token);

        return()=> fetchArtists.cancel();
    },[Value]);


    return(
        <div className='all-Artists'>

            <div className='aA-header'><span>Artists</span></div>

            <div className="aA-main">
                {artists && artists.map((artist,index)=>
                {
                    return(<div className='each-artist' key={index}>
                        <p className='eA-image'>
                            {artist && artist.images && artist.images[1] ? (<img src={artist.images[1].url} alt="artist-image"/>):(<img src={noImage} alt="artist-image"/>)}
                            <img src={btn} alt="play" className='ea-playBtn'/>
                        </p>
                        <p className='eA-name'>{artist.name}</p>
                        <p className='eA-class'>Artist</p>
                    </div>);
                })}
            </div>
        </div>
    )
}
export default Artist
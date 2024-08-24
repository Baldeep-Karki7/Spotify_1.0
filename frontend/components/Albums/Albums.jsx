import { useEffect,useState, useContext} from 'react';
import { tokenContext } from '../../src/App';
import { getAllAlbums } from '../../controllers';
import './Albums.css';



function Albums({value})
{
    const access_token = useContext(tokenContext);

    return(
        <div className='all-Albums'>
            
        </div>
    )
}

export default Albums
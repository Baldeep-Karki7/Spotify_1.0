import { useEffect,useState, useContext} from 'react';
import { tokenContext } from '../../src/App';
import { getAllAlbums } from '../../controllers';
import {debounce} from 'lodash';
import btn from '../../src/assets/playBtn.png';
import './Albums.css';



function Albums({value})
{
    const access_token = useContext(tokenContext);
    const [Value,setValue] = useState(value);
    const [albums,setAlbums] = useState();

    useEffect(()=>
    {
        setValue(value);
    },[value]);

    useEffect(()=>
    {

        const fetchAlbums = debounce(async(token)=>
        {
            try{
                const response = await getAllAlbums(Value,token);
                console.log(response[0]);
                console.log(response);
                setAlbums(response);
            }
            catch(error)
            {
                console.log(error)
            }
        },200);

        fetchAlbums(access_token);

        return ()=>fetchAlbums.cancel();
    },[Value]);

    function fetchAlbumName(name)
    {
        return name.length <=30 ? name : name.slice(0,25)+'...';
    }

    function fetchArtists(Album)
    {
        let name ='';
        const artists = Album.artists;
        artists.forEach((artist)=>
        {
            if(artist === artists[artists.length - 1])
            {
                name = name + artist.name;
            }
            else
            {
                name = name + artist.name + ', ';
            }
        });

        return name;
    }

    function fetchDate(Album)
    {
        const date = Album.release_date.slice(0,4);
        return date;
    }



    return(
        <div className='all-Albums'>
            <div className='Albums-header'><span>Albums</span></div>

        <div className="Albums-main">
            {albums && albums.map((album,index)=>
            {
                return(<div className='each-album' key={index}>
                    <p className='eAl-image'>
                        {album && album.images && album.images[1] ? (<img src={album.images[1].url} alt="album-image"/>):(<img src={noImage} alt="album-image"/>)}
                        <a href={album.uri}><img src={btn} alt="play" className='eAl-playBtn'/></a>
                    </p>
                    <p className='eAl-name'>{fetchAlbumName(album.name)}</p>
                    <p className='eAl-artists'><span className='date'>{fetchDate(album)}</span> &#x2022; <span className='eAl-footer-artist'>{fetchArtists(album)}</span>
                    </p>
                </div>);
            })}
        </div>
        </div>
    )
}

export default Albums
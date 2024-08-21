const getResponse = async(name,token,type)=>
    {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${name}&type=${type}`,
            {
                method: 'GET',
                headers : {
                    Authorization : 'Bearer '+token,
                }
            }
        );
    
        const data = await response.json();
        return data;
    }
    

export const getArtistIdByName = async(name,token,type)=>
{
    try{
        const result = await getResponse(name,token,type);
        return (await result.artists.items[0].id);
    }
    catch(error)
    {
        console.log(error);
    }
}

export const getSong = async(name,token,type="track")=>
{
    try{
        const response = await getResponse(name,token,type);
        const result = await response.tracks.items;
        return result;
    }
    catch(error)
    {
        console.log(error);
    }
}




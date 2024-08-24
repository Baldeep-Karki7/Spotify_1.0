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
        return response.tracks.items[0];
    }
    catch(error)
    {
        console.log(error);
    }
}

export const getSimilarSongs = async(name,token,type="track")=>
{
    try{
        const response = await getResponse(name,token,type);
        const result =  response.tracks.items.slice(0,4);
        return result;
    }
    catch(error)
    {
        console.log(error);
    }
}

export const getAllArtists = async(name,token,type="artist")=>
{
    try{
        const response = await getResponse(name,token,type);
        return (response.artists.items);
    }
    catch(error)
    {
        console.log(error);
    }
}



export const getAllAlbums = async(name,token,type="album")=>
{
    try{
        const response = await getResponse(name,token,type);
        const result = await response.albums.items;
        return result;
    }
    catch(error)
    {
        console.log(error);
    }
}

console.log(await getSimilarSongs('matsuri','BQCcxowUzUh0AL6LciIewm0wEZNZYzoiqjxp4IP9fXGd6ygf234Af6weNpSeWu8sJ2wLfsEu8DlVGC_VIa9MRcszG2HIkKCe8-C_0X_0_AUlWeBcT_Ehlu9yMicbosjQGjN_Sa-9aoCQP_itw81QmBh4nahsAARhnlbGcuWUSvULpXS1V7q34Xv85hEgOp_axBheIkEX2uZXmaZSu70BiYRipRmHUsR2-fT6'));





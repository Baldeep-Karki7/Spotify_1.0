export const getTopTracks = async(id,access_token)=>
{
    try{
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks`,
            {
                method : "GET",
                headers : {
                    Authorization : "Bearer "+ access_token,
                }
            }
        );
        const result = await response.json();
        console.log(result);
    }
    catch(error)
    {
        console.log(error);
    }
}


import { useEffect,useState} from "react";
import Profile from "./Profile";

function App(){

  const [accessToken,setAccessToken] = useState(null);
  const [refreshToken,setRefreshToken] = useState(null);
  const [expiresIn,setExpiresIn] = useState(null);

  useEffect(()=>
  {
    const queryString  = location.search;
    const params = new URLSearchParams(queryString);
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');
    const expires_in = params.get('expires_in');

    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    setExpiresIn(expires_in);
  },[]);

  useEffect(()=>
  {
    if(!refreshToken || !expiresIn)
    {
      return;
    }
    
  
    const interval = setInterval(()=>
    {
      const refresh = async()=>
        {
          const url = new URL('http://localhost:4000/api/refresh');
          url.searchParams.append("refresh_token",refreshToken);
    
          try{
            const response =await  fetch(url);
            const data = await response.json();

            if(!response.ok)
            {
              throw new Error("Error in client side useEffect");
            }

            setRefreshToken(data.refresh_token);
            setExpiresIn(data.expires_in);
            setAccessToken(data.access_token);

            console.log("refresh_token_new",data);
          }
          catch(error)
          {
            console.log(error);
          }
        }
        
        refresh();
    },(expiresIn-60)*1000);

    return ()=>clearInterval(interval);



  },[refreshToken],[expiresIn]);

 

  

  return(
   (accessToken &&
    <div>
    <Profile access_token={accessToken}/>
    </div>
   )
  )
}
export default App
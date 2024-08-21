const express = require('express'); 
const cors = require('cors');
const querystring = require('querystring');
require('dotenv').config({path : '../.env'});
const crypto = require('crypto');

const app = express();
const PORT = 4000;
app.use(cors());

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
let generatedState ='';

app.get('/',(req,res)=>
{
    res.send('Welcome').status(200);
});


//authorization 
app.get('/authorize',(req,res)=>
    {
        generatedState= crypto.randomBytes(16).toString('hex');
        const scope = 'user-read-private user-read-email user-modify-playback-state user-read-playback-state user-read-currently-playing';
    
        res.redirect('https://accounts.spotify.com/authorize?'+querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: 'http://localhost:4000/success',
            state: generatedState
        }));
    });


//callback of authorization
app.get('/success',async(req,res)=>
{
    const {code,state} = req.query;
    if(state === generatedState)
    {
        try{
            const response = await fetch('https://accounts.spotify.com/api/token',{
                method : 'POST',
                body : new URLSearchParams({
                    code: code,
                    redirect_uri: 'http://localhost:4000/success',
                    grant_type: 'authorization_code'
                }),
                headers : {
                    "Content-Type" : 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
                }
            });

            const result = await response.json();
            console.log(result);

            res.redirect('http://localhost:5173/?'+querystring.stringify(
                {
                    access_token : result.access_token,
                    refresh_token : result.refresh_token,
                    expires_in : result.expires_in
                }
            ));
        }
        catch(error)
        {
            console.log(error);
        }
    }
    else
    {
        res.json({
            message : "Authorization failed !!"
        }).status(400);
    }
    
});

app.get('/api/refresh',async(req,res)=>
{
    try{
        const refresh_token = req.query.refresh_token;

        const response = await fetch('https://accounts.spotify.com/api/token',
            {
                method : 'POST',
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded",
                    "Authorization" : 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
                },
                body : new URLSearchParams({
                    grant_type : 'refresh_token',
                    refresh_token : refresh_token
                }),
            });

        if(!response.ok)
        {
            throw new Error("Error in getting new token_ server side");
        }

        const data = await response.json();
        if(!data.refresh_token)
        {
            data.refresh_token = refresh_token
        }
        console.log(data);
        res.json(data).status(200);
        
    }
    catch(error)
    {
        console.log(error);
    }
});



app.listen(PORT,()=>
{
    console.log('server running at 4000\n');
})
import axios from "axios";

export default async function handler(req, res) {
  const redirect_uri = process.env.REDIRECT_HOST+'/auth';
  console.log('process.env',process.env)
  
  const base_url = 'https://api.tdameritrade.com/v1';

  try {
    const response = await axios.post(base_url + "/oauth2/token", {form: {
      grant_type: "authorization_code",
      access_type: "offline",
      code: req.query.code, // get the code from url
      client_id: process.env.CLIENT_ID + "@AMER.OAUTHAP", // client id stored in heroku
      redirect_uri: redirect_uri,
    }}, {headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }});

    console.log("API Response:", response.data);
    res.send(response.data);
  } catch (error) {
    console.error('API Error:',error?.response?.data);
    res.json(error?.response?.data);
  } 

}
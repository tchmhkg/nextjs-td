import axios from "axios";
import url from 'url';

// Moved to pages/auth
export default async function handler(req, res) {
  const redirect_uri = process.env.REDIRECT_HOST+'/auth';
  
  const base_url = 'https://api.tdameritrade.com/v1';

  const apiUrl = base_url + "/oauth2/token"

  const data = {
    grant_type: "authorization_code",
    access_type: "offline",
    code: decodeURIComponent(req.query.code || ''),
    client_id: process.env.CLIENT_ID + "@AMER.OAUTHAP",
    redirect_uri: redirect_uri
  }
  const params = new url.URLSearchParams(data);

  console.log('Params:',params);
  console.log("Url:",apiUrl);

  try {
    const response = await axios.post(apiUrl, params);

    console.log("API Response:", response.data);
    res.send(response.data);
  } catch (error) {
    console.error('API Error:',error?.response?.data);
    res.json(error?.response?.data);
  } 

}
import axios from "axios";

export default async function handler(req, res) {
  const redirect_uri = process.env.REDIRECT_HOST+'/auth';
  
  const base_url = 'https://api.tdameritrade.com/v1';

  const query = `?grant_type=authorization_code&refresh_token=&access_type=offline&code=${encodeURIComponent(req.query.code || '')}&client_id=${encodeURIComponent(process.env.CLIENT_ID + "@AMER.OAUTHAP")}&redirect_uri=${encodeURIComponent(redirect_uri)}`
  console.log('Query:',query);

  try {
    const response = await axios.post(base_url + "/oauth2/token" + query, {}, {headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }});

    console.log("API Response:", response.data);
    res.send(response.data);
  } catch (error) {
    console.error('API Error:',error?.response?.data);
    res.json(error?.response?.data);
  } 

}
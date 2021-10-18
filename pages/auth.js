import axios from "axios";
import url from "url";
import React from "react";

const AuthPage = ({data = {}}) => {
  return (
    <span id="auth_response" className="auth-response">
      {JSON.stringify(data)}
      <style jsx>{`
        .auth-response {
          display: none;
        }
      `}</style>
    </span>
  );
};

export default AuthPage;

// This gets called on every request
export async function getServerSideProps({query}) {
  if (!query.code) {
    return {props: {notFound: true}};
  }
  const redirect_uri = process.env.REDIRECT_HOST + "/auth";

  const base_url = "https://api.tdameritrade.com/v1";

  const apiUrl = base_url + "/oauth2/token";

  const data = {
    grant_type: "authorization_code",
    access_type: "offline",
    code: decodeURIComponent(query.code || ""),
    client_id: process.env.CLIENT_ID + "@AMER.OAUTHAP",
    redirect_uri: redirect_uri,
  };
  const params = new url.URLSearchParams(data);

  console.log("Params:", params);
  console.log("Url:", apiUrl);

  try {
    const response = await axios.post(apiUrl, params);

    console.log("API Response:", response.data);
    return {props: {data: response.data}};
  } catch (error) {
    console.error("API Error:", error?.response?.data);
    return {props: {data: error?.response?.data}};
  }
}

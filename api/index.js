const express = require("express");
const request = require("request");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const SERVER_PORT = 9000;

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = `http://localhost:3000/auth/callback`;

let access_token;

const generateRandomString = (length) => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

app.get("/api/auth/login", (_, res) => {
  const scope = "streaming user-read-email user-read-private"
  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state: state
  });

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, access_token, Accept"
  );
  res.redirect("https://accounts.spotify.com/authorize/?" + auth_query_parameters.toString());
})

app.get("/api/auth/callback", (req, res) => {
  const code = req.query.code;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      grant_type: "authorization_code"
    },
    headers: {
      "Authorization": "Basic " + (Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString("base64")),
      "Content-Type" : "application/x-www-form-urlencoded"
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      res.redirect("/")
    }
  });
})


app.get("/api/auth/token", (_, res) => {
  res.json({ access_token: access_token})
})

if(process.env.NODE_ENV === "development") {
  app.listen(SERVER_PORT, () => console.log("server is running!"));
}

module.exports = app;

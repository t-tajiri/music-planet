import { useEffect, useState } from "react";

type Props = {
  token: string
}

export const WebPlayBack: React.VFC<Props> = ({ token }) => {
  const [player, setPlayer] = useState({} as Spotify.Player);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {

      const spotifyPlayer = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      setPlayer(spotifyPlayer);

      spotifyPlayer.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      spotifyPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      spotifyPlayer.connect();
    };
  }, [token]);

  return (
    <>
      <div className="container">
        <div className="main-wrapper">
          Login Success!
        </div>
      </div>
    </>
  );
}

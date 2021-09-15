import { useState, useEffect } from "react";
import { Login } from "./components/Login";
import { WebPlayBack } from "./components/WebPlayBack";

export const App: React.VFC = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []);

  return (
    <>
        { (token === "" || token === undefined ) ? <Login /> : <WebPlayBack token={token} /> }
    </>
  );
}

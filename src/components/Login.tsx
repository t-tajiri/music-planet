export const Login: React.VFC = () => {
  //TODO use ajax request and solve CORS problem.
  let href;
  if(process.env.NODE_ENV === "development") {
    href = "http://localhost:9000/auth/login";
  } else {
    href = window.location.origin + "/auth/login"
  }

  return (
    <div className="App">
      <header className="App-header">
        <a className="btn-spotify" href={ href }>
          Login with Spotify
        </a>
      </header>
    </div>
  );
}

import { useState } from "react";
import GithubAuthFb from "./components/GithubAuthFb";
import GoogleAuthFb from "./components/GoogleAuthFb";

function App() {
  const [prov, setProv] = useState("");

  return (
    <div>
      {prov === "" ? (
        <div>
          <GoogleAuthFb setProv={setProv} /> <GithubAuthFb />
        </div>
      ) : prov === "google" ? (
        <GoogleAuthFb setProv={setProv} />
      ) : (
        <GithubAuthFb />
      )}
    </div>
  );
}

export default App;

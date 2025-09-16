import { app } from "../firebase";
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { signInWithRedirect } from "firebase/auth";
import { useEffect } from "react";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

function GoogleAuthFb() {
  async function handleSign() {
    await signInWithRedirect(auth, provider);
    console.log("hi");
  }

  useEffect(() => {
    console.log("hi");

    async function run() {
      await getRedirectResult(auth)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access Google APIs.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          console.log(credential);
          // const token = credential.accessToken;

          // The signed-in user info.
          const user = result.user;
          console.log("User:", user);
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // // Handle Errors here.
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // // The email of the user's account used.
          // const email = error.customData.email;
          // // The AuthCredential type that was used.
          // const credential = GoogleAuthProvider.credentialFromError(error);
          // // ...
        });
    }
    run();
  }, []);
  return <button onClick={handleSign}>GoogleAuthFb</button>;
}

export default GoogleAuthFb;

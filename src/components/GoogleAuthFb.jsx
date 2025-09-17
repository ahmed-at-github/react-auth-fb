import { app } from "../firebase";
import {
  getAuth,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

function handleOut() {
  signOut(auth);
}
function GoogleAuthFb() {
  async function handleSign() {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log(user);
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  }

  return (
    <div>
      <button onClick={handleSign}>GoogleAuthFb</button>
      <button onClick={handleOut}>Signout</button>
    </div>
  );
}

export default GoogleAuthFb;

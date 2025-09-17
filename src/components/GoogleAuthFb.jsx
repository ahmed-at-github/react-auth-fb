import { useState, useEffect } from "react";
import { app } from "../firebase";
import {
  getAuth,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

function GoogleAuthFb({ setProv }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    photo: "",
  });

  // const {currentUser} = useAuthContext();

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  // console.log(currentUser);

  function handleOut() {
    signOut(auth);
    localStorage.clear();
    setUser({
    name: "",
    email: "",
    photo: "",
  })
  setProv("")
  }
  async function handleSign() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        setUser({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        });
        setProv("google");

        let obj = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };
     
        localStorage.setItem("user", JSON.stringify(obj));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    let g = localStorage.getItem("user");
    g = JSON.parse(g);
    console.log(g);
    if(g){
      setUser(g)
      setProv("google")
    }
  }, []);

  return (
    <div>
      {!user.name ? (
        <div>
          <button onClick={handleSign}>GoogleAuthFb</button>
          <button onClick={handleOut}>Signout</button>
        </div>
      ) : (
        <div className="">
          <h1>{user?.name}</h1>
          <img src={user?.photo} alt="User" />
          <p>{user?.email}</p>
          <button onClick={handleOut}>Signout</button>
        </div>
      )}
    </div>
  );
}

export default GoogleAuthFb;

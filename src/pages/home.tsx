import { useState } from "react";
import styles from "./home.module.scss";

export default function Home() {
  let email;
  if (typeof localStorage !== "undefined") {
    if (localStorage.getItem("email")) {
      email = localStorage.getItem("email");
    }
  }

  const [isSignedIn, setIsSignedIn] = useState(!!email);
  const splittedEmail = email?.split("@") ?? null;

  const handleSignOut = () => {
    localStorage.removeItem("email");
    setIsSignedIn(false);
  };

  return (
    <div className={styles.homePage}>
      {isSignedIn ? (
        <div className={styles.topBar}>
          <h2>{splittedEmail[0]}</h2>
          <button className={styles.signOutButton} onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      ) : (
        <h2>Hello</h2>
      )}
    </div>
  );
}

import { useState } from "react";
import styles from "./home.module.scss";
import localization from "../localizationConfig";

export default function Home() {
  let email;
  if (typeof localStorage !== "undefined") {
    if (localStorage.getItem(localization.email)) {
      email = localStorage.getItem(localization.email);
    }
  }

  const [isSignedIn, setIsSignedIn] = useState(!!email);
  const splittedEmail = email?.split("@") ?? null;

  const handleSignOut = () => {
    localStorage.removeItem(localization.email);
    setIsSignedIn(false);
  };

  return (
    <div className={styles.homePage}>
      {isSignedIn ? (
        <div className={styles.topBar}>
          <h2>{splittedEmail[0]}</h2>
          <button className={styles.signOutButton} onClick={handleSignOut}>
            {localization.signOut}
          </button>
        </div>
      ) : (
        <h2>{localization.hello}</h2>
      )}
    </div>
  );
}

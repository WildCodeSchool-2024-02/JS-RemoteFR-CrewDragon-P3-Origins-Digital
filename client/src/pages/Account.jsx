import { useEffect } from "react";

import AccountForm from "../components/AccountForm";

function Account() {
  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="account-container">
      <h2 className="tittle-account">
        S'enregistrer sur <strong> Origins Digital</strong>{" "}
      </h2>
      <AccountForm />
    </div>
  );
}

export default Account;

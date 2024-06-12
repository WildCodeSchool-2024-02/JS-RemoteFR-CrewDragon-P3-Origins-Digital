import { useEffect } from "react";

import ContactForm from "../components/ContactForm";

function Contact() {
  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="login-container">
      <h2 className="tittle-login">
        <strong>Contactez nous</strong>
      </h2>
      <ContactForm />
    </div>
  );
}

export default Contact;

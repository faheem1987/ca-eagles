import React from "react";
import { FaYoutube, FaFacebook } from "react-icons/fa";

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <span className="legal">
        ©2020 Ca Eagles Cricket Team, Fremont, California.
      </span>
      <span className="footer-icons">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/groups/caeagles.bayarea"
        >
          <FaFacebook />
        </a>

        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.youtube.com/channel/UCTcKyA3E0Sq2OAr5HowAkcQ"
        >
          <FaYoutube />
        </a>
      </span>
    </div>
  </footer>
);

export default Footer;

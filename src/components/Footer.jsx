import React from "react";
import styles from "../components/Footer.module.css";
// Footer do site, todas informaçoes do site no rodape
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3>Escreva sobre o que você tem interesse!</h3>
      <p>Magé Noticias &copy; 2022</p>
    </footer>
  );
};

export default Footer;

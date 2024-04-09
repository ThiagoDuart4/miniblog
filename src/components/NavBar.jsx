import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../components/NavBar.module.css";
import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { useState, useEffect } from "react";

const NavBar = () => {
  const { user } = useAuthValue();

  const [adminUser, setadminUser] = useState("");
  const { logout } = useAuthentication();

  useEffect(() => {
    try {
      // Defina adminUser com o email do usuário se o usuário estiver definido
      if (user) {
        setadminUser(user.email);
      }
    } catch (error) {
      console.error("Erro ao definir o adminUser:", error);
    }
  }, [user]);

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Magé<span>News</span>
      </NavLink>

      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Inicio
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/registrar"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastre-se
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>

        {user && (
          <li>
            <NavLink
              to="/posts/create"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Criar Postagem
            </NavLink>
          </li>
        )}

        {adminUser === "arteslima123@outlook.com" && (
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Insights page
            </NavLink>
          </li>
        )}

        {user && (
          <li>
            <button
              onClick={() => {
                logout();
                window.location.reload();
              }}
            >
              Sair
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

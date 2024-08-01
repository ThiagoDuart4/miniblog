// Sistema de navegação front do site
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../components/NavBar.module.css";
import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { useState, useEffect } from "react";


const NavBar = () => {
  // Informaçoes do meu usuario vindo do firebase
  const { user } = useAuthValue();
// Estado do meu usuario
  const [adminUser, setadminUser] = useState("");
  // Hook para logout do meu usuario
  const { logout } = useAuthentication();

  // Aqui estou verificando, olhando as informaçoes que estao indo pra USER que vem do meu banco la no Firebase, verificando se meu user existir, para setar o email do usuario no useState (adiminUser) para poder usar ele em outras  areas.
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

        {/* se o usuario nao existir ele tem acesso a essas paginas */}
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

{/* QUando ele cria a pag ele pode postar e criar  */}
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

{/* VERIFICANDO EMAIL DO USUARIO PREDETERMINADO,apenas o user que tiver esse email podera acessar o dashboard*/}
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
{/*  da a posibilidade do usuario sair de sua conta */}
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

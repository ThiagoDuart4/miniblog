// Hooks de autentificação dp usuario 

// chamando o firebase para o react reconhecer
import { db } from "../firebase/config";

// importando alguns parametos utilizado para pegar as informaçoes no firebase

import {
  // Pegando a autentificação do usuarip
  getAuth,
  // Utilizado para criar um usuario
  createUserWithEmailAndPassword,
  // utilizado para que verifique se há um usuario e assim liberar ele para acessar, ou seja, fazer login
  signInWithEmailAndPassword,
  //  Atualização
  updateProfile,
  // Sair do site
  signOut,
} from "firebase/auth";

// useState
import { useState, useEffect } from "react";

//  Criando uma constante de autentificação e ja exportando ela.

export const useAuthentication = () => {
  // Verificação de possivel erro, sistema de carregamento e limpeza de dados
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(null);

  // recuperando o paramentro do firebase e colocando em uma constante
  const auth = getAuth();

  // limpeza de dados
  function checkifIsCancelled() {
    if (cancelled) {
      return;
    }
  }
// Criação du usuario
  const createUser = async (data) => {
    //  limpeza de dados, carregamento e verificação de possiveis erros.
    checkifIsCancelled();

    setLoading(true);
    setErr(null);

    // aqui estou enviando um objeto user com a função de criar para o firebase, criando e enviando, email, password e name
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.name,
      });
    } 
  catch (err) {
      console.log(err.message);
      console.log(typeof err.message);

      // verificando o erro dessa requisição e enviando para o user Err
      let systemErrorMessage;

      if (err.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (err.message.includes("email-already")) {
        systemErrorMessage = "E-mail ja cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um error, por favor tente mais tarde";
      }

      setErr(systemErrorMessage);
    }

    setLoading(false);
  };

  // LOgout, deslogaNDO USUARIO

  const logout = () => {
    checkifIsCancelled();

    signOut(auth);
  };

  // lOGIN 

  const login = async (data) => {
    checkifIsCancelled();

    setLoading(true);
    setErr(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Usuario ou senha incorretos";
      } else if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuario ou senha incorreto";
      } else {
        systemErrorMessage = "Ocorreu um error, por favor tente mais tarde";
      }

      setErr(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return {
    auth,
    createUser,
    err,
    loading,
    login,
    logout,
  };
};

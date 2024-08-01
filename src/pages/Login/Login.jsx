import React from "react";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "../Login/Login.module.css";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [err, setErr] = useState("");

  const { login, err: authErr, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      password,
      email,
    };

    setErr("");

    const res = await login(user);
    console.log(res);
  };
  useEffect(() => {
    if (authErr) {
      setErr(authErr);
    }
  }, [authErr]);

  return (
    <div className={styles.Login}>
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>

        {!loading && (
          <button type="submit" className="btn">
            {" "}
            Enviar
          </button>
        )}
        {loading && (
          <button type="submit" className="btn" disabled>
            {" "}
            aguarde...
          </button>
        )}
        {err && <p className="error">{err}</p>}
      </form>
    </div>
  );
};

export default Login;

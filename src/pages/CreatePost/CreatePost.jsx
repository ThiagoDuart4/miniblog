import React from "react";
import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { set } from "firebase/database";

import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");
  const [formError, setFormError] = useState("");
  const [loading,setLoading] = useState('')

const {insertDocument,response} = useInsertDocument()
const {user} = useAuthValue()

console.log(response.error)
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('')

    insertDocument({
      title,
      image,
      body,
      tag,
      uid:user.uid,
      createdBy:user.displayName
    })
  };
  return (
    <div className={styles.CreatePost}>
      <h2>Criar Post</h2>
      <p>Compartilhe aqui os melhores momentos do nosso culto Start</p>

      <form>
        <label>
          Titulo
          <input
            type="text"
            name="title"
            required
            placeholder="Pense em um bom titulo..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <label>
          Imagem
          <input
            type="text"
            name="imagem"
            required
            placeholder="Insira aqui a URL da imagem..."
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </label>
        <label>
          Conteúdo
          <textarea
            name="body"
            required
            placeholder="Insira o conteudo do POST..."
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></textarea>
        </label>
        <label>
          tags
          <input
            type="text"
            name="title"
            required
            placeholder="Pense em um bom"
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
            }}
          />
        </label>

        {!response.loading && <button type="submit"> Enviar</button>}
        {response.loading && (
          <button type="submit" disabled>
            {" "}
            aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
       
      </form>
    </div>
  );
};

export default CreatePost;

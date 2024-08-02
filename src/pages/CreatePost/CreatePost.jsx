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
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");


const {insertDocument,response} = useInsertDocument('posts')
const {user} = useAuthValue()

console.log(user)
const navigate = useNavigate()


const handleSubmit = async (e) => {
  e.preventDefault();
  setFormError('');

  let error = '';

  // Validate the image URL
  try {
      new URL(image);
  } catch (error) {
      error = 'Insira uma URL no campo IMAGE';
      setFormError(error);
  }

  // Split and clean tags
  const tagsArray = tags.split(',').map(tag => tag.trim().toLocaleLowerCase());

  // Check for empty fields
  if (!title || !image || !tags || !body) {
      error = 'Por favor, preencha todos os campos!';
      setFormError(error);
  }

  // If there's any error, prevent form submission
  if (error) {
      return;
  }

  // Insert document if no errors
  insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
  });

   navigate("/")
};
  return (
    <div className={styles.CreatePost}>
      <h2>Criar Post</h2>
      <p>Compartilhe aqui os melhores momentos do nosso culto Start</p>

      <form onSubmit={handleSubmit}>
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
            placeholder="Pense em uma tag...."
            value={tags}
            onChange={(e) => {
              setTags(e.target.value);
            }}
          />
        </label>

        {!response.loading && <button className="btn">Criar post!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde.. .
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;

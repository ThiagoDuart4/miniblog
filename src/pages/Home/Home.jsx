import React from "react";
import styles from "../Home/Home.module.css";

import { useNavigate,Link } from "react-router-dom";

import { useState } from "react";
import { useFetchDocuments } from '../../hooks/useFetchDocument';
import LoadPosts from '../../components/LoadPost'



const Home = () => {


  const [query,setQuery] = useState('')

   const Navigate = useNavigate()

 const {documents:posts,loading} = useFetchDocuments('posts')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (query) {
       return Navigate(`/search?q=${query}`)
    }
    else alert('tags inwxistente')

  }

  
  return (
    <div className={styles.home}>
 <h1> Veja  os nosos post mais recentes</h1>
 <form className={styles.search_form} onSubmit={handleSubmit}>
  <input type="text" placeholder="Ou busque por tags" onChange={(e)=>{
    setQuery(e.target.value)
  }} />
  <button className="btn btn dark">Pesquisar</button>
 </form>
 <div>  {loading && <p> carregando...</p>}
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id}>
             <LoadPosts post ={post} />
            </div>
          ))
        ) : (
          <div className={styles.noposts}>
            <p>não foram encontrados posts</p>
            <Link to='/posts/create' className="btn btn dark">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

import { useFetchDocuments } from "../../hooks/useFetchDocument";
import { useQuery } from "../../hooks/useQuery";

import { Link } from "react-router-dom";
import LoadPost from "../../components/LoadPost";
 import style from '../Search/search.module.css'
import { useState } from "react";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={style.search_container}> 

    <h1>Resultado de busca</h1>
      {posts && posts.length === 0 && (
        <>
          <p>Não foi encontrado nenhum post</p>
          <Link to="/" className="btn btn dark">
            {" "}
            Voltar
          </Link>
        </>
      )}

      {posts && posts.map((post) => (
        <LoadPost  key={post.id} post={post}/>
      )
     
      )}
    </div>
  );
};

export default Search;

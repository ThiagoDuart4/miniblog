import React from "react";
import style from "../components/LoadPost.module.css"
import { Link } from "react-router-dom";

const LoadPost = ({ post }) => {


  const createdAtDate = post.createdAt.toDate();
  const formattedDate = createdAtDate.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const formattedTime = createdAtDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className={style.post_detail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={style.createdby} >{post.createdBy}  {formattedDate} {formattedTime} </p>

    
      <p>{post.body}</p>

      <div className={style.tags}>
        {post.tagsArray &&
          post.tagsArray.map((tag) => (
            <p key={tag}>
              <span>#</span>
              {tag}
            </p>
            
          ))}
 
      </div>
      <Link to ={'/posts/${post.id}'} className="btn btn-outline"> Ler mais</Link>
    </div>
  );
};
export default LoadPost;

import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";

import { doc,deleteDoc} from "firebase/firestore";

// estado inicial do meu reduce
const initalState = {
  loading: null,
  error: null,
};
// reducer
const deletereducer = (state, action) => {
    // pegando a ação vinda do
    switch (action.type) {
        case 'LOADING':
            return {loading:true , error:null};
        case 'DELETED_DOC':
            return {loading:false,error:null}
        case 'ERROR':
            return {loading:false,error:action.payload}
    
        default:
          return state; 
    }
};



export const useDeleteDocument = (docCollection) => {


  
  const [response, dispach] = useReducer(deletereducer, initalState);

  //  MEMORY LEAK EVITANDO VAZAMENTO DE DADOS
  const [cancelled, setCancelled] = useState(false);
  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispach(action);
    }
  };

  
  const deleteDocument = async (id) => {



    checkCancelBeforeDispatch({ type: "LOADING" });
    try {
            const deleteDocument = await deleteDoc(doc(db,docCollection,id))
      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deleteDocument,
      });

  
    } catch (error) {

        checkCancelBeforeDispatch({
            type: "ERROR",
            payload: error.message,
          });
    }
  };

useEffect(()=>{
    return() =>{
        setCancelled(true)
    }
},[])

  return {deleteDocument,response}
};

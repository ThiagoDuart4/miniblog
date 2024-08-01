import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";

import { collection, addDoc, Timestamp } from "firebase/firestore";

// estado inicial do meu reduce
const initalState = {
  loading: null,
  error: null,
};
// reducer
const insertreducer = (state, action) => {
    // pegando a ação vinda do
    switch (action.type) {
        case 'LOADING':
            return {loading:true , error:null};
        case 'INSERT_DOC':
            return {loading:false,error:null}
        case 'ERROR':
            return {loading:false,error:action.payload}
    
        default:
          return state; 
    }
};


// RESGATANDO OS MEUS DOCUMENTOS E INSERINDO
export const useInsertDocument = (docCollection) => {


  // RECEBENDO  OS DOCUMENTOS DE FORA, PEGANDO COMO UM ARRAY, PEGANDO A RESPOSTA E A AÇÃO, E ENVIANDO PRO NOSSO REDUCER O STATE INICIAL E O MEU DISPACH PARA DETERMINAR O QUE FAZER DENTRO DO MEU REDUCER BASEADO NESSA FUNÇÃO.
  const [response, dispach] = useReducer(insertreducer, initalState);

  //  MEMORY LEAK EVITANDO VAZAMENTO DE DADOS
  const [cancelled, setCancelled] = useState(false);
  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispach(action);
    }
  };

// Aqui, definimos uma função chamada insertDocument, que é responsável por inserir um novo documento na coleção do Firebase.  
  const insertDocument = async (document) => {



    checkCancelBeforeDispatch({ type: "LOADING" });
    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };

      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      checkCancelBeforeDispatch({
        type: "INSERT_DOC",
        payload: insertedDocument,
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

  return {insertDocument,response}
};

// import { useState, useEffect, useReducer } from "react";
// import { db } from "../firebase/config";
// import { collection, addDoc, Timestamp } from "firebase/firestore";


// // iniciando como nulo, tanto loading e error
// const initialState = {
//   loading: null,
//   error: null,
// };

// // INICIANDO MEU REDUCER, quero que dependendo de um estado que tiver, realize uma ação para mim
// const insertReducer = (state, action) => {
//   switch (action.type) {
//     // caso ainda estiver carregando
//     case "LOADING":
//       return { loading: true, error: null };
//       // caso o documento for inserido
//     case "INSERTED_DOC":
//       return { loading: false, error: null };
//       // caso dê algum erro
//     case "ERROR":
//       return { loading: false, error: action.payload };
//     default:
//       return state;

//   }
// };

// // incio do hook de inserir dados no firebase

// export const useInsertDocument = (docCollection) => {
//   const [response, dispatch] = useReducer(insertReducer, initialState);

// // evitando memory leak
//   const [cancelled, setCancelled] = useState(false);

//   const checkCancelBeforeDispatch = (action) => {
//     if (!cancelled) {
//       dispatch(action);
//     }
//   };

//   const insertDocument = async (document) => {
//     checkCancelBeforeDispatch({ type: "LOADING" });

//     try {
//       const newDocument = { ...document, createdAt: Timestamp.now() };

//       const insertedDocument = await addDoc(
//         collection(db, docCollection),
//         newDocument
//       );

//       checkCancelBeforeDispatch({
//         type: "INSERTED_DOC",
//         payload: insertedDocument,
//       });
//     } catch (error) {
//       checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
//     }
//   };

//   useEffect(() => {
//     return () => setCancelled(true);
//   }, []);

//   return { insertDocument, response };
// };
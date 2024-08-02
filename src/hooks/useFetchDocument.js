import { useState, useEffect } from "react";
import { db } from "../firebase/config";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;
      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;

// verificando se existe algo dentro de search
        if (search) {
      //  verificando se dentro das minhas coleçoes do firebase se dentro do meu array tags baseado pelo parametro array contain que me ajuda a procurarnd dentro desse array e verificar se realmente existe o que tem dentro de search, e comm isso ordenando de forma descendente, do mais novo pro mais velho.
          q = await query( collectionRef, where('tagsArray','array-contains',search),
        orderBy('createdAt', 'desc')
        )
        }
    else {
      q = await query(collectionRef, orderBy("createdAt", "desc"));

    }
        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    }
    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(()=>{
   return()=> setCancelled(true)
  },[])

  return { documents,loading
   ,error
 }

};

import { db } from '../firebase/config'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(null)

  const [cancelled, setCancelled] = useState(null)

  const auth = getAuth()


  function checkifIsCancelled() {
    if (cancelled) {
      return
    }
  }


  const createUser = async (data) => {
    checkifIsCancelled()

    setLoading(true)
    setErr(null)

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await updateProfile(user, {
        name: data.name
      })

    } catch (err) {

      console.log(err.message)
      console.log(typeof err.message)

 let  systemErrorMessage

      if(err.message.includes('Password')){
        systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres.'
      }
      else  if(err.message.includes('email-already')){
        systemErrorMessage = 'E-mail ja cadastrado.'
      }
      else{
        systemErrorMessage = 'Ocorreu um error, por favor tente mais tarde'
      }

   setErr(systemErrorMessage)
    }
   
    setLoading(false)
  }

  useEffect(() => {
    return () => { setCancelled(true) }
  }, [])



  return {
    auth,
    createUser,
    err,
    loading
  }
}


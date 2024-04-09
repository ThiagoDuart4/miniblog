import React from 'react'
import styles from '../Register/Register.module.css'
import { useState,useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

const Register = () => {
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const [confirmPassword,setconfirmPassword] = useState('')
  const [err,setErr] = useState('')

  const {createUser,err:authErr,loading} = useAuthentication();

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const user = {     
      name,
      password,
      email,
      confirmPassword}
 
      setErr('')

      if (password  !== confirmPassword ) {
        setErr('Senhas diferentes')
      }

      const res = await  createUser(user)
      console.log(res)
    
  }
  useEffect(() =>{
    if (authErr) {
      setErr(authErr)
    }
  },[authErr])

  return (

    <div className={styles.register}>
      <h1>Cadastre-se</h1>
      <form onSubmit={handleSubmit} >
        <label >
          Name:
          <input type="text" name='name' required placeholder='Nome' onChange={(e) =>{setName( e.target.value)} } />
        </label>
        <label>
          Email:
          <input type="email" name='email' required placeholder='Email'  onChange={(e) =>{setEmail( e.target.value)} } />
        </label>
        <label>
         Password:
          <input type="password" name='password' required placeholder='Password'  onChange={(e) =>{setPassword( e.target.value)} }/>
        </label>
       
        <label>
          Confirm Password:
          <input type="password" name='password' required placeholder='password'  onChange={(e) =>{setconfirmPassword( e.target.value)} } />
        </label>
        {!loading &&  <button type='submit'> Enviar</button>}
        {loading &&  <button type='submit' disabled> aguarde...</button>}
      {err && <p className='error'>{err}</p>}
      </form>
    </div>
  )
}

export default Register
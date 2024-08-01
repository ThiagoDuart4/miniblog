
import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"

import Home from './pages/Home/Home';
import Search from './pages/Search/search';
import About from './pages/About/About';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
// Visualiza o state real do usuario la no firebase

import { onAuthStateChanged } from 'firebase/auth';

import { useState,useEffect } from 'react';

import { useAuthentication } from './hooks/useAuthentication';

import { AuthProvider } from './context/AuthContext';

import  NavBar from "./components/NavBar"
import  Footer from "./components/Footer"
import { set } from 'firebase/database';



function App() {

  const [user,setUser] = useState()
  const{auth} = useAuthentication()

useEffect(()=>{
 onAuthStateChanged(auth,(user)=>{
  setUser(user)
 })
},[auth])

  const loadingUser = user === undefined

  if(loadingUser) {
return <p>Carregando...</p>
  }



  return (
    <div className="App">
       <AuthProvider value={{user}}>
       <BrowserRouter>
        <NavBar/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/login' element={!user  ? <Login/> : <Navigate to="/"/>}/>
              <Route path='/registrar' element={!user ? <Register/> : <Navigate to ='/'/>}/>
              <Route path='/posts/create' element={ user ? <CreatePost/>: <Navigate to ='/'/>}/>
              <Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to ='/'/>}/>
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
       </AuthProvider>
    </div>
  );
}

export default App;

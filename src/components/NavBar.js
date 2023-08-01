import React from 'react'
import {NavLink} from "react-router-dom"
import styles from '../components/NavBar.module.css'

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
        <NavLink to ="/" className={styles.brand}>
            Mini <span>Blog</span>
        </NavLink>

            <ul className={styles.links_list}>
                <li>
                    <NavLink  to= "/" className={({isActive}) => (isActive ? styles.active : '')}>Home</NavLink>
                </li>
                <li>
                    <NavLink  to= "/login" className={({isActive}) => (isActive ? styles.active : '')}>Login</NavLink>
                </li>
                <li>
                    <NavLink  to= "/registrar" className={({isActive}) => (isActive ? styles.active : '')}>registrar</NavLink>
                </li>
                <li>
                    <NavLink  to= "/about"   className={({isActive}) => (isActive ? styles.active : '')}>Sobre</NavLink>
                </li>
            </ul>
    </nav>
  )
}

export default NavBar
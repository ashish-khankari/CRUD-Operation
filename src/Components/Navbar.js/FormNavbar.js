import React from 'react'
import './FormNavbar.css'
import { Link } from 'react-router-dom'

export default function FormNavbar() {
  return (
    <div className="navContainer">
        <p className="logo">CRUD</p>
        <Link  to={"/userDetails"}><button className="routerBtn">User Details</button></Link>
    </div>
  )
}

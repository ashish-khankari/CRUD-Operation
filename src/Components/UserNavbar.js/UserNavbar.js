import React from 'react'
import './UserNavbar.css'
import { Link } from 'react-router-dom'

export default function UserNavbar() {
  return (
    <div>
        <div className="userContainer">
        <p className="logo">CRUD</p>
        <Link  to={"/"}><button className="routerBtn">Add New User</button></Link>
    </div>
    </div>
  )
}

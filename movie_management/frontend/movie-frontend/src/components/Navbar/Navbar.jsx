import React from 'react'
import { Link } from 'react-router'


export default function
    () {
    return (
        <div>
            <h1>Movie Manager</h1>
            <nav>
                <Link to="/add">add movie</Link>
                <Link to="/">movie list</Link>
            </nav>
        </div>
    )
}

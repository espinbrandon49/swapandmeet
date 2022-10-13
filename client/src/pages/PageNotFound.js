import React from 'react'
import {Link} from "react-router-dom"

const PageNotFound = () => {
  return (
    <div className='container text-center'>
      <h1 className='display-3' >PageNotFound</h1><br/>
      <h2 className='display-3'>¯\_(ツ)_/¯</h2>
      <h3>Try this link: <Link to="/">Home Page</Link></h3>

      </div>
  )
}

export default PageNotFound
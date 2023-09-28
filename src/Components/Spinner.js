import React from 'react'
import loading from './pokeball-loader.gif'


export default function Spinner() {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
    <img src={loading} alt="loading" />
    </div>
  )
}

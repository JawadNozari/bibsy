import React from 'react'
import Link from 'next/link'

export default function register() {
  return (
    <div className=' object-center'>
      <div class="object-none object-center w-24 h-24">
        <h1 style={{background:'red', padding: 10, width: 120,}}>Register</h1>
        <input type="text"  placeholder='E-postadress' style={{color:'black'}}/>
        <input type="text" placeholder="Create Username" style={{color:'black'}}/>
        <input type="password" placeholder="Create Password" style={{color:'black'}} />
        <button style={{background:'green', padding: 10, width: 120, }} > <Link href='/login'> Continue </Link></button>
      </div>
    </div>
  )
}

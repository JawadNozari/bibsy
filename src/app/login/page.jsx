//client side rendering
'use clitent'

import React from 'react'
import Link from 'next/link'

export default function loginPage () {
return (
  <div class="object-none object-center w-24 h-24">
    <h1 style={{background:'red'}}>Login Page</h1>
    <input type="text" placeholder="Username" style={{color:'black'}}/>
    <input type="password" placeholder="Password" style={{color:'black'}} />
    <button style={{background:'green'}}> <Link href='/'> Login </Link> </button>
    <button style={{background:'blue'}}> <Link href='/login/register'> Register </Link></button>
  </div>
);
}
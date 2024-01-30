'use client';
import Image from 'next/image'
import { SetStateAction, useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

const page = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false) 

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked)
  }

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
    <div className="h-screen w-screen bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
      <div className="h-full w-2/4 relative flex justify-center items-center">
        <Image
          src="/login.png"
          alt="Login page"
          layout="fill"
          objectFit="cover"
          className="rounded-lg h-full w-full"
        />
        <div className='w-2/5 h-2/5 bg-black opacity-50 relative -top-10  flex rounded-lg'>

        <div className="absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Användarnamn"
              className="p-2 border rounded bg-black focus:outline-none focus:ring-2 focus:ring-purple-600"
              id="username"
            />
            <div className="flex items-center"> 
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Lösenord"
                className="p-2 border rounded bg-black focus:outline-none focus:ring-2 focus:ring-purple-600"
                id="password"
              />
              <button type="button" onClick={handleShowPasswordChange} className="ml-2"> 
                {showPassword ? <EyeOffIcon className="h-6 w-6 text-gray-800" /> : <EyeIcon className="h-6 w-6 text-gray-800" />}
              </button>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={remember}
                onChange={handleRememberChange}
                className="mr-2"
                id="remember"
              />
              <label htmlFor="remember" className="text-gray-800">Remember Me</label>
            </div>
            <button type="submit" className="p-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-800">
              Logga in
            </button>
          </form>
        </div>
      </div>
    </div>
        </div>
    </ThemeProvider>
  )
}

export default page

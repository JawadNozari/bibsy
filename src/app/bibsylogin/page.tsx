"use client";
import Image from "next/image";
import {  useState } from "react";
import { ThemeProvider } from "next-themes";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const showPasswordClass = "peer h-10 w-full border-0 border-b-2 text-white border-gray-300 outline-none focus:border-rose-500 bg-transparent placeholder-transparent";
const hidePasswordClass = "peer h-10 w-full border-0 border-b-2 text-white border-gray-300 outline-none focus:border-rose-500 bg-transparent placeholder-transparent hidden";

const labelClass = "absolute left-0 -top-3.5 text-white peer-placeholder-shown:text-gray-400  peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all duration-500 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm";

const Page = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
          <div className='w-2/5 h-2/5 bg-black opacity-78 relative bottom-12  flex rounded-lg p-[8.5rem]'>
            <div className="absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div className="relative h-11 mb-6">
                  <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Användarnamn"
                    className={showPasswordClass}
                    id="username"
                    required
                    autoComplete="off"
                  />
                  <label
                    htmlFor="username"
                    className={labelClass}
                  >
                    Användarnamn
                  </label>
                </div>
                <div className="relative h-11 mb-6 flex items-center">
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Lösenord"
                    className={showPassword ? hidePasswordClass : showPasswordClass}
                    id="password"
                    required
                    autoComplete="off"
                  />
                  <input
                    type="text"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Lösenord"
                    className={showPassword ? showPasswordClass : hidePasswordClass}
                    id="password"
                    required
                    autoComplete="off"
                  />
                  <button type="button" onClick={handleShowPasswordChange} className="ml-2 absolute right-0">
                    {showPassword ? <EyeOffIcon className="h-6 w-6 text-white " /> : <EyeIcon className="h-6 w-6 text-white" />}
                  </button>
                  <label
                    htmlFor="password"
                    className={labelClass}
                  >
                    Lösenord
                  </label>
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
  );
};

export default Page;

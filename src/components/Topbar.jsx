import React, { useState, useEffect } from 'react'
import logo from '@/assets/images/LogB.png'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { MdInfoOutline, MdLogin, MdMenu, MdOutlineMenuOpen, MdOutlineWebStories, MdPerson, MdSettings ,MdSettingsBrightness,MdSwitchAccessShortcut} from "react-icons/md";
import SearchBox from './SearchBox';
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from '@/helpers/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import usericon from '@/assets/images/user.png'

import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoLogOutOutline, IoSearch } from "react-icons/io5";
import { removeUser } from '@/redux/user/user.slice';
import { showToast } from '@/helpers/showToast';
import { getEvn } from '@/helpers/getEnv';
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from './ui/sidebar';


const Topbar = () => {
    const { toggleSidebar } = useSidebar()

    const [showSearch, setShowSearch] = useState(false)
    const dispath = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)


    const handleLogout = async () => {
        try {
            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/auth/logout`, {
                method: 'get',
                credentials: 'include',
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            dispath(removeUser())
            navigate(RouteIndex)
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
        }
    }

    const toggleSearch = () => {
        setShowSearch(!showSearch)
    }

const [showAI, setShowAI] = useState(false)
const [darkMode, setDarkMode] = useState(false)

const toggleTheme = () => {
  setDarkMode(!darkMode)
  document.documentElement.classList.toggle('dark', !darkMode)
}

useEffect(() => {
  const updateStatus = () => {
    const el = document.getElementById('internet-status');
    if (el) {
      const isOnline = navigator.onLine;
      el.textContent = isOnline ? 'Online' : 'Offline';
      el.className = `text-sm px-2 py-0.5 rounded-full font-bold ${
        isOnline ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`;
    }
  };

  // Initial call
  updateStatus();

  // Listen for browser online/offline events
  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);

  // Set interval to check every 5 seconds
  const interval = setInterval(updateStatus, 5000);

  // Cleanup
  return () => {
    window.removeEventListener('online', updateStatus);
    window.removeEventListener('offline', updateStatus);
    clearInterval(interval);
  };
}, []);

    return (
        <div className='flex justify-between items-center h-[60px] fixed w-full z-20 bg-[#1E2227] px-8 border-0'>
            <div className='flex justify-center items-center gap-3'>
                <button onClick={toggleSidebar} className='md:hidden' type='button'>
                    <MdOutlineMenuOpen  className='text-white text-[30px]' title='Menu'/>
                    
                </button>
                <Link to={RouteIndex} className='w-[100px]' title='Home'>
                    <img src={logo} className='md:w-auto w-40 dark:text-[#FFD700] ' />
                   
                </Link>
            </div>
            <div className='text-[#ffffff] dark:text-[#FFD700] flex gap-4 p-3 text-[30px]'>
              {/* <Link to='/about'>
              <MdInfoOutline size={24} className=' hover:text-[#1E90FF] '/>
              </Link> */}
                
{/* 
                <a href='https://qourvexinstitute.vercel.app/' title='Quorvex Institute'>
                <MdSwitchAccessShortcut size={24} className=' hover:text-[#1E90FF] m-4 '/>
                </a> */}
                
            </div>
            <div className='w-[500px]' title='Search...'>
                <div className={`md:relative md:block absolute bg-[#1E2227] left-0 w-full md:top-0 top-[60px] md:p-0 p-5 ${showSearch ? 'block' : 'hidden'}`}>
                  <SearchBox />
                </div>
            </div>
            <div className='flex items-center gap-5' >

                <button onClick={toggleSearch} type='button' className='md:hidden block'>
                    <IoMdSearch size={30}  className='text-[#1E90FF]' title='Search'/>
                </button>
                <div className='text-[#ffffff] flex gap-5 p-3'>
                <DropdownMenu>
  <DropdownMenuTrigger className="hover:text-[#23272E] hover:bg-[#1E90FF] rounded-full p-2 transition-all duration-300 dark:text-[#FFD700]">
    <MdSettings size={24} title='Settings'/>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-64 bg-[#23272E] border border-[#23272E] rounded-xl shadow-xl p-2 dark:bg-[#111827] dark:text-white">
  <DropdownMenuLabel className="text-[#ffffff] dark:text-[#FFD700] font-semibold text-sm">
    Settings & Tools
  </DropdownMenuLabel>
  <DropdownMenuSeparator className='bg-[#2c313a]' />

  {/* Internet Status */}
  <DropdownMenuItem className="flex items-center justify-between text-white">
    <div className="flex items-center gap-2">
      <MdOutlineWebStories />
      <span>Internet</span>
    </div>
    <span id="internet-status" className="text-sm px-2 py-0.5 rounded-full font-bold bg-green-500 text-white">
      Online
    </span>
  </DropdownMenuItem>

  {/* AI Assistant */}
  <DropdownMenuItem
    className="flex items-center gap-2 cursor-pointer hover:bg-[#1E90FF]/10 transition text-white"
    onClick={() => setShowAI(true)}
  >
       <MdPerson/>
    <span>AI Assistant</span>
  </DropdownMenuItem>

  {/* Theme Toggle */}
  <DropdownMenuItem
    className="flex items-center gap-2 cursor-pointer hover:bg-[#1E90FF]/10 text-white"
    onClick={toggleTheme}
  >
    <MdSettingsBrightness/>
    <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
  </DropdownMenuItem>
</DropdownMenuContent>

</DropdownMenu>

                </div>
               
                {!user.isLoggedIn ?
                    <Button asChild className="font-bold rounded-[0] border-2 bg-[#1E2227] hover:bg-[#1E90FF] hover:border-[#1E90FF] hover:font-bold hover:text-[#23272E] border-[#404856]">
                        <Link to={RouteSignIn}  >
                            <MdLogin />
                            Sign In
                        </Link>
                    </Button>
                    :
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={user.user.avatar || usericon} />
                            </Avatar>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                <p>{user.user.name}</p>
                                <p className='text-sm'>{user.user.email}</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild className="cursor-pointer">
                                <Link to={RouteProfile}>
                                    <FaRegUser />
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="cursor-pointer">
                                <Link to={RouteBlogAdd}>
                                    <FaPlus />
                                    Create Blog
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                <IoLogOutOutline color='red' />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                }


            </div>


{showAI && (
  <div className="fixed bottom-5 right-5 w-[300px] h-[500px] bg-white dark:bg-gray-900 text-black dark:text-white shadow-2xl rounded-2xl overflow-hidden z-50 animate-fadeInUp">
    <div className="flex items-center justify-between p-3 bg-[#1E90FF] text-white">
      <h2 className="font-bold">Qspace Assistant</h2>
      <button onClick={() => setShowAI(false)} className="hover:text-yellow-400">&times;</button>
    </div>
    <div className="p-4 text-sm overflow-y-auto h-[75%] space-y-3">
      <p className="bg-[#F0F8FF] dark:bg-gray-800 p-2 rounded-md">Hello Future 👋 How can I help you code today?</p>
      {/* Simulated Chat Area */}
    </div>
    <div className="p-2 border-t border-gray-300 flex items-center gap-2">
      <input
        type="text"
        placeholder="Ask me anything..."
        className="flex-1 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700"
      />
      <button className="text-[#ffffff] font-bold hover:bg-[#82fe7a] bg-[#1E90FF] p-2 rounded-xl">Send</button>
    </div>
  </div>
)}

        </div >

    )
}

export default Topbar
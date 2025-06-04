import React from 'react'
import { MdArrowCircleLeft, MdLinkOff } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Notfound = () => {
    const urlpage = window.location.href
  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4 text-center'>
        <div className='w-48 h-48 mb-6'>
            <svg
            className='w-full h-full text-[#4169e1b7]'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={1.5}
            >
<path strokeLinecap='round' strokeLinejoin='round' d='M9.75 9h.008H9.75V9zM14.25 9h.008v.008h-.008V9zM9 16.5c1.875-1.5 4.125-1.5 6 0M12 2.25c5.385 0 9.75 4.365 9.75 9.75S17.385 21.75 12 21.75 2.25 17.385 2.25 12 6.615 2.25 12 2.25z'/>
            </svg>

        </div>
     <h1 className='text-4xl font-bold text-[#333] mb-6'> 404 - Page Not Found</h1>
     <p className='text-[#222] mb-6'>Sorry, the page <span className='font-bold select-none text-[red] text-[16px] border-2 p-2'> {` ${ urlpage}`}</span> you're lookig for doesn't exist or has been moved.</p>
     <Link 
     to='/'
     className=' px-6 py-3 text-white bg-black hover:text-[#555] transition-all border-2 hover:bg-white flex'
     ><MdArrowCircleLeft className='text-center justify-center items-center text-[24px]'/> Go Back Home</Link>
     <i className='text-[800px] text-[#63636313] absolute -z-20'><MdLinkOff/></i>
    </div>
  )
}

export default Notfound

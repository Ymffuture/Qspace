import React from 'react'
import loadingIcon from '@/assets/images/loading.svg'
const Loading = () => {
    return (
        <div className='w-[55px] justify-center items-center h-[55px] absolute bg-[transparant] content border-t-4 border-[#03b18f] border-4 border-t-transparent border-b-transparent animate-spin rounded-full filter grayscale top-[50%] right-[45%] select-none'>
            <img src={loadingIcon} width={100}  className='load'/>
        </div>
    )
}

export default Loading
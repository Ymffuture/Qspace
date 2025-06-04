import React from 'react'
import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { getEvn } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import { Link } from 'react-router-dom'
import { MdWarningAmber } from 'react-icons/md'

const Index = () => {
  const { data: blogData, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/blogs`, {
    method: 'get',
    credentials: 'include'
  })

  if (loading) return <Loading />

  return (
    <>
      {/* Top Fixed Banner */}
      <div className='sticky top-0 z-[-999] bg-[#FFFACD] border-b-2 border-[#FFD700] px-4 py-2 flex items-center justify-between text-[#6f6f16] shadow-sm'>
        <div className='flex items-center gap-2 animate-pulse'>
          <MdWarningAmber className='text-[20px] text-[#FFD700]' />
          <span className='text-sm md:text-base font-semibold'>
            This blog is under construction until <b className='text-[#1E90FF]'>31 September 2025</b>.
          </span>
        </div>
        <Link to='/about' className='text-[#1E90FF] underline text-sm hover:text-[#32CD32] transition-all'>
          Learn more
        </Link>
      </div>

      {/* Blog Cards */}
      <div className='p-4 md:p-10 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6'>
        {blogData && blogData.blog.length > 0 ? (
          blogData.blog.map(blog => (
            <BlogCard key={blog._id} props={blog} />
          ))
        ) : (
          <div className='col-span-full text-center p-6 border rounded-md bg-red-50 text-red-700'>
            <p className='font-bold text-lg underline'>Oops! No blog posts found.</p>
            <p>Please check your internet connection or try again later.</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Index

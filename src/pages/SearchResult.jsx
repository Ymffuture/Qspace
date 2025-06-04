import React from 'react'
import BlogCard from '@/components/BlogCard'
import { getEvn } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import { useSearchParams } from 'react-router-dom'
import { MdSearch } from 'react-icons/md'

const SearchResult = () => {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')
  const { data: blogData, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/search?q=${q}`, {
    method: 'get',
    credentials: 'include'
  })

  return (
    <>
      {/* 🔝 Sticky Search Banner */}
      <div className='sticky top-0 bg-[#E0F7FA] border-b-2 border-[#1E90FF] px-4 py-3 shadow-sm flex items-center justify-between -z-50'>
        <div className='flex items-center gap-3 text-[#1E90FF] font-semibold animate-pulse'>
          <MdSearch className='text-[22px]' />
          <span className='text-sm md:text-base'>
            Showing results for <strong className='text-[#32CD32]'>{q}</strong>
          </span>
        </div>
      </div>

      {/* Search Result Title */}
      <div className='flex items-center gap-3 text-2xl font-bold text-gray-700 border-b pb-3 px-4 mt-4'>
        <h4>Search Results for: <span className='text-[#1E90FF]'>{q}</span></h4>
      </div>

      {/* Blog Result Grid */}
      <div className='p-4 md:p-10 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6'>
        {blogData && blogData.blog.length > 0 ? (
          blogData.blog.map(blog => (
            <BlogCard key={blog._id} props={blog} />
          ))
        ) : (
          <div className='col-span-full text-center text-red-700 bg-red-50 border border-red-300 p-6 rounded-md font-semibold'>
            No results found for "<span className='text-[#1E90FF]'>{q}</span>". Try a different keyword.
          </div>
        )}
      </div>
    </>
  )
}

export default SearchResult;

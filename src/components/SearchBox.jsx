import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import { RouteSearch } from '@/helpers/RouteName';

const placeholderList = [
  'Search Courses...',
  'Search Subjects...',
  'Search Tutors...'
];

const SearchBox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Cycle through placeholder texts with a fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out

      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholderList.length);
        setFade(true); // Fade-in new text
      }, 3000); // Fade duration matches CSS
    }, 5000); // Every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getInput = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(RouteSearch(query));
  };

  return (
    <form onSubmit={handleSubmit} className='w-full '>
      <div className="relative w-full max-w-sm">
        <Input
          name="q"
          type="search"
          id="search"
          onInput={getInput}
          value={query}
          placeholder={placeholderList[placeholderIndex]}
          className={`h-10 rounded-[0] bg-[#23272E] w-full border-[#393f4a] transition-opacity duration-500 ${
            fade ? 'opacity-100' : 'opacity-75'
          }`}
        />
      </div>
    </form>
  );
};

export default SearchBox;

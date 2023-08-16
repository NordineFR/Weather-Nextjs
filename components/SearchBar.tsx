import {useState} from 'react'
import { FiSearch } from "react-icons/fi";
import { useRouter } from 'next/navigation';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSubmit = (e: { preventDefault: () => void; })=>{
        e.preventDefault();
        router.push(`/?search=${searchTerm}`);
      }
  return (
    <form onSubmit={handleSubmit} autoComplete='off' className=' text-gray-300 focus-within:text-gray-600'>
        <label htmlFor="search-field" className='sr-only'>Search City Weather </label>
        <div className='flex flex-row justify-start items-center'>
            <FiSearch className="w-5 h-5 text-black" />
            <input type="search" autoComplete='off' id="search-field"
            placeholder='Search City Weather'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-black p-4' />
        </div>
    </form>
  )
}

export default SearchBar
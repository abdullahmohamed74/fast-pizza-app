import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query) return;

    navigate(`/order/${query}`);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="search order id..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 sm:w-64 rounded-full py-2 px-4 text-sm placeholder:text-stone-400 bg-yellow-100 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:focus:w-72 transition-all duration-300 "
      />
    </form>
  );
}
export default SearchOrder;

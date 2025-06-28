
import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const mockResults = [
    { id: 1, title: "The Avengers", type: "Movie", year: "2012" },
    { id: 2, title: "Avatar", type: "Movie", year: "2009" },
    { id: 3, title: "Breaking Bad", type: "TV Show", year: "2008-2013" },
    { id: 4, title: "Game of Thrones", type: "TV Show", year: "2011-2019" },
  ];

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockResults.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!query) {
        setIsExpanded(false);
      }
    }, 200);
  };

  const clearSearch = () => {
    setQuery('');
    setSearchResults([]);
    setIsExpanded(false);
    inputRef.current?.blur();
  };

  return (
    <div className="relative">
      <div className={`flex items-center transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-10'
      }`}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search movies, shows, actors..."
            className={`w-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full py-2 pl-10 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
              isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {!isExpanded && (
          <button
            onClick={() => inputRef.current?.focus()}
            className="w-10 h-10 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
          >
            <Search className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isExpanded && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="flex items-center justify-between p-3 hover:bg-gray-800 transition-colors cursor-pointer border-b border-gray-800 last:border-b-0"
            >
              <div>
                <h4 className="text-white font-medium">{result.title}</h4>
                <p className="text-gray-400 text-sm">{result.type} • {result.year}</p>
              </div>
              <Search className="w-4 h-4 text-gray-500" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;


import { useState } from 'react';
import { Star, Play, Plus, Heart } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInWatchlist(!isInWatchlist);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <div 
      className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-800 shadow-2xl">
        {/* Movie Poster */}
        <div className="aspect-[2/3] relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = `https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=450&fit=crop&crop=center`;
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
          </div>

          {/* Hover Actions */}
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-3">
                <button className="w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors shadow-lg">
                  <Play className="w-6 h-6 text-white ml-1" />
                </button>
                <button 
                  onClick={handleWatchlist}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-lg ${
                    isInWatchlist ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <Plus className="w-6 h-6 text-white" />
                </button>
                <button 
                  onClick={handleLike}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-lg ${
                    isLiked ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <Heart className={`w-6 h-6 text-white ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-xs">
            {formatDate(movie.release_date)}
          </p>
        </div>
      </div>

      {/* Expanded Info on Hover */}
      {isHovered && (
        <div className="absolute z-10 top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm rounded-b-xl p-4 shadow-2xl border-t border-purple-500/20 animate-fade-in">
          <p className="text-gray-300 text-xs line-clamp-3">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;

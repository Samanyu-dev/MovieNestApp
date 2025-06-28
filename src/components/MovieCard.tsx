
import { useState } from 'react';
import { Star, Play, Plus, Heart, Calendar, TrendingUp } from 'lucide-react';

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
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-400';
    if (rating >= 7) return 'text-yellow-400';
    if (rating >= 6) return 'text-orange-400';
    return 'text-red-400';
  };

  const getRatingBgColor = (rating: number) => {
    if (rating >= 8) return 'bg-green-500/20 border-green-500/30';
    if (rating >= 7) return 'bg-yellow-500/20 border-yellow-500/30';
    if (rating >= 6) return 'bg-orange-500/20 border-orange-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <div 
      className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gray-800 shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500">
        {/* Movie Poster */}
        <div className="aspect-[2/3] relative overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-gray-600 animate-pulse" />
            </div>
          )}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            } group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = `https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=450&fit=crop&crop=center`;
              setImageLoaded(true);
            }}
          />
          
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Enhanced Rating Badge */}
          <div className={`absolute top-3 right-3 ${getRatingBgColor(movie.vote_average)} backdrop-blur-sm rounded-xl px-3 py-1.5 flex items-center space-x-1.5 border transition-all duration-300 group-hover:scale-105`}>
            <Star className={`w-3.5 h-3.5 ${getRatingColor(movie.vote_average)} fill-current`} />
            <span className={`text-xs font-bold ${getRatingColor(movie.vote_average)}`}>
              {movie.vote_average.toFixed(1)}
            </span>
          </div>

          {/* Release Year Badge */}
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-gray-300" />
              <span className="text-xs text-gray-300 font-medium">{formatDate(movie.release_date)}</span>
            </div>
          </div>

          {/* Enhanced Hover Actions */}
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <button className="w-14 h-14 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 hover:scale-110">
                  <Play className="w-6 h-6 text-white ml-1" />
                </button>
                <button 
                  onClick={handleWatchlist}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 ${
                    isInWatchlist 
                      ? 'bg-green-600 hover:bg-green-700 shadow-green-500/50' 
                      : 'bg-gray-700 hover:bg-gray-600 shadow-gray-500/50'
                  }`}
                >
                  <Plus className="w-6 h-6 text-white" />
                </button>
                <button 
                  onClick={handleLike}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 ${
                    isLiked 
                      ? 'bg-red-600 hover:bg-red-700 shadow-red-500/50' 
                      : 'bg-gray-700 hover:bg-gray-600 shadow-gray-500/50'
                  }`}
                >
                  <Heart className={`w-6 h-6 text-white ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Movie Info */}
        <div className="p-5">
          <h3 className="text-white font-bold text-sm mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors duration-300 leading-tight">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-xs font-medium">
              {formatDate(movie.release_date)}
            </p>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-300 font-medium">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Expanded Info on Hover */}
      {isHovered && (
        <div className="absolute z-20 top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl rounded-b-2xl p-5 shadow-2xl border-t border-purple-500/30 animate-fade-in">
          <p className="text-gray-300 text-xs line-clamp-3 leading-relaxed">
            {movie.overview}
          </p>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700/50">
            <span className="text-xs text-purple-400 font-medium">Click to view details</span>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;

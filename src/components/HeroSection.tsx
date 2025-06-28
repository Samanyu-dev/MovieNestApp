
import { Play, Plus, Star, Calendar } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

interface HeroSectionProps {
  movie?: Movie;
}

const HeroSection = ({ movie }: HeroSectionProps) => {
  if (!movie) return null;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=1080&fit=crop&crop=center`;
          }}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Movie Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {movie.title}
            </h1>

            {/* Movie Details */}
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-white font-medium">{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-300" />
                <span className="text-gray-300">{new Date(movie.release_date).getFullYear()}</span>
              </div>
              <div className="px-3 py-1 bg-purple-600/80 rounded-full">
                <span className="text-white text-sm font-medium">Movie</span>
              </div>
            </div>

            {/* Overview */}
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl">
              {movie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-colors shadow-lg">
                <Play className="w-6 h-6 ml-1" />
                <span>Watch Now</span>
              </button>
              <button className="flex items-center space-x-3 bg-gray-800/80 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-700 transition-colors border border-gray-600">
                <Plus className="w-6 h-6" />
                <span>Add to Watchlist</span>
              </button>
              <button className="flex items-center space-x-3 bg-purple-600/80 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-colors">
                <Star className="w-6 h-6" />
                <span>Rate Movie</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

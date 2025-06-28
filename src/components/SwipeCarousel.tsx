
import { useState, useEffect } from 'react';
import { Heart, X, Star, Calendar, Play } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

interface SwipeCarouselProps {
  movies: Movie[];
  onSwipeRight: (movie: Movie) => void;
  onSwipeLeft: (movie: Movie) => void;
}

const SwipeCarousel = ({ movies, onSwipeRight, onSwipeLeft }: SwipeCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const currentMovie = movies[currentIndex];

  const handleDragStart = (clientX: number) => {
    setDragStart(clientX);
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Swipe right - add to watchlist
        onSwipeRight(currentMovie);
      } else {
        // Swipe left - pass
        onSwipeLeft(currentMovie);
      }
      nextMovie();
    }
    
    setDragOffset(0);
    setIsDragging(false);
  };

  const nextMovie = () => {
    setCurrentIndex(prev => (prev + 1) % movies.length);
  };

  const handleLike = () => {
    onSwipeRight(currentMovie);
    nextMovie();
  };

  const handlePass = () => {
    onSwipeLeft(currentMovie);
    nextMovie();
  };

  if (!currentMovie) return null;

  return (
    <div className="relative w-full max-w-md mx-auto h-[600px] perspective-1000">
      {/* Stack of cards */}
      {movies.slice(currentIndex, currentIndex + 3).map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
            index === 0 ? 'z-30' : index === 1 ? 'z-20 scale-95 opacity-80' : 'z-10 scale-90 opacity-60'
          }`}
          style={{
            transform: index === 0 
              ? `translateX(${dragOffset}px) rotateY(${dragOffset * 0.1}deg) scale(${1 - Math.abs(dragOffset) * 0.0005})`
              : `translateY(${index * 10}px) scale(${1 - index * 0.05})`
          }}
          onMouseDown={(e) => index === 0 && handleDragStart(e.clientX)}
          onMouseMove={(e) => index === 0 && handleDragMove(e.clientX)}
          onMouseUp={() => index === 0 && handleDragEnd()}
          onMouseLeave={() => index === 0 && handleDragEnd()}
          onTouchStart={(e) => index === 0 && handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => index === 0 && handleDragMove(e.touches[0].clientX)}
          onTouchEnd={() => index === 0 && handleDragEnd()}
        >
          {/* Movie Poster */}
          <div className="relative h-full">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop`;
              }}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Movie info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{movie.title}</h3>
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{new Date(movie.release_date).getFullYear()}</span>
                </div>
              </div>
              <p className="text-sm text-gray-300 line-clamp-3">{movie.overview}</p>
            </div>

            {/* Swipe indicators */}
            {isDragging && (
              <>
                <div className={`absolute top-1/2 left-4 transform -translate-y-1/2 transition-opacity ${
                  dragOffset > 50 ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="bg-green-500 rounded-full p-4">
                    <Heart className="w-8 h-8 text-white fill-current" />
                  </div>
                  <p className="text-green-500 font-bold text-center mt-2">LIKE</p>
                </div>
                <div className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-opacity ${
                  dragOffset < -50 ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="bg-red-500 rounded-full p-4">
                    <X className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-red-500 font-bold text-center mt-2">PASS</p>
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Action buttons */}
      <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-8">
        <button
          onClick={handlePass}
          className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:scale-110"
        >
          <X className="w-8 h-8 text-white" />
        </button>
        <button
          onClick={() => {/* Preview functionality */}}
          className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:scale-110"
        >
          <Play className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={handleLike}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:scale-110"
        >
          <Heart className="w-8 h-8 text-white fill-current" />
        </button>
      </div>

      {/* Progress indicator */}
      <div className="absolute -top-12 left-0 right-0">
        <div className="flex justify-center space-x-1">
          {movies.slice(0, 10).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex % 10 ? 'bg-purple-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-2">
          {currentIndex + 1} / {movies.length}
        </p>
      </div>
    </div>
  );
};

export default SwipeCarousel;

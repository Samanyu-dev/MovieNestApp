
import { useState } from 'react';
import { X, Play, Plus, Heart, Clock, Star, Calendar, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  vote_average: number;
  release_date: string;
  overview: string;
  runtime?: number;
  genres?: string[];
}

interface MovieDetailsModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieDetailsModal = ({ movie, isOpen, onClose }: MovieDetailsModalProps) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!movie) return null;

  const streamingPlatforms = [
    { name: 'Netflix', available: true },
    { name: 'Disney+', available: false },
    { name: 'Amazon Prime', available: true },
    { name: 'HBO Max', available: false },
    { name: 'Hulu', available: true },
  ];

  const cast = [
    'Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson', 
    'Mark Ruffalo', 'Chris Hemsworth', 'Jeremy Renner'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">{movie.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path || movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4 flex space-x-3">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Play className="w-4 h-4 mr-2" />
                Watch Trailer
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsInWatchlist(!isInWatchlist)}
                className={isInWatchlist ? 'bg-green-600 text-white' : ''}
              >
                <Plus className="w-4 h-4 mr-2" />
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? 'bg-red-600 text-white' : ''}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Movie Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                {movie.runtime && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{movie.runtime} min</span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {cast.map((actor, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-200">
                      {actor}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Where to Watch</h3>
                <div className="space-y-2">
                  {streamingPlatforms.map((platform) => (
                    <div
                      key={platform.name}
                      className={`p-3 rounded-lg border ${
                        platform.available
                          ? 'border-green-500 bg-green-500/10 text-green-400'
                          : 'border-gray-600 bg-gray-800 text-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{platform.name}</span>
                        <span className="text-sm">
                          {platform.available ? 'Available' : 'Not Available'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Schedule Watch</h3>
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Watch Party</h3>
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Start Watch Party
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailsModal;

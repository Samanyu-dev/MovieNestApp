
import { useState, useEffect } from 'react';
import { Search, TrendingUp, Star, Clock, Users } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import GenreCarousel from '../components/GenreCarousel';
import HeroSection from '../components/HeroSection';

const Index = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    try {
      setIsLoading(true);
      // Mock data for now - will be replaced with TMDB API
      const mockTrending = [
        {
          id: 1,
          title: "Guardians of the Galaxy Vol. 3",
          poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
          vote_average: 8.5,
          release_date: "2023-05-05",
          overview: "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own."
        },
        {
          id: 2,
          title: "Spider-Man: Across the Spider-Verse",
          poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
          vote_average: 9.0,
          release_date: "2023-06-02",
          overview: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse."
        },
        {
          id: 3,
          title: "The Super Mario Bros. Movie",
          poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
          vote_average: 7.8,
          release_date: "2023-04-05",
          overview: "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe."
        }
      ];
      
      setTrendingMovies(mockTrending);
      setTopRatedMovies(mockTrending);
      setUpcomingMovies(mockTrending);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading CineSphere...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">CineSphere</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-white hover:text-purple-400 transition-colors">Home</a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Movies</a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">TV Shows</a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Watchlist</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <SearchBar />
              <button className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors">
                <Users className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection movie={trendingMovies[0]} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Trending Section */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <h2 className="text-3xl font-bold text-white">Trending Now</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {trendingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Top Rated Section */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <Star className="w-6 h-6 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white">Top Rated</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {topRatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Upcoming Section */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <Clock className="w-6 h-6 text-green-400" />
            <h2 className="text-3xl font-bold text-white">Coming Soon</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {upcomingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Genre Carousels */}
        <GenreCarousel />
      </div>
    </div>
  );
};

export default Index;

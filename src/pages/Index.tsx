
import { useState, useEffect } from 'react';
import { Search, TrendingUp, Star, Clock, Users, Menu, X } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import GenreCarousel from '../components/GenreCarousel';
import HeroSection from '../components/HeroSection';
import { fetchTrendingMovies, fetchTopRatedMovies, fetchUpcomingMovies } from '../services/tmdbApi';

const Index = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchMovieData();
    
    // Add scroll listener for navbar transparency
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchMovieData = async () => {
    try {
      setIsLoading(true);
      const [trending, topRated, upcoming] = await Promise.all([
        fetchTrendingMovies(),
        fetchTopRatedMovies(),
        fetchUpcomingMovies()
      ]);
      
      setTrendingMovies(trending);
      setTopRatedMovies(topRated);
      setUpcomingMovies(upcoming);
    } catch (error) {
      console.error('Error fetching movies:', error);
      // Fallback to mock data if API fails
      const mockData = [
        {
          id: 1,
          title: "Sample Movie",
          poster_path: "/sample.jpg",
          vote_average: 8.5,
          release_date: "2023-05-05",
          overview: "This is a sample movie description."
        }
      ];
      setTrendingMovies(mockData);
      setTopRatedMovies(mockData);
      setUpcomingMovies(mockData);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500 mx-auto mb-6"></div>
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-pulse">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white animate-pulse">MovieNest</span>
            </div>
            <p className="text-white text-lg">Discovering amazing movies...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Enhanced Navigation with scroll transparency */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/60 backdrop-blur-xl border-b border-purple-500/30 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">MovieNest</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-white hover:text-purple-400 transition-colors font-medium">Home</a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Movies</a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">TV Shows</a>
                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Watchlist</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <SearchBar />
              <button className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl">
                <Users className="w-5 h-5 text-white" />
              </button>
              <button 
                className="md:hidden w-10 h-10 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-purple-500/20">
            <div className="px-4 py-4 space-y-2">
              <a href="#" className="block text-white hover:text-purple-400 transition-colors py-2">Home</a>
              <a href="#" className="block text-gray-300 hover:text-purple-400 transition-colors py-2">Movies</a>
              <a href="#" className="block text-gray-300 hover:text-purple-400 transition-colors py-2">TV Shows</a>
              <a href="#" className="block text-gray-300 hover:text-purple-400 transition-colors py-2">Watchlist</a>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <HeroSection movie={trendingMovies[0]} />

      {/* Main Content with enhanced spacing and animations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Enhanced Trending Section */}
        <section className="animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Trending Now</h2>
                <p className="text-gray-400 text-sm">What everyone's watching</p>
              </div>
            </div>
            <button className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {trendingMovies.slice(0, 10).map((movie, index) => (
              <div key={movie.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Top Rated Section */}
        <section className="animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Top Rated</h2>
                <p className="text-gray-400 text-sm">Critically acclaimed favorites</p>
              </div>
            </div>
            <button className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {topRatedMovies.slice(0, 10).map((movie, index) => (
              <div key={movie.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Upcoming Section */}
        <section className="animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Coming Soon</h2>
                <p className="text-gray-400 text-sm">Get ready for these releases</p>
              </div>
            </div>
            <button className="text-green-400 hover:text-green-300 transition-colors font-medium">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {upcomingMovies.slice(0, 10).map((movie, index) => (
              <div key={movie.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Genre Carousels */}
        <div className="animate-fade-in">
          <GenreCarousel />
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-purple-500/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">MovieNest</span>
          </div>
          <p className="text-center text-gray-400">
            Your ultimate destination for movie discovery and entertainment
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

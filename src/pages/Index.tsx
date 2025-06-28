
import { useState, useEffect } from 'react';
import { Search, TrendingUp, Star, Clock, Users, Menu, X, Heart, BarChart3, Calendar, MessageSquare, User } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import GenreCarousel from '../components/GenreCarousel';
import HeroSection from '../components/HeroSection';
import SplashScreen from '../components/SplashScreen';
import SwipeCarousel from '../components/SwipeCarousel';
import MovieDetailsModal from '../components/MovieDetailsModal';
import ProfileSection from '../components/ProfileSection';
import FriendsSection from '../components/FriendsSection';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import MovieCalendar from '../components/MovieCalendar';
import DiscussionForums from '../components/DiscussionForums';
import { fetchTrendingMovies, fetchTopRatedMovies, fetchUpcomingMovies } from '../services/tmdbApi';

const Index = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showSwipeMode, setShowSwipeMode] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [currentView, setCurrentView] = useState('home');

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

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleSwipeRight = (movie) => {
    setWatchlist(prev => [...prev, movie]);
    console.log('Added to watchlist:', movie.title);
  };

  const handleSwipeLeft = (movie) => {
    console.log('Passed on:', movie.title);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowMovieModal(true);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'profile':
        return <ProfileSection />;
      case 'friends':
        return <FriendsSection />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'calendar':
        return <MovieCalendar />;
      case 'forums':
        return <DiscussionForums />;
      default:
        return renderHomeView();
    }
  };

  const renderHomeView = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Enhanced Hero Section */}
      <HeroSection movie={trendingMovies[0]} />

      {/* Main Content with enhanced spacing and animations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 relative z-10">
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
                <div onClick={() => handleMovieClick(movie)}>
                  <MovieCard movie={movie} />
                </div>
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
                <div onClick={() => handleMovieClick(movie)}>
                  <MovieCard movie={movie} />
                </div>
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
                <div onClick={() => handleMovieClick(movie)}>
                  <MovieCard movie={movie} />
                </div>
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

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

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
    <div className="min-h-screen">
      {/* Enhanced Navigation with scroll transparency */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/60 backdrop-blur-xl border-b border-purple-500/30 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">MovieNest</span>
              </button>
              <div className="hidden md:flex space-x-6">
                <button 
                  onClick={() => setCurrentView('home')}
                  className={`transition-colors font-medium ${
                    currentView === 'home' ? 'text-white' : 'text-gray-300 hover:text-purple-400'
                  }`}>
                  Home
                </button>
                <button 
                  onClick={() => setCurrentView('analytics')}
                  className={`transition-colors font-medium flex items-center space-x-1 ${
                    currentView === 'analytics' ? 'text-white' : 'text-gray-300 hover:text-purple-400'
                  }`}>
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </button>
                <button 
                  onClick={() => setShowSwipeMode(!showSwipeMode)}
                  className="text-gray-300 hover:text-purple-400 transition-colors font-medium flex items-center space-x-1"
                >
                  <Heart className="w-4 h-4" />
                  <span>Discover</span>
                </button>
                <button 
                  onClick={() => setCurrentView('calendar')}
                  className={`transition-colors font-medium flex items-center space-x-1 ${
                    currentView === 'calendar' ? 'text-white' : 'text-gray-300 hover:text-purple-400'
                  }`}>
                  <Calendar className="w-4 h-4" />
                  <span>Calendar</span>
                </button>
                <button 
                  onClick={() => setCurrentView('forums')}
                  className={`transition-colors font-medium flex items-center space-x-1 ${
                    currentView === 'forums' ? 'text-white' : 'text-gray-300 hover:text-purple-400'
                  }`}>
                  <MessageSquare className="w-4 h-4" />
                  <span>Forums</span>
                </button>
                <button 
                  onClick={() => setCurrentView('friends')}
                  className={`transition-colors font-medium flex items-center space-x-1 ${
                    currentView === 'friends' ? 'text-white' : 'text-gray-300 hover:text-purple-400'
                  }`}>
                  <Users className="w-4 h-4" />
                  <span>Friends</span>
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <SearchBar />
              <button 
                onClick={() => setCurrentView('profile')}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl ${
                  currentView === 'profile' ? 'bg-purple-600' : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                <User className="w-5 h-5 text-white" />
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
              <button 
                onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }}
                className="block text-white hover:text-purple-400 transition-colors py-2"
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentView('analytics'); setIsMobileMenuOpen(false); }}
                className="block text-gray-300 hover:text-purple-400 transition-colors py-2"
              >
                Analytics
              </button>
              <button 
                onClick={() => { setCurrentView('calendar'); setIsMobileMenuOpen(false); }}
                className="block text-gray-300 hover:text-purple-400 transition-colors py-2"
              >
                Calendar
              </button>
              <button 
                onClick={() => { setCurrentView('forums'); setIsMobileMenuOpen(false); }}
                className="block text-gray-300 hover:text-purple-400 transition-colors py-2"
              >
                Forums
              </button>
              <button 
                onClick={() => { setCurrentView('friends'); setIsMobileMenuOpen(false); }}
                className="block text-gray-300 hover:text-purple-400 transition-colors py-2"
              >
                Friends
              </button>
              <button 
                onClick={() => { setCurrentView('profile'); setIsMobileMenuOpen(false); }}
                className="block text-gray-300 hover:text-purple-400 transition-colors py-2"
              >
                Profile
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Swipe Mode Toggle */}
      {showSwipeMode && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setShowSwipeMode(false)}
              className="absolute -top-12 right-0 w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center z-50"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <SwipeCarousel 
              movies={trendingMovies}
              onSwipeRight={handleSwipeRight}
              onSwipeLeft={handleSwipeLeft}
            />
          </div>
        </div>
      )}

      {/* Movie Details Modal */}
      <MovieDetailsModal
        movie={selectedMovie}
        isOpen={showMovieModal}
        onClose={() => setShowMovieModal(false)}
      />

      {/* Render Current View */}
      {renderCurrentView()}
    </div>
  );
};

export default Index;

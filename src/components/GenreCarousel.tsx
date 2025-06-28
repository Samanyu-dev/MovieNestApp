
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const GenreCarousel = () => {
  const [currentGenre, setCurrentGenre] = useState(0);

  const genres = [
    {
      name: "Action",
      movies: [
        {
          id: 4,
          title: "John Wick: Chapter 4",
          poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
          vote_average: 8.2,
          release_date: "2023-03-24",
          overview: "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table."
        },
        {
          id: 5,
          title: "Fast X",
          poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
          vote_average: 7.1,
          release_date: "2023-05-19",
          overview: "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path."
        }
      ]
    },
    {
      name: "Comedy",
      movies: [
        {
          id: 6,
          title: "The Super Mario Bros. Movie",
          poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
          vote_average: 7.8,
          release_date: "2023-04-05",
          overview: "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe."
        }
      ]
    },
    {
      name: "Horror",
      movies: [
        {
          id: 7,
          title: "Scream VI",
          poster_path: "/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg",
          vote_average: 7.3,
          release_date: "2023-03-10",
          overview: "Following the latest Ghostface killings, the four survivors leave Woodsboro behind and start a fresh chapter."
        }
      ]
    }
  ];

  const nextGenre = () => {
    setCurrentGenre((prev) => (prev + 1) % genres.length);
  };

  const prevGenre = () => {
    setCurrentGenre((prev) => (prev - 1 + genres.length) % genres.length);
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Explore by Genre</h2>
        <div className="flex space-x-2">
          <button
            onClick={prevGenre}
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={nextGenre}
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Genre Tabs */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {genres.map((genre, index) => (
          <button
            key={genre.name}
            onClick={() => setCurrentGenre(index)}
            className={`px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${
              currentGenre === index
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Current Genre Movies */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {genres[currentGenre].movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default GenreCarousel;

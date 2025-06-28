
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import MovieCard from './MovieCard';

const GenreCarousel = () => {
  const [currentGenre, setCurrentGenre] = useState(0);

  const genres = [
    {
      name: "Action",
      gradient: "from-red-500 to-orange-500",
      movies: [
        {
          id: 385687,
          title: "Fast X",
          poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
          vote_average: 7.3,
          release_date: "2023-05-19",
          overview: "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted every foe."
        },
        {
          id: 298618,
          title: "The Flash",
          poster_path: "/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
          vote_average: 6.8,
          release_date: "2023-06-16",
          overview: "When Barry Allen uses his superpowers to travel back in time to change events of the past."
        },
        {
          id: 926393,
          title: "The Equalizer 3",
          poster_path: "/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg",
          vote_average: 7.3,
          release_date: "2023-08-30",
          overview: "Robert McCall finds himself at home in Southern Italy but discovers his friends are under local crime control."
        },
        {
          id: 447365,
          title: "Guardians of the Galaxy Vol. 3",
          poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
          vote_average: 8.1,
          release_date: "2023-05-05",
          overview: "Peter Quill must rally his team to defend the universe and protect one of their own."
        }
      ]
    },
    {
      name: "Comedy",
      gradient: "from-yellow-500 to-pink-500",
      movies: [
        {
          id: 346698,
          title: "Barbie",
          poster_path: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
          vote_average: 7.2,
          release_date: "2023-07-21",
          overview: "Barbie and Ken are having the time of their lives in the colorful world of Barbie Land."
        },
        {
          id: 502356,
          title: "The Super Mario Bros. Movie",
          poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
          vote_average: 7.8,
          release_date: "2023-04-05",
          overview: "A plumber named Mario travels through an underground labyrinth with his brother Luigi."
        }
      ]
    },
    {
      name: "Horror",
      gradient: "from-purple-600 to-red-600",
      movies: [
        {
          id: 968051,
          title: "The Nun II",
          poster_path: "/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg",
          vote_average: 6.8,
          release_date: "2023-09-08",
          overview: "In 1956 France, a priest is murdered, and Sister Irene begins to investigate."
        },
        {
          id: 507089,
          title: "Five Nights at Freddy's",
          poster_path: "/j8cKZ4XsAe0ZvmGGDoR8S2F5OLi.jpg",
          vote_average: 6.2,
          release_date: "2023-10-27",
          overview: "A troubled security guard begins working at Freddy Fazbear's Pizza."
        }
      ]
    },
    {
      name: "Drama",
      gradient: "from-blue-500 to-purple-600",
      movies: [
        {
          id: 872585,
          title: "Oppenheimer",
          poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
          vote_average: 8.3,
          release_date: "2023-07-21",
          overview: "The story of J. Robert Oppenheimer's role in developing the atomic bomb during World War II."
        },
        {
          id: 677179,
          title: "Creed III",
          poster_path: "/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg",
          vote_average: 7.3,
          release_date: "2023-03-03",
          overview: "After dominating the boxing world, Adonis Creed has been thriving in both career and family life."
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
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Explore by Genre</h2>
            <p className="text-gray-400 text-sm">Discover movies tailored to your taste</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={prevGenre}
            className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={nextGenre}
            className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Enhanced Genre Tabs */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {genres.map((genre, index) => (
          <button
            key={genre.name}
            onClick={() => setCurrentGenre(index)}
            className={`relative px-8 py-4 rounded-2xl font-semibold transition-all whitespace-nowrap overflow-hidden ${
              currentGenre === index
                ? 'text-white shadow-2xl transform scale-105'
                : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 backdrop-blur-sm'
            }`}
          >
            {currentGenre === index && (
              <div className={`absolute inset-0 bg-gradient-to-r ${genre.gradient} opacity-90`}></div>
            )}
            <span className="relative z-10">{genre.name}</span>
          </button>
        ))}
      </div>

      {/* Current Genre Movies with enhanced layout */}
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {genres[currentGenre].movies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        
        {/* Genre-specific background decoration */}
        <div className={`absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br ${genres[currentGenre].gradient} opacity-10 rounded-full blur-2xl -z-10`}></div>
      </div>
    </section>
  );
};

export default GenreCarousel;
